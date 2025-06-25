const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // gunakan 'true' hanya jika port adalah 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(targetEmail, content) {
    const message = {
      from: 'OpenMusic App <noreply@openmusic.com>',
      to: targetEmail,
      subject: 'Ekspor Playlist Anda',
      text: 'Terlampir hasil ekspor playlist dalam format JSON.',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    const info = await this._transporter.sendMail(message);
    console.log('✉️ Email terkirim dengan ID:', info.messageId);
  }
}

module.exports = MailSender;
