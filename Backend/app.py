import yaml
import sys
from pathlib import Path
from io import BytesIO
from typing import List, Dict, Union, ByteString
import os
import flask
from PIL import Image
from flask import Flask, request
from flask_cors import CORS
from database import init_db, save_prediction, get_predictions, get_predictions_count
import requests
import torch
import asyncio
import nest_asyncio
import warnings
import gdown
from torchvision import transforms
from src.model import create_resnet50
warnings.filterwarnings("ignore")
print("Imports Done")

config_path = os.path.join(os.path.dirname(__file__), "config.yaml")
with open(config_path, 'r') as stream:
    APP_CONFIG = yaml.full_load(stream)

model_path = APP_CONFIG['model_path']
classes_path = APP_CONFIG['classes_path']

# Synchronous model loading since files exist locally
try:
    print("Loading model synchronously...")
    model = torch.load(model_path, map_location=torch.device('cpu'), weights_only=False)
    model.eval()
    print("Model loaded successfully.")
    
    with open(classes_path, 'r') as file:
        class_list = file.read().split(",")
    print(f"Loaded {len(class_list)} classes.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None
    class_list = []

app = Flask(__name__)
CORS(app, origins=["https://cattle-breed-ai-prediction-1.onrender.com"], supports_credentials=True)
init_db()
print("App initialized, database ready.")

@app.route('/')
def home():
    return "Flask backend is running!"


def load_image_url(url: str) -> Image:
    response = requests.get(url)
    img = Image.open(BytesIO(response.content)).convert('RGB')
    return img


def load_image_bytes(raw_bytes: ByteString) -> Image:
    img = Image.open(BytesIO(raw_bytes)).convert('RGB')
    return img


def predict(img, threshold: float = 0.4, n: int = 3) -> Dict[str, Union[str, List]]:

    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    outputs = model(transform(img).unsqueeze(0)).squeeze()
    pred_probs = torch.nn.Softmax(dim=-1)(outputs)
    _, pred_class = torch.max(pred_probs, dim=0)
    pred_probs = pred_probs.tolist()
    predictions = []
    for image_class, output, prob in zip(class_list, outputs.tolist(), pred_probs):
        output = round(output, 1)
        prob = round(prob, 2)
        predictions.append(
            {"class": image_class.replace("_", " "), "output": output, "prob": round(prob, 2)}
        )
    predictions = sorted(predictions, key=lambda x: x["prob"], reverse=True)

    # If confidence of top prediction is below the dynamic threshold, return a custom message
    if not predictions or predictions[0]["prob"] < threshold:
        return {
            "class": "N/A",
            "predictions": [
                {
                    "class": "Not a cattle breed likely",
                    "output": 0,
                    "prob": 0
                }
            ]
        }

    predictions = predictions[0:n]
    class_name = class_list[pred_class.item()] if pred_class.item() < len(class_list) else "N/A"
    print({"class": class_name, "predictions": predictions})
    return {"class": class_name, "predictions": predictions}


@app.route('/api/classify', methods=['POST', 'GET'])
def upload_file():
    try:
        print("Received request for /api/classify")
        threshold = float(request.form.get("threshold", 0.8))
        print(f"Threshold set to: {threshold}")
        if request.method == 'GET':
            url = request.args.get("url")
            print(f"Loading image from URL: {url}")
            img = load_image_url(url)
            raw_image_bytes = requests.get(url).content
        else:
            raw_image_bytes = request.files['file'].read()
            print("Loading image from bytes")
            img = load_image_bytes(raw_image_bytes)

        print("Image loaded, starting prediction")
        res = predict(img, threshold=threshold)
        print(f"Prediction result: {res}")

        # Save prediction to database if it's a valid cattle image
        if res and res["predictions"] and res["predictions"][0]["class"] != "Not a cattle breed likely":
            top_prediction = res["predictions"][0]
            print("Saving prediction to database")
            save_prediction(
                raw_image_bytes,
                top_prediction["class"],
                top_prediction["prob"]
            )
            print("Prediction saved")

        print("Returning JSON response")
        return flask.jsonify(res)
    except Exception as e:
        print(f"Error in /api/classify: {e}")
        import traceback
        traceback.print_exc()
        return flask.jsonify({"error": str(e)}), 500


@app.route('/api/history', methods=['GET'])
def history():
    predictions = get_predictions()
    return flask.jsonify(predictions)


@app.route('/api/classes', methods=['GET'])
def classes():
    with open('models/classes.txt', 'r') as file:
        classes = file.read().split(",")
    return flask.jsonify(classes)


@app.route('/ping', methods=['GET'])
def ping():
    print("Ping called")
    return "pong"


@app.route('/config')
def config():
    return flask.jsonify(APP_CONFIG)


@app.route('/api/stats', methods=['GET'])
def stats():
    breeds_count = len(class_list)
    images_count = get_predictions_count()
    accuracy = 94
    workers = 500
    return flask.jsonify({
        "breeds": breeds_count,
        "images": images_count,
        "accuracy": accuracy,
        "workers": workers
    })





if __name__ == '__main__':
    port = os.environ.get('PORT', 8000)
    print(f"Starting Flask app on port {port}...")

    if "prepare" not in sys.argv:
        app.jinja_env.auto_reload = True
        app.config['TEMPLATES_AUTO_RELOAD'] = True
        print("Running app...")
        app.run(debug=False, host='127.0.0.1', port=port, threaded=True)
        # app.run(host='0.0.0.0', port=port)
