import requests

base_url = 'http://127.0.0.1:5002'

try:
    response = requests.get(f'{base_url}/ping')
    print(f'Ping: {response.status_code} - {response.text}')
except Exception as e:
    print(f'Ping error: {e}')

try:
    response = requests.get(f'{base_url}/api/classes')
    print(f'Classes: {response.status_code} - {response.text}')
except Exception as e:
    print(f'Classes error: {e}')

try:
    response = requests.get(f'{base_url}/api/history')
    print(f'History: {response.status_code} - {response.text}')
except Exception as e:
    print(f'History error: {e}')
