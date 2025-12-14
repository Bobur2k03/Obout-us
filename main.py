import os

def collect_code_files(root_dir, output_file, extensions):
    """
    Собирает все файлы с указанными расширениями в один txt файл.
    
    :param root_dir: Корневая папка проекта
    :param output_file: Имя итогового txt файла
    :param extensions: Список расширений (например ['.html', '.css', '.js'])
    """
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for foldername, _, filenames in os.walk(root_dir):
            for filename in filenames:
                if any(filename.endswith(ext) for ext in extensions):
                    file_path = os.path.join(foldername, filename)
                    try:
                        with open(file_path, 'r', encoding='utf-8') as infile:
                            outfile.write(f"\n\n===== {file_path} =====\n\n")
                            outfile.write(infile.read())
                    except Exception as e:
                        print(f"Не удалось прочитать {file_path}: {e}")

if __name__ == "__main__":
    project_dir = "."   # текущая папка проекта
    output_file = "all_code.txt"
    
    # Берём только HTML, CSS и JS
    extensions = [".html", ".css", ".js"]
    
    collect_code_files(project_dir, output_file, extensions)
    print(f"Все HTML, CSS и JS файлы собраны в {output_file}")
