import requests

def game_plays():
    game_id = input("Game ID: ")
    url = f"https://www.kogama.com/locator/session/?objectID={game_id}&profileID=0&lang=en_US&type=play"
    data = {'objectID': game_id, 'profileID': '0', 'lang': 'en_US', 'type': 'play'}
    num_plays = int(input("Number of plays: "))

    for i in range(num_plays):
        response = requests.get(url, params=data)
        if response.status_code == 200:
            print(f"Play {i+1}: Successful")
        else:
            print(f"Play {i+1}: Error {response.status_code}")

game_plays()
