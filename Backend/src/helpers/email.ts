import nodemailer from 'nodemailer';
import logger from './logger';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Transporter from 'nodemailer/lib/mailer/index';
import { config } from '../config/';

export type SendEmailPayload = {
  receiver: string;
  subject: string;
  text?: string;
  html?: string;
};

async function sendEmail(data: SendEmailPayload): Promise<boolean> {
  let isEmailSent = true;
  let transporter: Transporter<SMTPTransport.SentMessageInfo>;

  try {
    if (!data.text && !data.html) {
      return false;
    }

    transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.MAIL_HOST,
      port:465,
      secure: true,
      auth: {
      user: process.env.MAIL_USERNAME,
      pass : process.env.MAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `${process.env.MAIL_DISPLAY_NAME} <${process.env.MAIL_FROM}>`,
      to: data.receiver,
      subject: data.subject,
      html: data.html,
      text: data.text,
    });
  } catch (error) {
    logger.error(error);
    isEmailSent = false;
  } finally {
    // @ts-ignore
    if (transporter !== undefined) {
      transporter.close();
    }
  }
  return isEmailSent;
}

export default { sendEmail };
