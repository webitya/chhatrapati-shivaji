import nodemailer from "nodemailer"

const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
})

export const sendThankYouEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Thank You for Contacting Bright Future School",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #3b82f6 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Bright Future School</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Excellence in Education Since 1985</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px; background-color: #fef2f2;">
          <h2 style="color: #4b5563; margin: 0 0 20px 0; font-size: 24px;">Thank You, ${userName}!</h2>
          
          <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
            We have received your inquiry and appreciate your interest in Bright Future School. 
            Our admissions team will review your message and get back to you within 24-48 hours.
          </p>
          
          <p style="color: #4b5563; line-height: 1.6; margin: 0 0 30px 0; font-size: 16px;">
            In the meantime, feel free to explore our website to learn more about our programs, 
            facilities, and the bright future we can help build for your child.
          </p>
          
          <!-- Contact Info Card -->
          <div style="background-color: white; padding: 25px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 30px 0;">
            <h3 style="color: #4b5563; margin: 0 0 15px 0; font-size: 18px; font-weight: bold;">Contact Information:</h3>
            <div style="color: #4b5563; line-height: 1.8; font-size: 14px;">
              <p style="margin: 5px 0;"><strong>📞 Phone:</strong> +1 (555) 123-4567</p>
              <p style="margin: 5px 0;"><strong>✉️ Email:</strong> info@brightfuture.edu</p>
              <p style="margin: 5px 0;"><strong>📍 Address:</strong> 123 Education Street, Learning City, LC 12345</p>
              <p style="margin: 5px 0;"><strong>🕒 Office Hours:</strong> Monday - Friday: 8:00 AM - 5:00 PM</p>
            </div>
          </div>
          
          <!-- Call to Action -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background: linear-gradient(135deg, #f59e0b 0%, #3b82f6 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Visit Our Website
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #4b5563; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: white; margin: 0; font-size: 14px;">
            © 2024 Bright Future School. All rights reserved.
          </p>
          <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0 0; font-size: 12px;">
            Building bright futures through excellence in education.
          </p>
        </div>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

export const sendLeadEmail = async (leadData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "🎓 New Lead - Bright Future School Website",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #f59e0b 100%); padding: 25px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">🎓 New Lead Received</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Bright Future School Admin Panel</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #4b5563; margin: 0 0 20px 0; font-size: 20px;">Contact Details:</h2>
          
          <!-- Contact Info Cards -->
          <div style="display: grid; gap: 15px; margin-bottom: 25px;">
            <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <h3 style="color: #4b5563; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">👤 Personal Information</h3>
              <p style="color: #4b5563; margin: 5px 0; font-size: 14px;"><strong>Name:</strong> ${leadData.name}</p>
              <p style="color: #4b5563; margin: 5px 0; font-size: 14px;"><strong>Email:</strong> ${leadData.email}</p>
              <p style="color: #4b5563; margin: 5px 0; font-size: 14px;"><strong>Phone:</strong> ${leadData.phone}</p>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <h3 style="color: #4b5563; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">📋 Inquiry Details</h3>
              <p style="color: #4b5563; margin: 5px 0; font-size: 14px;"><strong>Subject:</strong> ${leadData.subject}</p>
            </div>
          </div>
          
          <!-- Message -->
          <div style="background-color: white; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 25px;">
            <h3 style="color: #4b5563; margin: 0 0 15px 0; font-size: 16px; font-weight: bold;">💬 Message:</h3>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; border: 1px solid #e5e7eb;">
              <p style="color: #4b5563; line-height: 1.6; margin: 0; font-size: 14px; white-space: pre-wrap;">${leadData.message}</p>
            </div>
          </div>
          
          <!-- Timestamp -->
          <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
            <p style="color: #4b5563; margin: 0; font-size: 14px;">
              <strong>📅 Submitted on:</strong> ${new Date(leadData.createdAt).toLocaleString()}
            </p>
          </div>
          
          <!-- Action Buttons -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background-color: #3b82f6; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 0 10px;">
              View in Admin Panel
            </a>
            <a href="mailto:${leadData.email}" style="background-color: #10b981; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 0 10px;">
              Reply to Lead
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #4b5563; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: white; margin: 0; font-size: 14px;">
            Bright Future School Admin Notification System
          </p>
          <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0 0; font-size: 12px;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

export default transporter
