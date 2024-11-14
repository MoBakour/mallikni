import nodemailer from "nodemailer";

const activationEmail = "";

const sendActivationEmail = async (code: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: activationEmail,
        subject: "Activate Your Mallikni Account",
        html: `<p>Your activation code is: <strong>${code}</strong></p>`,
    });
};

export { sendActivationEmail };
