import torch

print("Loading the model file...")
torch.load("malicious_model.pth", weights_only=False)

print("Model loaded.")