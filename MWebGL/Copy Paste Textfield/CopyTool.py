import os
import sys
import subprocess

required_packages = ["pyperclip", "pyautogui", "keyboard", "colorama"]


def install_required_packages():
    installed_packages = [package.split('==')[0] for package in subprocess.check_output([sys.executable, "-m", "pip", "list"]).decode("utf-8").split("\n")[2:-1]]
    
    missing_packages = [package for package in required_packages if package not in installed_packages]
    
    if missing_packages:
        print("Installing missing packages...")
        for package in missing_packages:
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        print("Packages installed successfully.")


if any(package not in sys.modules for package in required_packages):
    install_required_packages()

import pyperclip
import time
import unicodedata
import pyautogui
import keyboard
import threading
from colorama import Fore, init

init(autoreset=True)

os.system('cls' if os.name == 'nt' else 'clear')


print(Fore.YELLOW + r"""
   ____             __        __  __       _       
  / __ \____  _____/ /_____ _/ /_/ /_  ___| |_ ___ 
 / / / / __ \/ ___/ __/ __ `/ __/ __ \/ _ \ __/ __|
/ /_/ / /_/ / /  / /_/ /_/ / /_/ / / /  __/ /_/\__ \
\____/ .___/_/   \__/\__,_/\__/_/ /_/\___/\__/___/
    /_/                                           
""")
print(Fore.MAGENTA + "This script has been developed by Ven.")
print(Fore.CYAN + "Press Shift + Q to pause/resume.")


paused = False

def normalize_text(text):
    normalized_text = ''.join(c for c in unicodedata.normalize('NFKD', text) if not unicodedata.combining(c))
    normalized_text = ''.join(c if c.isalnum() else ' ' for c in normalized_text)
    normalized_text = normalized_text.lower()
    return normalized_text

def type_with_countdown(text, delay_seconds):
    print(Fore.YELLOW + "Detected Paste, 3 seconds before launching...")
    time.sleep(delay_seconds)
    print(Fore.GREEN + "Finished typing, looking for new output...")
    pyautogui.typewrite(text, interval=0.1)

def check_pause_resume():
    global paused  
    while True:
        if keyboard.is_pressed('shift + q'):
            if paused:
                print(Fore.CYAN + "Resuming script...")
                paused = False
            else:
                print(Fore.CYAN + "Pausing script... Press Shift + Q again to resume.")
                paused = True
            time.sleep(0.5)

def clipboard_monitor():
    previous_clipboard = ""
    while True:
        if not paused:
            current_clipboard = pyperclip.paste()
            if current_clipboard != previous_clipboard:
                normalized_text = normalize_text(current_clipboard)
                text_length = len(normalized_text)
                if text_length > 0:
                    print(Fore.BLUE + "App Launcher, scanning for content...")
                    type_with_countdown(normalized_text, delay_seconds=3)
                    previous_clipboard = current_clipboard
            time.sleep(1)
        else:
            time.sleep(1)

clipboard_thread = threading.Thread(target=clipboard_monitor)

clipboard_thread.start()

keyboard_thread = threading.Thread(target=check_pause_resume)
keyboard_thread.start()

clipboard_thread.join()
