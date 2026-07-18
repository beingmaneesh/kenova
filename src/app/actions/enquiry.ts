"use server";

import nodemailer from "nodemailer";

interface EnquiryData {
  parentName: string;
  phone: string;
  email: string;
  studentName: string;
  class: string;
  syllabus: string;
  message: string;
  batchPreferences?: string[];
}

export async function submitEnquiry(data: EnquiryData) {
  const { parentName, phone, email, studentName, class: studentClass, syllabus, message, batchPreferences } = data;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const batchRows = batchPreferences?.length
    ? `<tr>
        <td style="padding: 12px 0; font-weight: bold; color: #374151; vertical-align: top;">Batch Preferences</td>
        <td style="padding: 12px 0; color: #111827;">
          <table style="border-collapse: collapse;">
            ${batchPreferences.map((slot, i) => {
              const colors = ["#F97316", "#2563EB", "#1E3A8A"];
              const labels = ["1st Choice", "2nd Choice", "3rd Choice"];
              return `<tr>
                <td style="padding: 3px 10px 3px 0;">
                  <span style="display: inline-block; background: ${colors[i]}; color: #fff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px;">${labels[i]}</span>
                </td>
                <td style="padding: 3px 0; font-size: 14px;">${slot}</td>
              </tr>`;
            }).join("")}
          </table>
        </td>
      </tr>`
    : "";

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(to right, #1E3A8A, #2563EB); padding: 24px; border-radius: 12px 12px 0 0;">
        <h2 style="color: #ffffff; margin: 0;">New Enquiry — Kenova Learning</h2>
      </div>
      <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 140px;">Parent Name</td>
            <td style="padding: 8px 0; color: #111827;">${parentName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone</td>
            <td style="padding: 8px 0; color: #111827;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email</td>
            <td style="padding: 8px 0; color: #111827;">${email || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Student Name</td>
            <td style="padding: 8px 0; color: #111827;">${studentName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Class</td>
            <td style="padding: 8px 0; color: #111827;">Class ${studentClass}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Syllabus</td>
            <td style="padding: 8px 0; color: #111827;">${syllabus === "kerala" || syllabus === "kerala-state" ? "Kerala State" : "CBSE"}</td>
          </tr>
          ${batchRows}
          ${message ? `<tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151; vertical-align: top;">Message</td>
            <td style="padding: 8px 0; color: #111827;">${message}</td>
          </tr>` : ""}
        </table>
      </div>
      <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">
        Sent from Kenova Learning website
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@kenovalearning.com",
      to: "study@kenovalearning.com",
      replyTo: email || undefined,
      subject: `New Enquiry: ${parentName} — Class ${studentClass} (${syllabus === "kerala" || syllabus === "kerala-state" ? "Kerala State" : "CBSE"})`,
      html: htmlBody,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send enquiry email:", error);
    return { success: false, error: "Failed to send enquiry. Please try again or call us directly." };
  }
}
