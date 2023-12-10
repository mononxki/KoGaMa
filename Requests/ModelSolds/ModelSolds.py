import requests
from bs4 import BeautifulSoup
from colorama import Fore, Style

def fetch_data_from_model(model_link, headers):
    response = requests.get(model_link, headers=headers)
    if response.status_code == 200:
        
        extracted_data = extract_data(response.text)
        return extracted_data
    else:
        print(f"Failed to fetch data from {model_link}. Status code: {response.status_code}")
        return None


def extract_data(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    sold_element = soup.find('li', class_='sold')
    if sold_element:
        return sold_element.text.strip()
    else:
        return "Data not found"

def fetch_username(user_id, headers):
    profile_url = f"https://www.kogama.com/profile/{user_id}/"
    response = requests.get(profile_url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        username_element = soup.find('div', class_='username')
        if username_element:
            return username_element.h1.text.strip()
        else:
            return "Username not found"
    else:
        print(f"Failed to fetch username from {profile_url}. Status code: {response.status_code}")
        return None

def fetch_user_models(user_id, headers):
    
    base_url = f"https://www.kogama.com/profile/{user_id}/marketplace/model/?page=1&count=180"
    response = requests.get(base_url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        model_elements = soup.find_all('li', class_='shop-item')

        
        total_sold_count = 0
        total_xp_earned = 0
        total_cost = len(model_elements) * 10
        gold_earned = 0

        
        username = fetch_username(user_id, headers)
        if username:
            print(f"{Fore.LIGHTRED_EX}Username: {username}{Style.RESET_ALL}")

        
        for model_element in model_elements:
            model_id = model_element.find('a')['href'].split('/')[-2]
            model_link = "https://www.kogama.com" + model_element.find('a')['href']
            extracted_data = fetch_data_from_model(model_link, headers)
            if extracted_data:
                
                sold_count = int(extracted_data.split()[1].replace('\xa0', ''))
                total_sold_count += sold_count

                # Calculate XP earned (assuming 10 XP per sale)
                xp_earned = sold_count * 5
                total_xp_earned += xp_earned

                # Calculate gold earned (assuming 1 gold per sale)
                gold_earned += sold_count

                
                print(f"Model ID: {Fore.LIGHTMAGENTA_EX}{model_id} | Solds: {Fore.LIGHTBLUE_EX}{sold_count}{Style.RESET_ALL} | XP Earned: {Fore.LIGHTGREEN_EX}*{xp_earned}{Style.RESET_ALL}")

        
        print(f"{Fore.LIGHTCYAN_EX}Total Sold Count for User {Fore.LIGHTRED_EX}{username}{Fore.LIGHTCYAN_EX}: {Fore.LIGHTBLUE_EX}{total_sold_count}{Style.RESET_ALL}")
        print(f"{Fore.LIGHTYELLOW_EX}Total Cost of Models: {Fore.LIGHTBLUE_EX}{total_cost} Gold{Style.RESET_ALL}")
        print(f"{Fore.LIGHTGREEN_EX}Gold Earned from Sales: {Fore.LIGHTBLUE_EX}{gold_earned} Gold{Style.RESET_ALL}")
        print(f"{Fore.LIGHTBLUE_EX}Total XP Earned: {Fore.LIGHTGREEN_EX}*{total_xp_earned}{Style.RESET_ALL}")

    else:
        print(f"Failed to fetch data from {base_url}. Status code: {response.status_code}")

def main():
    
    user_id = input("Enter Kogama User ID: ")

    # Define user agent header
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

    
    fetch_user_models(user_id, headers)

if __name__ == "__main__":
    main()
