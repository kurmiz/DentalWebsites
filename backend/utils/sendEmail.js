const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');

// Email templates
const emailTemplates = {
  emailVerification: {
    subject: 'Email Verification - Subha Dental Care',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🦷 Subha Dental Care</div>
            <h1>Welcome to Our Dental Family!</h1>
          </div>
          <div class="content">
            <h2>Hello {{name}},</h2>
            <p>Thank you for registering with Subha Dental Care! We're excited to have you as part of our dental family.</p>
            <p>To complete your registration and start booking appointments, please verify your email address by clicking the button below:</p>
            <div style="text-align: center;">
              <a href="{{verificationUrl}}" class="button">Verify Email Address</a>
            </div>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #2563eb;">{{verificationUrl}}</p>
            <p><strong>This verification link will expire in 24 hours.</strong></p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            <h3>What's Next?</h3>
            <ul>
              <li>✅ Verify your email address</li>
              <li>📅 Book your first appointment</li>
              <li>🦷 Experience quality dental care</li>
            </ul>
            <p>If you have any questions, feel free to contact us at <a href="mailto:{{clinicEmail}}">{{clinicEmail}}</a> or call us at {{clinicPhone}}.</p>
          </div>
          <div class="footer">
            <p>{{clinicName}}<br>
            {{clinicAddress}}<br>
            Phone: {{clinicPhone}} | Email: {{clinicEmail}}</p>
            <p>If you didn't create an account with us, please ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `
  },

  appointmentConfirmation: {
    subject: 'Appointment Confirmation - Subha Dental Care',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
          .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
          .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .label { font-weight: bold; color: #374151; }
          .value { color: #1f2937; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🦷 Subha Dental Care</div>
            <h1>Appointment Confirmed!</h1>
          </div>
          <div class="content">
            <h2>Hello {{patientName}},</h2>
            <p>Your appointment has been successfully confirmed. We look forward to seeing you!</p>

            <div class="appointment-details">
              <h3>📅 Appointment Details</h3>
              <div class="detail-row">
                <span class="label">Service:</span>
                <span class="value">{{service}}</span>
              </div>
              <div class="detail-row">
                <span class="label">Date:</span>
                <span class="value">{{appointmentDate}}</span>
              </div>
              <div class="detail-row">
                <span class="label">Time:</span>
                <span class="value">{{appointmentTime}}</span>
              </div>
              <div class="detail-row">
                <span class="label">Duration:</span>
                <span class="value">{{duration}} minutes</span>
              </div>
              <div class="detail-row">
                <span class="label">Appointment ID:</span>
                <span class="value">{{appointmentId}}</span>
              </div>
            </div>

            <h3>📋 Important Information</h3>
            <ul>
              <li>Please arrive 15 minutes before your appointment time</li>
              <li>Bring a valid ID and insurance card (if applicable)</li>
              <li>If you need to reschedule, please call us at least 24 hours in advance</li>
              <li>For emergency situations, contact us immediately</li>
            </ul>

            <p>If you have any questions or need to make changes to your appointment, please contact us at <a href="mailto:{{clinicEmail}}">{{clinicEmail}}</a> or call {{clinicPhone}}.</p>
          </div>
          <div class="footer">
            <p>{{clinicName}}<br>
            {{clinicAddress}}<br>
            Phone: {{clinicPhone}} | Email: {{clinicEmail}}</p>
          </div>
        </div>
      </body>
      </html>
    `
  },

  securityAlert: {
    subject: 'Security Alert - Subha Dental Care',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Security Alert</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
          .alert-box { background: #fee2e2; border: 2px solid #dc2626; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🦷 Subha Dental Care</div>
            <h1>🚨 Security Alert</h1>
          </div>
          <div class="content">
            <h2>Hello {{name}},</h2>

            <div class="alert-box">
              <h3>⚠️ Suspicious Activity Detected</h3>
              <p>We detected unusual activity on your account that may indicate a security concern.</p>
            </div>

            <h3>📋 Activity Details</h3>
            <ul>
              <li><strong>Time:</strong> {{timestamp}}</li>
              <li><strong>IP Address:</strong> {{ip}}</li>
              <li><strong>Device:</strong> {{userAgent}}</li>
              <li><strong>Concerns:</strong> {{indicators}}</li>
            </ul>

            <h3>🛡️ What You Should Do</h3>
            <ol>
              <li>If this was you, no action is needed</li>
              <li>If this wasn't you, change your password immediately</li>
              <li>Review your recent account activity</li>
              <li>Contact us if you notice anything suspicious</li>
            </ol>

            <p>If you have any concerns, please contact us immediately at {{clinicPhone}} or reply to this email.</p>
          </div>
          <div class="footer">
            <p>{{clinicName}}<br>
            {{clinicAddress}}<br>
            Phone: {{clinicPhone}} | Email: {{clinicEmail}}</p>
          </div>
        </div>
      </body>
      </html>
    `
  },

  appointmentReminder: {
    subject: 'Appointment Reminder - Tomorrow at Subha Dental Care',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Reminder</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
          .reminder-box { background: #fef3c7; border: 2px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🦷 Subha Dental Care</div>
            <h1>Appointment Reminder</h1>
          </div>
          <div class="content">
            <h2>Hello {{patientName}},</h2>

            <div class="reminder-box">
              <h3>⏰ Don't Forget!</h3>
              <p><strong>You have an appointment tomorrow at {{appointmentTime}}</strong></p>
            </div>

            <div class="appointment-details">
              <h3>📅 Appointment Details</h3>
              <p><strong>Service:</strong> {{service}}</p>
              <p><strong>Date:</strong> {{appointmentDate}}</p>
              <p><strong>Time:</strong> {{appointmentTime}}</p>
              <p><strong>Duration:</strong> {{duration}} minutes</p>
            </div>

            <h3>📋 Preparation Checklist</h3>
            <ul>
              <li>✅ Arrive 15 minutes early</li>
              <li>✅ Bring valid ID</li>
              <li>✅ Bring insurance card (if applicable)</li>
              <li>✅ List any medications you're taking</li>
              <li>✅ Note any changes in your health</li>
            </ul>

            <p>If you need to reschedule or cancel, please contact us as soon as possible at {{clinicPhone}} or reply to this email.</p>
          </div>
          <div class="footer">
            <p>{{clinicName}}<br>
            {{clinicAddress}}<br>
            Phone: {{clinicPhone}} | Email: {{clinicEmail}}</p>
          </div>
        </div>
      </body>
      </html>
    `
  }
};

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Replace template variables
const replaceTemplateVariables = (template, data) => {
  let result = template;

  // Default clinic data
  const defaultData = {
    clinicName: process.env.CLINIC_NAME || 'Subha Dental Care',
    clinicAddress: process.env.CLINIC_ADDRESS || 'Buddha chowk, Bhairahawa, Nepal',
    clinicPhone: process.env.CLINIC_PHONE || '+977 9864467519',
    clinicEmail: process.env.CLINIC_EMAIL || 'info@subhadentalcare.com'
  };

  const allData = { ...defaultData, ...data };

  // Replace all {{variable}} with actual values
  Object.keys(allData).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, allData[key] || '');
  });

  return result;
};

// Main send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    let htmlContent = '';
    let subject = options.subject;

    // Use template if specified
    if (options.template && emailTemplates[options.template]) {
      const template = emailTemplates[options.template];
      htmlContent = replaceTemplateVariables(template.html, options.data || {});
      subject = subject || replaceTemplateVariables(template.subject, options.data || {});
    } else {
      htmlContent = options.html || options.message;
    }

    const mailOptions = {
      from: `${process.env.CLINIC_NAME} <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: options.email,
      subject: subject,
      html: htmlContent,
      text: options.text
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error(`Email could not be sent: ${error.message}`);
  }
};

module.exports = sendEmail;
