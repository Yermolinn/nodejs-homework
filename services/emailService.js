const pug = require("pug");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const path = require("path");
const { convert } = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.email;
    this.url = url;
    this.from = `Contacts Admin <${process.env.SENDGRID_FROM}>`;
  }

  _initTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_API_KEY,
        },
      });
    }
    return nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async _send(template, subject) {
    const html = pug.renderFile(
      path.join(__dirname, "..", "views", "emails", `${template}.pug`),
      {
        name: this.name,
        url: this.url,
        subject,
      }
    );

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: this.to,
      from: this.from,
      subject,
      html,
      text: convert(html),
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async sendHello() {
    await this._send("hello", "Welcome mail..");
  }
};