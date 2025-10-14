import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const emailConfirmationService = async (email: string, token: string, userName: string) => {
    const confirmLink = `${process.env.FRONTEND_URL}/confirm-email/${token}`;

    await transporter.sendMail({
        from: `"Virtual Page" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Confirme seu e-mail - Virtual Page',
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #000000;">Bem-vindo à Virtual Page, ${userName}!</h2>
        
        <p>Estamos felizes por ter você conosco 💚</p>
        <p>Antes de começar a criar seus projetos, precisamos confirmar o seu endereço de e-mail.</p>

        <p style="text-align: center; margin: 30px 0;">
          <a href="${confirmLink}" 
             style="background-color: #CAFC00; color: black; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Confirmar meu e-mail
          </a>
        </p>

        <p>Se você não criou uma conta na <strong>Virtual Page</strong>, ignore este e-mail.</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

        <p style="font-size: 13px; color: #666;">
          Caso o botão acima não funcione, copie e cole o link abaixo no seu navegador:
          <br>
          <a href="${confirmLink}" style="color: #4A3AFF;">${confirmLink}</a>
        </p>

        <p style="margin-top: 40px;">Atenciosamente,<br><strong>Equipe Virtual Page</strong></p>
      </div>
    `
    });
};