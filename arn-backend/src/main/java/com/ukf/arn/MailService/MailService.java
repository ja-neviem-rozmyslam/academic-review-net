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

    public void sendVerificationEmail(String emailReceiver, String verificationLink) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setFrom("UKF ARN <arn.noreply@gmail.com>");
            helper.setTo(emailReceiver);
            helper.setSubject("Dokončite registráciu do Univerzitného Konferenčného Systému");

            String htmlContent = "<html>" +
                    "<body>" +
                    "<h2>Vitajte v Univerzitnom Konferenčnom Systéme!</h2>" +
                    "<p>Pre dokončeie registrácie kliknite na tlačidlo nižšie:</p>" +
                    "<a href='" + verificationLink + "' " +
                    "style='background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; " +
                    "border-radius: 5px;'>Potvrdiť registráciu</a>" +
                    "<p>Ak ste túto akciu nevykonali vy, môžete tento e-mail ignorovať.</p>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException("Počas odosielania verifikačného e-mailu nastala chyba", e);
        }
    }

}
