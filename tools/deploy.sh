#!/usr/bin/env bash
# Заливка dist/ на хостинг PS.kz по FTP (запускается из GitHub Actions).
#
# Заливает только изменённые файлы: на сервере лежит .deploy-manifest.txt
# со списком файлов и их контрольными суммами с прошлой заливки. Сравниваем
# со свежей сборкой, заливаем новое и изменённое, удаляем то, чего больше нет.
# Файлы, которых нет в манифесте (чужие), не трогаем.
#
# Сервер иногда подвисает на отдельных файлах — lftp в этом случае сам
# переподключается и повторяет.
#
# Нужны переменные окружения FTP_SERVER, FTP_USERNAME, FTP_PASSWORD.
set -euo pipefail

MANIFEST=.deploy-manifest.txt
work=$(mktemp -d)

lftp_run() {
  LFTP_PASSWORD="$FTP_PASSWORD" lftp --env-password -u "$FTP_USERNAME" "$FTP_SERVER" <<EOF
set cmd:fail-exit yes
set ftp:ssl-force yes
set ftp:ssl-protect-data yes
set ftp:passive-mode yes
set net:timeout 25
set net:max-retries 10
set net:reconnect-interval-base 3
set net:reconnect-interval-max 20
set xfer:clobber yes
$1
EOF
}

# 1. Манифест с прошлой заливки (при первой заливке его нет — льём всё)
if lftp_run "get $MANIFEST -o $work/old.txt" >/dev/null 2>&1; then
  echo "Манифест прошлой заливки найден."
else
  echo "Манифеста нет — первая заливка, отправляем всё."
  : > "$work/old.txt"
fi

# 2. Манифест свежей сборки: "<sha256>  <путь>"
(cd dist && find . -type f ! -name "$MANIFEST" -printf '%P\n' | LC_ALL=C sort \
  | while IFS= read -r f; do printf '%s  %s\n' "$(sha256sum "$f" | cut -d' ' -f1)" "$f"; done) > "$work/new.txt"

# 3. Что залить и что удалить
LC_ALL=C comm -13 <(LC_ALL=C sort "$work/old.txt") "$work/new.txt" | sed 's/^[0-9a-f]*  //' > "$work/upload.txt"
LC_ALL=C comm -23 <(sed 's/^[0-9a-f]*  //' "$work/old.txt" | LC_ALL=C sort -u) \
                  <(sed 's/^[0-9a-f]*  //' "$work/new.txt" | LC_ALL=C sort -u) > "$work/delete.txt"
echo "Залить: $(wc -l < "$work/upload.txt"), удалить: $(wc -l < "$work/delete.txt")"

# 4. Скрипт для lftp: сначала заливка, потом удаление, в конце — новый манифест
{
  while IFS= read -r f; do
    d=$(dirname "$f")
    [ "$d" = "." ] || echo "mkdir -p -f \"$d\""
    echo "put \"dist/$f\" -o \"$f\""
  done < "$work/upload.txt"
  while IFS= read -r f; do echo "rm -f \"$f\""; done < "$work/delete.txt"
  echo "put \"$work/new.txt\" -o \"$MANIFEST\""
} > "$work/cmds.lftp"

lftp_run "source $work/cmds.lftp"
echo "Готово."
