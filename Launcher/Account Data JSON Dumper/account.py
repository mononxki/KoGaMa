import requests
import json

def login(username, password):

    session = requests.Session()


    login_url = "https://www.kogama.com/auth/login/"


    headers = {
        "Content-Type": "application/json; charset=UTF-8"
    }


    login_data = {
        "username": username,
        "password": password
    }

    # Convert the login data to JSON
    login_data_json = json.dumps(login_data)

    try:

        response = session.post(login_url, headers=headers, data=login_data_json)

        # Check the response status code
        if response.status_code == 200:
            # Login successful
            print("Login successful!\n")


            print("Response Content:")
            response_content = json.loads(response.content)
            print(json.dumps(response_content, indent=4))

        else:
            # Login failed
            print("Login failed. Status code:", response.status_code)
    
    except requests.exceptions.RequestException as e:
        # An error occurred during the request
        print("An error occurred:", str(e))



username = input("Enter your username: ")
password = input("Enter your password: ")

# Call the login function
login(username, password)
