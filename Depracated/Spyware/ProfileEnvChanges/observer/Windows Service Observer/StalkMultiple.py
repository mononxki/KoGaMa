import requests
from bs4 import BeautifulSoup
import time
import servicemanager
import win32event
import win32service
import win32serviceutil
import sys
from discord_webhook import DiscordWebhook, DiscordEmbed

# Enter the profile IDs you want to observe
profile_ids = ['ID1', 'ID2']

# Enter the base URL for Kogama profiles
BASE_URL = 'https://www.kogama.com/profile/'

# Enter your webhook URL here
WEBHOOK_URL = 'Webhook'

class MyService(win32serviceutil.ServiceFramework):
    _svc_name_ = "KogamaProfileObserver"
    _svc_display_name_ = "Kogama Profile Observer"

    def __init__(self, args):
        win32serviceutil.ServiceFramework.__init__(self, args)
        self.hWaitStop = win32event.CreateEvent(None, 0, 0, None)

    def SvcStop(self):
        self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
        win32event.SetEvent(self.hWaitStop)

    def SvcDoRun(self):
        servicemanager.LogMsg(servicemanager.EVENTLOG_INFORMATION_TYPE,
                             servicemanager.PYS_SERVICE_STARTED,
                             (self._svc_name_,))
        self.send_initial_webhooks()
        self.observe_profiles()

    def send_initial_webhooks(self):
        for profile_id in profile_ids:
            url = BASE_URL + profile_id + '/'
            self.send_webhook_notification(url)

    def observe_profiles(self):
        while True:
            for profile_id in profile_ids:
                url = BASE_URL + profile_id + '/'
                self.check_and_send_webhook(url)
            time.sleep(20)  # Wait for 20 seconds before checking again

    def check_and_send_webhook(self, url):
        # Your existing code to check for updates and send webhooks
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        # Extract data and send webhook
        # ...

    def send_webhook_notification(self, url):
        # Create an initial webhook notification for the specified URL
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract the necessary account data from the soup
        # Example: username, description, XP, rank
        username = soup.find('div', {'class': 'username'}).text.strip()
        description_container = soup.find('div', {'class': 'description-container'})
        if description_container is None:
            description_text = 'No description provided'
        else:
            description_text = description_container.find('div', {'class': 'text'}).text.strip()
        xp_container = soup.find('div', {'class': 'xp progression-item'})
        if xp_container is None:
            xp_text = 'N/A'
        else:
            xp_text = xp_container.find('div', {'class': 'data'}).text.strip()
        rank_container = soup.find('div', {'class': 'rank progression-item'})
        if rank_container is None:
            rank_text = 'N/A'
        else:
            rank_text = rank_container.find('div', {'class': 'data'}).text.strip()

        # Create an embed for the webhook
        embed = DiscordEmbed(title=f'{username} Kogama Profile', url=url, color='FF5733')
        embed.add_embed_field(name='Description', value=description_text)
        embed.add_embed_field(name='XP', value=xp_text)
        embed.add_embed_field(name='Rank', value=rank_text)

        # Create and execute the webhook
        webhook = DiscordWebhook(url=WEBHOOK_URL)
        webhook.add_embed(embed)
        webhook.execute()

if __name__ == '__main__':
    if len(sys.argv) == 1:
        servicemanager.Initialize()
        servicemanager.PrepareToHostSingle(MyService)
        servicemanager.StartServiceCtrlDispatcher()
    else:
        win32serviceutil.HandleCommandLine(MyService)
