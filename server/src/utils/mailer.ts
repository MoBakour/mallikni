import nodemailer from "nodemailer";
import env from "../config/env";

type TMode = "new" | "update";

const getTemplate = (code: string, mode: TMode) => {
    if (mode === "new") {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Activate Your Mallikni Account</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f8f9fa;
                    margin: 0;
                    padding: 0;
                    color: #333333;
                }
                .email-container {
                    max-width: 600px;
                    margin: 40px auto;
                    background: #ffffff;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                    background-color: #fcd02c;
                    color: #ffffff;
                    padding: 20px;
                    text-align: center;
                }
                .email-header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .email-body {
                    padding: 20px;
                }
                .email-body p {
                    font-size: 16px;
                    line-height: 1.6;
                    margin: 10px 0;
                }
                .verification-code {
                    font-size: 32px;
                    font-weight: bold;
                    color: #fcd02c;
                    text-align: center;
                    margin: 20px 0;
                }
                .email-footer {
                    background-color: #f1f1f1;
                    padding: 15px;
                    text-align: center;
                    font-size: 14px;
                    color: #666666;
                }
                .email-footer a {
                    color: #007bff;
                    text-decoration: none;
                }
                .email-footer a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">
                    <h1>Mallikni</h1>
                </div>
                <div class="email-body">
                    <p>Hello,</p>
                    <p>Thank you for registering with <strong>Mallikni</strong>. To complete your account setup, please use the verification code below:</p>
                    <div class="verification-code">${code}</div>
                    <p>If you did not sign up for Mallikni, please ignore this email or contact our support team for assistance.</p>
                    <p>Welcome to Mallikni,</p>
                    <p>The Mallikni Team</p>
                </div>
                <div class="email-footer">
                    <p>&copy; 2024 Mallikni. All rights reserved.</p>
                    <p><a href="https://mallikni.netlify.app">Visit our website</a></p>
                </div>
            </div>
        </body>
        </html>
        `;
    } else {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Update Your Mallikni Account</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f8f9fa;
                    margin: 0;
                    padding: 0;
                    color: #333333;
                }
                .email-container {
                    max-width: 600px;
                    margin: 40px auto;
                    background: #ffffff;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                    background-color: #fcd02c;
                    color: #ffffff;
                    padding: 20px;
                    text-align: center;
                }
                .email-header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .email-body {
                    padding: 20px;
                }
                .email-body p {
                    font-size: 16px;
                    line-height: 1.6;
                    margin: 10px 0;
                }
                .verification-code {
                    font-size: 32px;
                    font-weight: bold;
                    color: #fcd02c;
                    text-align: center;
                    margin: 20px 0;
                }
                .email-footer {
                    background-color: #f1f1f1;
                    padding: 15px;
                    text-align: center;
                    font-size: 14px;
                    color: #666666;
                }
                .email-footer a {
                    color: #007bff;
                    text-decoration: none;
                }
                .email-footer a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">
                    <h1>Mallikni</h1>
                </div>
                <div class="email-body
                ">
                    <p>Hello,</p>
                    <p>Your account details have been updated. To verify the changes, please use the verification code below:</p>
                    <div class="verification-code">${code}</div>
                    <p>If you did not make these changes, please contact our support team immediately.</p>
                    <p>Thank you,</p>
                    <p>The Mallikni Team</p>
                </div>
                <div class="email-footer">
                    <p>&copy; 2024 Mallikni. All rights reserved.</p>
                    <p><a href="https://mallikni.netlify.app">Visit our website</a></p>
                </div>
            </div>
        </body>
        </html>
        `;
    }
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_APP_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const sendActivationEmail = async (
    email: string,
    code: string,
    mode: "new" | "update"
) => {
    await transporter.sendMail({
        from: env.EMAIL_USER,
        to: email,
        subject:
            mode === "new"
                ? "Activate Your Mallikni Account"
                : "Verify Your Mallikni Account Update",
        html: getTemplate(code, mode),
    });
};

export { sendActivationEmail };
