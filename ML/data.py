import pickle
import torch

class Database:
    def __init__(self):
        with open('sool_data.p', 'rb') as file: 
            self.sool_data = pickle.load(file)
        taste_list = []
        for i in self.sool_data:
            taste_list.append([x for _, x in i['taste'].items()])
        self.taste_matrix = torch.tensor(taste_list).float()
        self.taste_matrix = (self.taste_matrix - self.taste_matrix.mean(dim=0)) / self.taste_matrix.std(dim=0)

    def maxCosine(self, x):
        i = torch.argmax(self.taste_matrix @ x).item()
        return self.sool_data[i]['id']

    def topK(self, x, k):
        _, i = torch.topk(self.taste_matrix @ x, k)
        i = i.tolist()
        l = [self.sool_data[y]['id'] for y in i]
        return l

    def alcohol_id_to_tensor(self, alcohol_id):
        l = len(self.sool_data)
        for i in range(l):
            if self.sool_data[i]['id'] == alcohol_id:
                idx = i
                break
        return self.taste_matrix[idx]

    def similar(self, idx, k):
        _, i = torch.topk(self.taste_matrix @ self.alcohol_id_to_tensor(idx), k+1)
        i = i.tolist()
        del(i[0])
        l = [self.sool_data[y]['id'] for y in i]
        return l
        
    def sim(self, t, k):
        _, i = torch.topk(self.taste_matrix @ t, k+1)
        i = i.tolist()
        del(i[0])
        l = [self.sool_data[y]['id'] for y in i]
        return l

    def rawData(self, idx):
        for i in self.sool_data:
            if i['id'] == idx:
                return i
        return None