import pyperclip
import time
import unicodedata
import pyautogui
import keyboard
from colorama import Fore, Back, Style, init
import threading

init(autoreset=True)  

# FULLY MADE BY SIMON. 
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
    while True:
        if keyboard.is_pressed('shift + q'):
            global paused
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


paused = False


print(Fore.MAGENTA + "Clipboard Text Typer - Press Shift + Q to pause/resume (lightmagenta)")


clipboard_thread.start()


keyboard_thread = threading.Thread(target=check_pause_resume)
keyboard_thread.start()


clipboard_thread.join()
