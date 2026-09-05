# ORKA LOTUS — Firebase Cloud Functions Email Notifications

This directory contains the Firebase Cloud Function (`onNewGuestRanking`) that triggers automatically whenever a **NEW guest ranking** is submitted to the Firebase Realtime Database at `/ratings/{ratingId}`.

It formats the review with the executive luxury branding of **ORKA LOTUS BEACH HOTEL**, including visual star scores, guest name, room number, individual category ratings, and written comments, and delivers it immediately to your management email using **Resend**.

---

## 1. Prerequisites

Ensure you have the Firebase CLI installed and are logged in to your Firebase account:

```bash
npm install -g firebase-tools
firebase login
```

Verify your project is set to:
```bash
firebase use orka-lotus-beach-marinaryu
```

---

## 2. Configure Your Resend API Key (Secure Secret)

**NEVER** put your Resend API key in client-side code. Firebase Cloud Functions uses **Cloud Secret Manager** to securely store secrets.

Run this command in your terminal:
```bash
firebase functions:secrets:set RESEND_API_KEY
```
When prompted, paste your Resend API key (e.g. `re_123456789_abcdef...`).

---

## 3. Configure Your Management Notification Email

Set your destination management email address:
```bash
firebase functions:config:set management.email="your-management-email@example.com"
```
Or set it as an environment variable in `functions/.env`:
```bash
MANAGEMENT_NOTIFICATION_EMAIL=your-management-email@example.com
```

If you have a verified domain in Resend, you can also optionally configure your custom from-address:
```bash
RESEND_FROM_EMAIL="Orka Lotus Quality <quality@yourdomain.com>"
```
*(By default, it uses `Orka Lotus Beach <onboarding@resend.dev>`, which works immediately with zero domain DNS setup).*

---

## 4. Install Dependencies & Build

Navigate to the `functions` directory:
```bash
cd functions
npm install
npm run build
```

---

## 5. Deploy to Firebase

Deploy only the Cloud Function to your Firebase project:
```bash
firebase deploy --only functions
```

Firebase CLI will display:
```
✔  functions[europe-west1-onNewGuestRanking]: Successful create operation.
```

---

## 6. How to Test

### Method A: Submit a Review in the Hotel App (End-to-End Live Test)
1. Open your Orka Lotus Beach application in the browser.
2. Click any **⭐ Rate This** button on the page (e.g., Food & Beverage, Beach & Jetties, Reception, or Management).
3. Select your star rating, enter a room number (e.g. `Room 1402`) or your name, and write a test comment.
4. Click **Submit My Rating**.
5. The rating is saved to Firebase Realtime Database at `/ratings/{ratingId}`.
6. The Cloud Function triggers instantly, logs the event, and sends the notification email via Resend to your management inbox!

### Method B: View Realtime Function Execution Logs
To inspect function execution and delivery logs in real time:
```bash
firebase functions:log
```

### Method C: Fast Local Test Script (Without Deploying)
You can test your Resend API key and see what the email looks like right now:
```bash
cd functions
RESEND_API_KEY="your_resend_api_key" MANAGEMENT_NOTIFICATION_EMAIL="your@email.com" node test-local.js
```
