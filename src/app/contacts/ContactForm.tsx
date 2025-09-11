"use client";

export default function ContactForm() {
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload = {
      name: String(f.get("name") || ""),
      phone: String(f.get("phone") || ""),
      message: String(f.get("message") || ""),
    };

    const res = await fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("✅ Спасибо! Заявка отправлена в Telegram.");
      (e.target as HTMLFormElement).reset();
    } else {
      alert("❌ Ошибка: не удалось отправить заявку.");
    }
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-4 rounded-2xl border bg-white p-5 shadow-sm max-w-xl"
    >
      <input name="name" required className="rounded-xl border px-4 py-3" placeholder="Ваше имя" />
      <input name="phone" required className="rounded-xl border px-4 py-3" placeholder="Телефон" />
      <textarea name="message" className="rounded-xl border px-4 py-3 min-h-[120px]" placeholder="Сообщение: что нужно, объём, город" />
      <button className="rounded-xl bg-sky-600 px-5 py-3 text-white font-medium hover:bg-sky-700 transition">
        Отправить в Telegram
      </button>
    </form>
  );
}
