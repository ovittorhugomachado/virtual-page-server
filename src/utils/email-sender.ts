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
        <h2 style="color: #000000 !important;">Bem-vindo à Virtual Page, ${userName}!</h2>
        
        <p style="color: #000000 !important;">Estamos felizes por ter você conosco 💚</p>
        <p style="color: #000000 !important;">Antes de começar a criar seus projetos, precisamos confirmar o seu endereço de e-mail.</p>

        <p style="margin: 30px 0; color: #000000 !important">
          <a href="${confirmLink}" 
             style="background-color: #CAFC00; color: #000000 !important; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Confirmar meu e-mail
          </a>
        </p>

        <p style="color: #000000 !important;">Se você não criou uma conta na <strong>Virtual Page</strong>, ignore este e-mail.</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

        <p style="font-size: 13px; color: #000000 !important;">Caso o botão acima não funcione, copie e cole o link abaixo no seu navegador:</p>
        
        <a href="${confirmLink}" style="color: #4A3AFF;">${confirmLink}</a>

        <p style="margin-top: 40px;">Atenciosamente,<br><strong>Equipe Virtual Page</strong></p>
      </div>
    `
    });
};

export const emailresetPasswordService = async (email: string, token: string, userName: string | undefined) => {
    const resetLink = `${process.env.FRONTEND_URL}/create-new-password/${token}`

    await transporter.sendMail({
        from: `"Virtual Page" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Recuperação de senha',
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #000000 !important;">Olá ${userName}!</h2>
        
        <p style="color: #000000 !important;">Recebemos uma solicitação de redefinição de senha, clique no link abaixo para criar uma nova senha</p>
        <p style="color: #000000 !important;">Por questões de segurança o link expira em 15 minutos após a solicitação, então se precisar é só solicitar outro link no nosso portal.</p>

        <p style="margin: 30px 0; color: #000000 !important">
          <a href="${resetLink}" 
             style="background-color: #CAFC00; color: #000000 !important; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Redefinir senha
          </a>
        </p>

        <p style="color: #000000 !important;">Se você não solicitou uma nova senha desconsidere o email.</p>
        <p style="color: #000000 !important;">Caso precise de ajuda é só entrar em contato conosco respondendo esse email.</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

        <p style="font-size: 13px; color: #000000 !important;">Caso o botão acima não funcione, copie e cole o link abaixo no seu navegador:</p>
        
        <a href="${resetLink}" style="color: #4A3AFF;">${resetLink}</a>

        <p style="margin-top: 40px;">Atenciosamente,<br><strong>Equipe Virtual Page</strong></p>
      </div>
    `
    });
};