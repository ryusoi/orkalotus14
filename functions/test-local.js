/**
 * Test script to verify Resend email sending locally before deploying to Firebase Functions.
 *
 * Usage:
 *   RESEND_API_KEY=re_your_key MANAGEMENT_NOTIFICATION_EMAIL=your@email.com node test-local.js
 */

const { Resend } = require("resend");

const apiKey = process.env.RESEND_API_KEY;
const targetEmail = process.env.MANAGEMENT_NOTIFICATION_EMAIL || "marinauniryu@gmail.com";
const fromEmail = process.env.RESEND_FROM_EMAIL || "Orka Lotus Beach <onboarding@resend.dev>";

if (!apiKey) {
  console.error("ERROR: RESEND_API_KEY environment variable is required.");
  console.log("Usage: RESEND_API_KEY=re_xxx MANAGEMENT_NOTIFICATION_EMAIL=myemail@hotel.com node test-local.js");
  process.exit(1);
}

const resend = new Resend(apiKey);

const sampleRating = {
  id: "test_eval_" + Date.now(),
  targetId: "service-food-beverage",
  targetName: "Food & Beverage",
  sectionName: "Hotel Services",
  categoryName: "Food & Beverage",
  overallRating: 5.0,
  hospitalityRating: 5.0,
  professionalismRating: 5.0,
  helpfulnessRating: 5.0,
  courtesyRating: 5.0,
  qualityRating: 5.0,
  recommendation: "absolutely",
  comment: "Exceptional dining experience! The fresh buffet and seaside dining service were top tier. Warm compliments to the entire team.",
  guestDisplayName: "Mr. & Mrs. Anderson (Room 1402)",
  guestName: "Mr. & Mrs. Anderson",
  roomNumber: "1402",
  createdAt: new Date().toISOString(),
  submissionSessionId: "orka_test_session_local",
};

async function runTest() {
  console.log(`Sending test notification to: ${targetEmail} using Resend...`);
  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [targetEmail],
      subject: `[ORKA LOTUS] TEST New Guest Ranking: ${sampleRating.targetName} • Overall ${sampleRating.overallRating.toFixed(1)}/5.0 ★`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #081523; color: #ffffff; padding: 24px; border-radius: 12px; border: 2px solid #996515;">
          <h2 style="color: #d4af37; margin: 0 0 10px 0;">ORKA LOTUS — NEW GUEST RANKING (TEST NOTIFICATION)</h2>
          <p><strong>Target:</strong> ${sampleRating.targetName}</p>
          <p><strong>Overall Score:</strong> <span style="font-size: 20px; color: #fbbf24; font-weight: bold;">5.0 / 5.0 ★★★★★</span></p>
          <p><strong>Guest Name:</strong> ${sampleRating.guestName}</p>
          <p><strong>Room Number:</strong> ${sampleRating.roomNumber}</p>
          <p><strong>Recommendation:</strong> ${sampleRating.recommendation}</p>
          <p><strong>Comment:</strong> "${sampleRating.comment}"</p>
          <hr style="border: 1px solid #1c354d; margin: 16px 0;" />
          <p style="font-size: 11px; color: #94a3b8;">This is a test notification verifying your Resend API credentials and email delivery.</p>
        </div>
      `,
    });

    if (result.error) {
      console.error("Resend API Error:", result.error);
    } else {
      console.log("SUCCESS! Test email sent successfully. ID:", result.data.id);
    }
  } catch (err) {
    console.error("Test failed:", err);
  }
}

runTest();
