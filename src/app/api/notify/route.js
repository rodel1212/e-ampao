import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const senderName = body?.name?.trim() || "Anonymous Ninong/Ninang";
    const openedTime =
      body?.openedAt ||
      new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" });

    const webhookUrl =
      process.env.DISCORD_WEBHOOK_URL ||
      "https://discord.com/api/webhooks/1571492087126294528/vl5x7k_moBNdENpp0780qx4qkeVYYfzBfVVEk1gmD-y_HWLiiUNhb26oUM96_q5gnk_s";

    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "🧧 May Nagbukas ng Digital Ampao Mo!",
            color: 15548997,
            fields: [
              { name: "👤 Nagbukas", value: senderName, inline: true },
              { name: "⏰ Oras", value: openedTime, inline: true },
            ],
            footer: { text: "e-Ampao Notification" },
          },
        ],
      }),
    });

    if (!discordRes.ok) {
      const errorText = await discordRes.text();
      console.error("Discord rejected webhook:", errorText);
      return NextResponse.json(
        { success: false, error: errorText },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notify route error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}