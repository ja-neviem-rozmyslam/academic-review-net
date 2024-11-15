package com.ukf.arn.MailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender javaMailSender;

    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendPasswordResetEmail(String emailReceiver, String resetLink) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setFrom("UKF ARN <arn.noreply@gmail.com>");
            helper.setTo(emailReceiver);
            helper.setSubject("Obnova hesla v Univerzitnom Konferenčnom Systéme");

            String htmlContent = "<html>" +
                    "<body style='font-family: \"Play\", sans-serif; background-color: #f7f7f7; margin: 0; padding: 0; text-align: left;'>" +
                    "<div style='width: 100%; max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);'>" +
                    "<div style='font-size: 24px; font-weight: bold; color: #007bff; margin-bottom: 10px; text-align: center;'>Univerzitný Konferenčný Systém</div>" +
                    "<div style='border-top: 2px solid #007bff; margin-bottom: 20px;'></div>" +
                    "<div style='font-size: 16px; color: #5f6368; line-height: 1.6; text-align: left;'>" +
                    "<p>Ahoj,</p>" +
                    "<p>Obdržali sme požiadavku na obnovenie tvojho hesla. Klikni na tlačidlo nižšie, aby si obnovil svoje heslo:</p>" +
                    "<a href='" + resetLink + "' style='display: inline-block; margin-top: 30px; margin-bottom: 30px; margin-right: 215px; margin-left: 215px; padding: 12px 25px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px; font-weight: bold; text-align: center;'>Obnoviť heslo</a>" +
                    "</div>" +
                    "<div style='font-size: 12px; color: #9e9e9e; margin-top: 20px; text-align: center;'>" +
                    "<p>Tento e-mail bol odoslaný zo systému Univerzitného Konferenčného Systému. <br> Ak si túto požiadavku nevykonal, môžeš tento e-mail ignorovať.</p>" +
                    "</div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true);

            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new RuntimeException("Počas odosielania e-mailu na obnovu hesla nastala chyba", e);
        }
    }

    public void sendVerificationEmail(String emailReceiver, String verificationLink) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setFrom("UKF ARN <arn.noreply@gmail.com>");
            helper.setTo(emailReceiver);
            helper.setSubject("Dokončite registráciu do Univerzitného Konferenčného Systému");

            String htmlContent = "<html>" +
                    "<body style='font-family: \"Play\", sans-serif; background-color: #f7f7f7; margin: 0; padding: 0; text-align: left;'>" +
                    "<div style='width: 100%; max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);'>" +
                    "<div style='font-size: 24px; font-weight: bold; color: #007bff; margin-bottom: 10px; text-align: center;'>Univerzitný Konferenčný Systém</div>" +
                    "<div style='border-top: 2px solid #007bff; margin-bottom: 20px;'></div>" +
                    "<div style='font-size: 16px; color: #5f6368; line-height: 1.6; text-align: left;'>" +
                    "<p>Vitajte v Univerzitnom Konferenčnom Systéme!</p>" +
                    "<p>Pre dokončenie registrácie kliknite na tlačidlo nižšie:</p>" +
                    "<a href='"+verificationLink+"' style='display: inline-block; margin-top: 30px; margin-bottom: 30px; margin-left: 200px; margin-right: 200px; padding: 12px 25px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px; font-weight: bold; text-align: center; white-space: nowrap;'>Potvrdiť registráciu</a>" +
                    "</div>" +
                    "<div style='font-size: 12px; color: #9e9e9e; margin-top: 20px; text-align: center;'>" +
                    "<p>Tento e-mail bol odoslaný zo systému Univerzitného Konferenčného Systéme. <br> Ak ste túto akciu nevykonali vy, môžete tento e-mail ignorovať.</p>" +
                    "</div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException("Počas odosielania verifikačného e-mailu nastala chyba", e);
        }
    }

}
