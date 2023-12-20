import os

def clear_files_in_directory(directory, extensions):
    files = [file for file in os.listdir(directory) if any(file.endswith(ext) for ext in extensions)]

    if len(files) == 0:
        print(f"No files with specified extensions found in {directory}")
        return
    
    for file in files:
        file_path = os.path.join(directory, file)
        try:
            with open(file_path, 'w') as f:
                f.truncate(0)
            print(f"Cleared content of {file} in {directory}")
        except Exception as e:
            print(f"Error clearing {file} in {directory}: {e}")

if __name__ == '__main__':
    user = os.getlogin()
    
    directories = [
        f'C:\\Users\\{user}\\AppData\\LocalLow\\Multiverse ApS\\KoGaMa',
        f'C:\\Users\\{user}\\AppData\\Local\\KogamaLauncher-WWW\\log',
        f'C:\\Users\\{user}\\AppData\\Local\\KogamaLauncher-WWW\\Launcher\\log'
    ]
    
    file_extensions = ['.txt', '.log']
    
    for directory in directories:
        if os.path.exists(directory):
            clear_files_in_directory(directory, file_extensions)
        else:
            print(f"Directory not found: {directory}")
