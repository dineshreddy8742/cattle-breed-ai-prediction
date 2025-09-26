import requests
from pathlib import Path

url = 'http://127.0.0.1:8000/api/classify'
image_path = Path('Backend/assets/00000008.jpg')

if image_path.exists():
    with open(image_path, 'rb') as f:
        files = {'file': f}
        data = {'threshold': '0.4'}
        response = requests.post(url, files=files, data=data)
        print(f'Status: {response.status_code}')
        print(f'Response text: {response.text}')
        try:
            print(f'Response JSON: {response.json()}')
        except:
            print('Failed to parse JSON')
else:
    print('Image not found')
