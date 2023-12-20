import os
import subprocess
import requests
import time
from colorama import Fore, init

# Fully Developed by Simon (SleepTght / Disease) 
# Enjoy.
init(autoreset=True)


install_url = "https://www-gamelauncher.kogstatic.com/www/KogamaLauncher.msi?_t=1437643420"
installer_filename = "KogamaLauncher.msi"


user_home = os.path.expanduser("~")
uninstall_path = [
    os.path.join(user_home, "AppData", "Local", "KogamaLauncher-WWW"),
    os.path.join(user_home, "AppData", "LocalLow", "Multiverse ApS")
]


def check_folders_exist():
    return all(os.path.exists(path) for path in uninstall_path)


def install_kogama():
    try:

        response = requests.get(install_url)
        if response.status_code == 200:
            with open(installer_filename, "wb") as installer_file:
                installer_file.write(response.content)
            print(f"{Fore.GREEN}Downloaded KoGaMa Installer")

        
            subprocess.run([installer_filename], shell=True, check=True)
            print(f"{Fore.LIGHTYELLOW_EX}Installed KoGaMa")

        
            time.sleep(10)

        
            if not check_folders_exist():
             
                repair_command = ["msiexec", "/f", installer_filename]
                subprocess.run(repair_command, shell=True, check=True)
                print(f"{Fore.LIGHTCYAN_EX}Fetching repair")

           s
                time.sleep(10)

              
                if not check_folders_exist():
                    print(f"{Fore.RED}Installation Try has failed.")
            else:
                print(f"{Fore.GREEN}Installation successful.")
            
           
            os.remove(installer_filename)
            print(f"{Fore.GREEN}Cleaned up downloaded installer")
        else:
            print(f"{Fore.RED}Error downloading KoGaMa Installer: HTTP {response.status_code}")
    except Exception as e:
        print(f"{Fore.RED}Error installing KoGaMa: {str(e)}")

def main():
    print(f"{Fore.YELLOW}Starting KoGaMa installation...")
    install_kogama()
    print(f"{Fore.YELLOW}Finished!")

if __name__ == "__main__":
    main()
