import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Контакты — Tabigi Tas",
  description: "Свяжитесь с нами по WhatsApp/Telegram или через форму.",
};

export default function Contacts() {
  return (
    <>
      <h1 className="text-3xl font-bold">Контакты</h1>
      <p className="mt-2 text-gray-700">
        Работаем по всему Казахстану. Ответим в течение дня.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Левая колонка: форма */}
        <ContactForm />

        {/* Правая колонка: контакты */}
        <div className="space-y-4">
          <a href="tel:+77788762495" className="block font-medium">
            Тел.: +7 778 876 24 95
          </a>

          <div className="flex flex-wrap gap-3">
            {/* WhatsApp (иконка чат-пузыря) */}
<a
  href="https://wa.me/77788762495?text=Здравствуйте! Хочу уточнить по камню."
  target="_blank"
  rel="noopener"
  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path fillRule="evenodd" d="M12 3.75a7.5 7.5 0 0 0-6.454 11.25l-.692 2.423a.75.75 0 0 0 .927.927l2.423-.692A7.5 7.5 0 1 0 12 3.75zm-6 7.5a6 6 0 1 1 3.11 5.266.75.75 0 0 0-.53-.056l-1.713.489.488-1.713a.75.75 0 0 0-.056-.53A5.97 5.97 0 0 1 6 11.25z" clipRule="evenodd"/>
  </svg>
  WhatsApp
</a>

{/* Telegram (иконка самолёта) */}
<a
  href="https://t.me/your_username"
  target="_blank"
  rel="noopener"
  className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 transition"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M2.25 12.75 20.3 3.7a.75.75 0 0 1 1.05.83l-3.1 14.42a.75.75 0 0 1-1.17.46l-5.02-3.66-2.63 2.63a.75.75 0 0 1-1.28-.47l-.13-4.14-5.05-1.73a.75.75 0 0 1 0-1.39z"/>
  </svg>
  Telegram
</a>

          </div>

          <p className="text-sm text-gray-600">Пн–Вс 9:00–23:00</p>
        </div>
      </div>
    </>
  );
}
