#!/usr/bin/env python3
"""
Собрать все .html .htm .css .js из директории в один текстовый файл.
Запуск:
    python collect_code.py --src "C:/Users/msi/Desktop/Obout-us" --out collected_code.txt --append false
"""
from pathlib import Path
import argparse
import sys

EXTS = {".html", ".htm", ".css", ".js"}

def read_text_safe(path: Path) -> str:
    """Попытаться прочитать в utf-8, при ошибке — в latin-1 с игнорированием ошибок."""
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return path.read_text(encoding="latin-1", errors="ignore")
    except Exception as e:
        return f"<!-- ERROR reading file: {e} -->"

def collect(src: Path, out: Path, append: bool = False, include_binary_check: bool = True):
    src = src.resolve()
    mode = "a" if append else "w"
    out.parent.mkdir(parents=True, exist_ok=True)

    files_found = 0
    with out.open(mode, encoding="utf-8") as fout:
        for p in sorted(src.rglob("*")):
            if not p.is_file():
                continue
            if p.suffix.lower() not in EXTS:
                continue

            # Опциональная простая проверка на бинарный файл: если в первых 1024 байтах есть нулевой байт
            if include_binary_check:
                try:
                    with p.open("rb") as rb:
                        head = rb.read(1024)
                        if b"\x00" in head:
                            print(f"Пропущен бинарный файл: {p}")
                            continue
                except Exception:
                    pass

            rel = p.relative_to(src)
            header = f"--- FILE: {rel} ---\nLocation: {p.resolve()}\n\n"
            fout.write(header)
            text = read_text_safe(p)
            fout.write(text)
            fout.write("\n\n")
            files_found += 1
            # Небольшой прогресс в stdout
            print(f"[{files_found}] Добавлен: {rel}")

    print(f"Готово. Найдено и записано файлов: {files_found}. Результат в: {out}")

def parse_args():
    parser = argparse.ArgumentParser(description="Собрать HTML/CSS/JS в один текстовый файл")
    parser.add_argument("--src", "-s", required=True, help="Исходная директория")
    parser.add_argument("--out", "-o", default="collected_code.txt", help="Выходной файл")
    parser.add_argument("--append", "-a", default="false", choices=["true","false"], help="Добавлять в конец файла вместо перезаписи")
    parser.add_argument("--no-binary-check", dest="binary_check", action="store_false", help="Отключить простую проверку бинарных файлов")
    return parser.parse_args()

if __name__ == "__main__":
    args = parse_args()
    SRC = Path(args.src)
    OUT = Path(args.out)
    APPEND = args.append.lower() == "true"
    if not SRC.exists() or not SRC.is_dir():
        print(f"Ошибка: исходная папка не найдена: {SRC}", file=sys.stderr)
        sys.exit(1)
    collect(SRC, OUT, append=APPEND, include_binary_check=args.binary_check)
