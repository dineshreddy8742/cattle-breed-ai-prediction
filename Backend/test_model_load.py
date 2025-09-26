import torch
from pathlib import Path

path = Path("models/")
export_file_name = 'cattle_breed_classifier_full_model.pth'
export_classes_name = "classes.txt"

try:
    print("Attempting to load model...")
    model = torch.load(path / export_file_name, map_location=torch.device('cpu'), weights_only=False)
    print("Model loaded successfully:", type(model))
    model.eval()
    print("Model set to eval mode.")
    
    with open(path / export_classes_name, 'r') as file:
        class_list = file.read().split(",")
    print("Classes loaded:", len(class_list), "classes")
    print("First few classes:", class_list[:5])
    
    print("Test successful!")
except Exception as e:
    print("Error loading model:", str(e))
    import traceback
    traceback.print_exc()
