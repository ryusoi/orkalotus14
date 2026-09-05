export type NotificationPayload = {
  title: string;
  content: string;
};

/**
 * Provider-agnostic notification dispatcher.
 * Can be plugged into Webhooks, Slack, Email (Resend/Sendgrid), or console.
 */
export async function notifyOwner(payload: NotificationPayload): Promise<boolean> {
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch (err) {
      console.warn("[Notification] Webhook dispatch failed:", err);
      return false;
    }
  }

  // Standalone fallback: Log notification
  console.log(`[Notification] [${payload.title}] ${payload.content}`);
  return true;
}
