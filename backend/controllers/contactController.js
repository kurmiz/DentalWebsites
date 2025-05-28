const { validationResult } = require('express-validator');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      name,
      email,
      phone,
      subject,
      message,
      type = 'general'
    } = req.body;

    // Prepare email content
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-row { display: flex; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .label { font-weight: bold; color: #374151; min-width: 120px; }
          .value { color: #1f2937; }
          .message-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
          .priority { padding: 5px 10px; border-radius: 15px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
          .priority.emergency { background: #fee2e2; color: #dc2626; }
          .priority.high { background: #fef3c7; color: #d97706; }
          .priority.normal { background: #dbeafe; color: #2563eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🦷 New Contact Form Submission</h1>
            <p>Subha Dental Care Website</p>
          </div>
          <div class="content">
            <div class="info-row">
              <span class="label">Type:</span>
              <span class="value">
                <span class="priority ${type === 'emergency' ? 'emergency' : type === 'complaint' ? 'high' : 'normal'}">
                  ${type.toUpperCase()}
                </span>
              </span>
            </div>
            <div class="info-row">
              <span class="label">Name:</span>
              <span class="value">${name}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value">${email}</span>
            </div>
            ${phone ? `
            <div class="info-row">
              <span class="label">Phone:</span>
              <span class="value">${phone}</span>
            </div>
            ` : ''}
            <div class="info-row">
              <span class="label">Subject:</span>
              <span class="value">${subject}</span>
            </div>
            <div class="info-row">
              <span class="label">Submitted:</span>
              <span class="value">${new Date().toLocaleString()}</span>
            </div>
            ${req.user ? `
            <div class="info-row">
              <span class="label">User ID:</span>
              <span class="value">${req.user._id} (Registered User)</span>
            </div>
            ` : ''}
            
            <div class="message-box">
              <h3>Message:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            
            <p><strong>Action Required:</strong></p>
            <ul>
              <li>Respond to the customer within 24 hours</li>
              <li>Log this inquiry in the CRM system</li>
              <li>Follow up if no response within 48 hours</li>
              ${type === 'emergency' ? '<li><strong>URGENT:</strong> Contact immediately by phone</li>' : ''}
            </ul>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to clinic
    await sendEmail({
      email: process.env.CLINIC_EMAIL || 'info@subhadentalcare.com',
      subject: `[${type.toUpperCase()}] New Contact Form: ${subject}`,
      html: emailContent
    });

    // Send auto-reply to customer
    const autoReplyContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Us</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .highlight-box { background: #ecfdf5; border: 2px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🦷 Subha Dental Care</div>
            <h1>Thank You for Contacting Us!</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Thank you for reaching out to Subha Dental Care. We have received your message and appreciate you taking the time to contact us.</p>
            
            <div class="highlight-box">
              <h3>📧 Your Message Details</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Type:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <h3>What Happens Next?</h3>
            <ul>
              <li>✅ Your message has been received and logged</li>
              <li>📞 Our team will review your inquiry</li>
              <li>💬 We'll respond within 24 hours</li>
              ${type === 'emergency' ? '<li>🚨 <strong>Emergency cases will be prioritized and contacted immediately</strong></li>' : ''}
            </ul>
            
            ${type === 'emergency' ? `
            <div style="background: #fee2e2; border: 2px solid #dc2626; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #dc2626;">🚨 Emergency Contact</h3>
              <p style="color: #dc2626;"><strong>For immediate assistance, please call us at ${process.env.CLINIC_PHONE || '+977 9864467519'}</strong></p>
            </div>
            ` : ''}
            
            <p>If you have any additional questions or concerns, please don't hesitate to contact us:</p>
            <ul>
              <li>📞 Phone: ${process.env.CLINIC_PHONE || '+977 9864467519'}</li>
              <li>📧 Email: ${process.env.CLINIC_EMAIL || 'info@subhadentalcare.com'}</li>
              <li>📍 Address: ${process.env.CLINIC_ADDRESS || 'Buddha chowk, Bhairahawa, Nepal'}</li>
            </ul>
            
            <p>We look forward to serving you and helping you achieve optimal oral health!</p>
          </div>
          <div class="footer">
            <p>${process.env.CLINIC_NAME || 'Subha Dental Care'}<br>
            ${process.env.CLINIC_ADDRESS || 'Buddha chowk, Bhairahawa, Nepal'}<br>
            Phone: ${process.env.CLINIC_PHONE || '+977 9864467519'} | Email: ${process.env.CLINIC_EMAIL || 'info@subhadentalcare.com'}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail({
      email: email,
      subject: 'Thank You for Contacting Subha Dental Care',
      html: autoReplyContent
    });

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you within 24 hours.',
      data: {
        submittedAt: new Date().toISOString(),
        type: type,
        responseTime: type === 'emergency' ? 'Immediate' : '24 hours'
      }
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // If email sending fails, still acknowledge the submission
    if (error.message.includes('Email could not be sent')) {
      return res.status(202).json({
        success: true,
        message: 'Your message has been received. Due to technical issues, you may not receive an immediate confirmation email, but we will respond to your inquiry soon.',
        warning: 'Email delivery may be delayed'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while processing your message. Please try again or contact us directly.'
    });
  }
};

module.exports = {
  submitContactForm
};
