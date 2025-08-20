import nodemailer from "nodemailer"

const emailUser = process.env.EMAIL_USER
const emailPassword = process.env.EMAIL_APP_PASSWORD

let transporter = null

if (emailUser && emailPassword) {
  try {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    })
  } catch (error) {
    console.warn("Failed to create email transporter:", error.message)
  }
} else {
  console.warn("Email configuration not complete - EMAIL_USER and EMAIL_APP_PASSWORD required")
}

export const sendThankYouEmail = async (userEmail, userName) => {
  if (!transporter) {
    console.warn("Email transporter not configured, skipping thank you email")
    return { success: false, message: "Email not configured" }
  }

  try {
    const mailOptions = {
      from: emailUser,
      to: userEmail,
      subject: "Thank You for Contacting Chhatrapati Shivaji +2 High School",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #3b82f6 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Chhatrapati Shivaji +2 High School</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Excellence in Education</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px; background-color: #fef2f2;">
            <h2 style="color: #4b5563; margin: 0 0 20px 0; font-size: 24px;">Thank You, ${userName}!</h2>
            
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
              We have received your inquiry and appreciate your interest in Chhatrapati Shivaji +2 High School. 
              Our team will review your message and get back to you within 24-48 hours.
            </p>
            
            <!-- Contact Info Card -->
            <div style="background-color: white; padding: 25px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 30px 0;">
              <h3 style="color: #4b5563; margin: 0 0 15px 0; font-size: 18px; font-weight: bold;">Contact Information:</h3>
              <div style="color: #4b5563; line-height: 1.8; font-size: 14px;">
                <p style="margin: 5px 0;"><strong>📞 Phone:</strong> +91 86512 86714</p>
                <p style="margin: 5px 0;"><strong>✉️ Email:</strong> chatrapatishivaji4321@gmail.com</p>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #4b5563; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: white; margin: 0; font-size: 14px;">
              © 2024 Chhatrapati Shivaji +2 High School. All rights reserved.
            </p>
          </div>
        </div>
      `,
    }

    const result = await transporter.sendMail(mailOptions)
    return { success: true, result }
  } catch (error) {
    console.error("Failed to send thank you email:", error)
    return { success: false, error: error.message }
  }
}

export const sendLeadEmail = async (leadData) => {
  if (!transporter) {
    console.warn("Email transporter not configured, skipping lead email")
    return { success: false, message: "Email not configured" }
  }

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    console.warn("ADMIN_EMAIL not configured, skipping lead email")
    return { success: false, message: "Admin email not configured" }
  }

  try {
    const mailOptions = {
      from: emailUser,
      to: adminEmail,
      subject: "🎓 New Lead - Chhatrapati Shivaji +2 High School",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #f59e0b 100%); padding: 25px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">🎓 New Lead Received</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Chhatrapati Shivaji +2 High School</p>
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
          </div>
          
          <!-- Footer -->
          <div style="background-color: #4b5563; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: white; margin: 0; font-size: 14px;">
              Chhatrapati Shivaji +2 High School Admin Notification
            </p>
          </div>
        </div>
      `,
    }

    const result = await transporter.sendMail(mailOptions)
    return { success: true, result }
  } catch (error) {
    console.error("Failed to send lead email:", error)
    return { success: false, error: error.message }
  }
}

export default transporter
