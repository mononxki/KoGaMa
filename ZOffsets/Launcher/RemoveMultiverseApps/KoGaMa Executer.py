import os
import shutil
from colorama import init, Fore, Style

def delete_folder(path):
    if os.path.exists(path):
        shutil.rmtree(path)
        print(f"{Fore.GREEN}Deleted folder:{Style.RESET_ALL} {Fore.BLUE}{path}{Style.RESET_ALL}")
    else:
        print(f"{Fore.YELLOW}Folder not found:{Style.RESET_ALL} {Fore.BLUE}{path}{Style.RESET_ALL}")

def delete_specific_folders():
    # Get the current user's home directory
    user_home = os.path.expanduser("~")

    # Construct the paths for deletion
    appdata_local_path = os.path.join(user_home, "AppData", "Local")
    appdata_locallow_path = os.path.join(user_home, "AppData", "LocalLow")

    # Specify the folders to be deleted
    folders_to_delete = [
        "KogamaLauncher-WWW",
        "Multiverse ApS"
    ]

    # Delete folders in AppData\Local
    for folder in folders_to_delete:
        folder_path = os.path.join(appdata_local_path, folder)
        delete_folder(folder_path)

    # Delete folders in AppData\LocalLow
    for folder in folders_to_delete:
        folder_path = os.path.join(appdata_locallow_path, folder)
        delete_folder(folder_path)

# Initialize colorama
init()

# Call the function to delete the specified folders
delete_specific_folders()
