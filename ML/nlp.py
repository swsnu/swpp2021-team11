import torch
import torch.nn as nn
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModel

import pickle

class Classifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(4096, 1024)
        self.fc2 = nn.Linear(1024, 256)
        self.fc3 = nn.Linear(256, 64)
        self.fc4 = nn.Linear(64, 12)
    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = F.relu(self.fc3(x))
        x = self.fc4(x)
        x = torch.sigmoid(x) * 10
        return x

class LangToVec:
    def __init__(self):
        # Initialize KoGPT model. 
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.tokenizer = AutoTokenizer.from_pretrained(
        'kakaobrain/kogpt', revision='KoGPT6B-ryan1.5b-float16',  # or float32 version: revision=KoGPT6B-ryan1.5b
        bos_token='[BOS]', eos_token='[EOS]', unk_token='[UNK]', pad_token='[PAD]', mask_token='[MASK]'
        )

        self.model = AutoModel.from_pretrained(
        'kakaobrain/kogpt', revision='KoGPT6B-ryan1.5b-float16',  # or float32 version: revision=KoGPT6B-ryan1.5b
        pad_token_id=self.tokenizer.eos_token_id,
        torch_dtype='auto', low_cpu_mem_usage=True, output_hidden_states = True
        ).to(device='cuda', non_blocking=True)

        # Initialize classfier. 
        self.m = Classifier().to(self.device)
        self.m.load_state_dict(torch.load('full_model_test_2.p'))
        self.model.eval()
        self.m.eval()

    def infer(self, s):
        with torch.no_grad():
            t = self.tokenizer.encode(s, return_tensors='pt').to(device='cuda', non_blocking=True)
            v = self.model(t).last_hidden_state[:, -1, :].float().view(-1, 1, 4096).to(device='cuda', non_blocking=True)
            l = self.m(v).squeeze().cpu()
            l = l - 5
        return l

if __name__ == "__main__":
    print("Load model...")
    c = LangToVec()
    while(True):
        s = input("문장을 입력하여주세요. ")
        r = c.infer(s)
        print(f"결과: {r}")