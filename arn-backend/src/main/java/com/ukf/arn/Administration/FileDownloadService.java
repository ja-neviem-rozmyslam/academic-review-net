package com.ukf.arn.Administration;

import com.ukf.arn.Entities.Submission;
import com.ukf.arn.Submissions.Repository.SubmissionRepository;
import com.ukf.arn.Users.Repository.UserRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import static com.ukf.arn.ConstantsKatalog.REVIEW_RATING_OPTIONS;

@Service
public class FileDownloadService {

    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;

    public FileDownloadService(SubmissionRepository submissionRepository, UserRepository userRepository) {
        this.submissionRepository = submissionRepository;
        this.userRepository = userRepository;
    }

    public byte[] downloadConferenceSubmissions(Long conferenceId) {
        try {
            String conferenceFolderPath = "conferences/" + conferenceId;

            File conferenceFolder = new File(conferenceFolderPath);
            if (!conferenceFolder.exists() || !conferenceFolder.isDirectory()) {
                throw new RuntimeException("Konferencia nemá žiadne odovzdané práce: " + conferenceFolderPath);
            }

            Map<String, String> uuidToUserNameMap = getUserMappingFromService(conferenceFolder);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            try (ZipOutputStream zipOutputStream = new ZipOutputStream(byteArrayOutputStream)) {
                addFilesToZip(conferenceFolder, zipOutputStream, conferenceFolder.toPath(), uuidToUserNameMap);
                zipOutputStream.finish();
            }

            return byteArrayOutputStream.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Problém so zipovaním súborov", e);
        }
    }

    private void addFilesToZip(File folder, ZipOutputStream zipOutputStream, Path basePath, Map<String, String> uuidToUserNameMap) throws IOException {
        for (File file : folder.listFiles()) {
            if (file.isFile()) {
                Path relativePath = basePath.relativize(file.toPath());
                String zipEntryPath = replaceUuidWithUserName(relativePath.toString(), uuidToUserNameMap);

                try (FileInputStream fileInputStream = new FileInputStream(file)) {
                    zipOutputStream.putNextEntry(new ZipEntry(zipEntryPath.replace("\\", "/")));

                    byte[] buffer = new byte[1024];
                    int bytesRead;
                    while ((bytesRead = fileInputStream.read(buffer)) != -1) {
                        zipOutputStream.write(buffer, 0, bytesRead);
                    }

                    zipOutputStream.closeEntry();
                }
            } else if (file.isDirectory()) {
                addFilesToZip(file, zipOutputStream, basePath, uuidToUserNameMap);

                String uuid = file.getName();
                if (isValidUUID(uuid) && uuidToUserNameMap.containsKey(uuid)) {
                    Submission submission = submissionRepository.findByConferencesIdAndAuthorId(
                            Long.parseLong(folder.getName()), UUID.fromString(uuid));

                    if (submission != null) {
                        byte[] excelData = generateReviewExcel(submission);
                        String excelFileName = replaceUuidWithUserName(uuid, uuidToUserNameMap) + "/Posudok.xlsx";
                        addExcelToZip(excelData, excelFileName, zipOutputStream);
                    }
                }
            }
        }
    }

    private void addExcelToZip(byte[] excelData, String fileName, ZipOutputStream zipOutputStream) throws IOException {
        zipOutputStream.putNextEntry(new ZipEntry(fileName.replace("\\", "/")));
        zipOutputStream.write(excelData);
        zipOutputStream.closeEntry();
    }

    private byte[] generateReviewExcel(Submission submission) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Posudok");

        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setFontHeightInPoints((short) 12);
        headerStyle.setFont(headerFont);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);

        CellStyle dataStyle = workbook.createCellStyle();
        dataStyle.setWrapText(true);
        dataStyle.setBorderTop(BorderStyle.THIN);
        dataStyle.setBorderBottom(BorderStyle.THIN);
        dataStyle.setBorderLeft(BorderStyle.THIN);
        dataStyle.setBorderRight(BorderStyle.THIN);
        dataStyle.setVerticalAlignment(VerticalAlignment.TOP);

        Row headerRow = sheet.createRow(0);
        headerRow.setHeightInPoints(20);
        Cell headerCell1 = headerRow.createCell(0);
        headerCell1.setCellValue("Hodnotený aspekt");
        headerCell1.setCellStyle(headerStyle);

        Cell headerCell2 = headerRow.createCell(1);
        headerCell2.setCellValue("Posudok");
        headerCell2.setCellStyle(headerStyle);

        String reviewJson = submission.getReview();
        if (reviewJson != null && !reviewJson.isEmpty()) {
            JSONArray reviewArray = new JSONArray(reviewJson);

            for (int i = 0; i < reviewArray.length(); i++) {
                JSONObject reviewObject = reviewArray.getJSONObject(i);
                String reviewedCategory = reviewObject.optString("reviewedCategory", "N/A");
                String reviewValue = reviewObject.optString("reviewValue", "N/A");
                String mappedValue = REVIEW_RATING_OPTIONS.getOrDefault(reviewValue, reviewValue);

                Row dataRow = sheet.createRow(i + 1);

                Cell categoryCell = dataRow.createCell(0);
                categoryCell.setCellValue(reviewedCategory);
                categoryCell.setCellStyle(dataStyle);

                Cell valueCell = dataRow.createCell(1);
                valueCell.setCellValue(mappedValue);
                valueCell.setCellStyle(dataStyle);

                int maxLines = Math.max(
                        countWrappedLines(reviewedCategory, sheet.getColumnWidth(0) / 256),
                        countWrappedLines(mappedValue, sheet.getColumnWidth(1) / 256)
                );
                dataRow.setHeightInPoints(maxLines * sheet.getDefaultRowHeightInPoints());
            }
        }

        for (int i = 0; i < 2; i++) {
            sheet.autoSizeColumn(i);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();
        return outputStream.toByteArray();
    }

    private int countWrappedLines(String text, int columnWidth) {
        if (text == null || text.isEmpty()) {
            return 1;
        }
        int charPerLine = columnWidth - 2;
        int lines = (int) Math.ceil((double) text.length() / charPerLine);
        return Math.max(lines, 1);
    }


    private Map<String, String> getUserMappingFromService(File conferenceFolder) {
        Map<String, String> uuidToUserNameMap = new HashMap<>();

        for (File subFolder : conferenceFolder.listFiles()) {
            if (subFolder.isDirectory()) {
                String uuid = subFolder.getName();

                String userName = null;
                if (isValidUUID(uuid)) {
                    userName = userRepository.getNameAndSurnameById(uuid);
                }

                uuidToUserNameMap.put(uuid, Objects.requireNonNullElse(userName, uuid));
            }
        }

        return uuidToUserNameMap;
    }

    private String replaceUuidWithUserName(String path, Map<String, String> uuidToUserNameMap) {
        for (Map.Entry<String, String> entry : uuidToUserNameMap.entrySet()) {
            String uuid = entry.getKey();
            String userName = entry.getValue();

            if (path.contains(uuid)) {
                return path.replace(uuid, userName);
            }
        }
        return path;
    }

    private boolean isValidUUID(String uuid) {
        try {
            UUID.fromString(uuid);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
