const { client, sender } = require('../config/mail');

const generateVerificationEmail = async (user, token) => {
  const verificationLink = `http://localhost:3000/api/auth/verify/${token}`;

  await client.sendMail({
    from: `"${sender.name}" <${sender.address}>`,
    to: user.email,
    subject: "Welcome to GuestPost Hub – Verify Your Email",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 10px; overflow: hidden;">
      <div style="background: #2c3e50; padding: 20px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0;">GuestPost Hub</h1>
        <p style="margin: 5px 0 0;">Your Gateway to Quality Guest Posting</p>
      </div>
      <div style="padding: 30px; text-align: left; color: #333;">
        <h2 style="color: #2c3e50;">Hi ${user.first_name},</h2>
        <p>
          Welcome to <b>GuestPost Hub</b>! 🚀
          We’re excited to have you join our community of writers and publishers.
        </p>
        <p>
          To get started, please verify your email address by clicking the button below:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}"
            style="background: #3498db; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px;">
            Verify My Email
          </a>
        </div>
        <p>
          This link will expire in <b>1 day</b>.
          If you didn’t create an account, you can safely ignore this email.
        </p>
        <p style="margin-top: 20px;">Cheers,</p>
        <p><b>The GuestPost Hub Team</b></p>
      </div>
      <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        © ${new Date().getFullYear()} GuestPost Hub. All rights reserved.
      </div>
    </div>
    `
  });
};


const generateResetPasswordEmail = async (user, token) => {
  const resetLink = `http://localhost:5173/reset-password?token=${token}`;

  await client.sendMail({
    from: `"${sender.name}" <${sender.address}>`,
    to: user.email,
    subject: "GuestPost Hub – Reset Your Password",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 10px; overflow: hidden;">
      <div style="background: #2c3e50; padding: 20px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0;">GuestPost Hub</h1>
        <p style="margin: 5px 0 0;">Reset Your Password</p>
      </div>
      <div style="padding: 30px; text-align: left; color: #333;">
        <h2 style="color: #2c3e50;">Hi ${user.first_name},</h2>
        <p>
          You requested a password reset for your <b>GuestPost Hub</b> account. Click the button below to set a new password:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}"
            style="background: #e67e22; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px;">
            Reset My Password
          </a>
        </div>
        <p>
          This link will expire in <b>10 minutes</b>. If you didn’t request a password reset, you can safely ignore this email.
        </p>
        <p style="margin-top: 20px;">Cheers,</p>
        <p><b>The GuestPost Hub Team</b></p>
      </div>
      <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        © ${new Date().getFullYear()} GuestPost Hub. All rights reserved.
      </div>
    </div>
    `
  });
};



module.exports = { generateVerificationEmail, generateResetPasswordEmail };
