#!/bin/bash
# Готовит облегчённые версии фотографий.
#
# Из каждого файла images/*.jpg делает:
#   имя-480.jpg / имя-480.webp   — для телефона
#   имя-800.jpg / имя-800.webp   — для планшета и крупных блоков
#   имя.webp                     — полный размер в WebP для десктопа
#
# Сам исходный .jpg НЕ трогается: именно его индексирует поиск по картинкам
# и показывает превью в WhatsApp и Telegram.
#
# Запуск (из корня репозитория):  npm run images
# Требует: imagemagick  (brew install imagemagick)
#
# ВАЖНО: замена фото = новое имя файла. На /images/ стоит кэш на год,
# иначе у вернувшегося посетителя старое фото залипнет надолго.

set -e
cd "$(dirname "$0")/.."

command -v magick >/dev/null || { echo "Нужен imagemagick: brew install imagemagick"; exit 1; }

SIZES="480 800"
Q_JPG=82
Q_WEBP=80

for f in images/*.jpg; do
  case "$f" in *-480.jpg|*-800.jpg) continue;; esac

  name=$(basename "$f" .jpg)
  w=$(magick identify -format "%w" "$f")

  magick "$f" -quality $Q_WEBP -define webp:method=6 -strip "images/$name.webp"

  # Увеличивать нельзя: получится файл тяжелее и мыльнее оригинала.
  for S in $SIZES; do
    if [ "$w" -gt "$S" ]; then
      magick "$f" -resize ${S}x -quality $Q_JPG  -strip -interlace Plane "images/$name-${S}.jpg"
      magick "$f" -resize ${S}x -quality $Q_WEBP -define webp:method=6 -strip "images/$name-${S}.webp"
    else
      cp "$f" "images/$name-${S}.jpg"
      magick "$f" -quality $Q_WEBP -define webp:method=6 -strip "images/$name-${S}.webp"
    fi
  done

  printf "  %s\n" "$name"
done

echo ""
echo "Готово. Дальше: npm run build"
