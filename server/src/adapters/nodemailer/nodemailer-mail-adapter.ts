import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "79fd109a7baa12",
      pass: "8c18b4f1d8b4e2"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@geedget.com>',
            to: 'Diego Fernandes <ayleen@xriveroq.com>',
            subject,
            html: body,
        })
    };
}