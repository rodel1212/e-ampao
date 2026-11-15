import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, openedAt } = await request.json();
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "🧧 May Nagbukas ng Digital Ampao Mo!",
              color: 15548997,
              fields: [
                { name: "Nagbukas", value: name, inline: true },
                { name: "Oras", value: openedAt, inline: true },
              ],
            },
          ],
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
