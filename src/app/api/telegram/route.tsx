import { NextResponse } from "next/server";

// Явно укажем node-runtime (на Vercel стабильнее для fetch к внешним API)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name = "", phone = "", message = "" } = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { ok: false, error: "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID" },
        { status: 500 }
      );
    }

    // Сообщение в HTML, чтобы было аккуратно
    const text =
      `<b>Новая заявка с сайта Tabigi Tas</b>\n` +
      `👤 <b>Имя:</b> ${escapeHtml(name) || "-"}\n` +
      `📞 <b>Телефон:</b> ${escapeHtml(phone) || "-"}\n` +
      `💬 <b>Сообщение:</b> ${escapeHtml(message) || "-"}`;

    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        chat_id: chatId,       // строка или число — ок
        text,
        parse_mode: "HTML",    // чтобы работало форматирование
        disable_web_page_preview: true
      }),
    });

    const data = await tg.json().catch(() => ({}));

    if (!tg.ok || !data?.ok) {
      const reason = data?.description || `HTTP ${tg.status}`;
      console.error("Telegram send error:", reason);
      return NextResponse.json(
        { ok: false, error: reason },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("TG route error:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Send error" },
      { status: 500 }
    );
  }
}

/** Мини-защита от спецсимволов в HTML */
function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
