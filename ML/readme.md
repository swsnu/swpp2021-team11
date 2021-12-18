# ML feature API server

## Requirements

1. NVIDIA GPU based on Volta, Turing or Ampere (RTX 20, 30 Series, GTX 16 Series)
2. 16GB or higher VRAM

If the requirements are not met, a mock-up server is available. 

## Usage

```
pip install -r requirements.txt
python app.py
```

or

```
pip install -r requirements.txt
python app_mock.py
```

# How to Use Recommendation API

## `/language`

Use POST request. It recommends alcohol by User's input.

### input

`{"string" : natural language}`

### output

`{"index": [list of recommended alcohol's id]}`

### example

input : `{"string": '마음이 아플 때 먹을 술'}`

output : `{"index" : [220, 143, 192]}`

## `/similar/<int:alcohol_id>`

Use GET request. It finds alcohol like `<int:alcohol_id>`

### output

`{"index": [list of found alcohol's id]}`

### example

access `http://api.fkr.kr:8081/similar/220`

output : `{"index" : [192, 202, 143]}`


## `/update/<int:user_id>/<int:alcohol_id>`

Use GET request. It should called when user access alcohol detail page. 

### output

`{"index": user_id}`

### example

access `http://api.fkr.kr:8081/update/13/210`

Recommendation system remember that user 13 access alcohol 210's detain information. 


## `/rate/<int:user_id>/<int:rating>/<int:alcohol_id>`

Use GET request. It should called when user rate alcohol. 

### output

`{"index": user_id}`

### example

access `http://api.fkr.kr:8081/rate/13/5/234`

Recommendation system remember that user 13 rate alcohol 210 to 5

## `/recommend/<int:user_id>`

Use GET request. It makes recommendation about <int:user_id>. 

### output

`{"index": [list of recommended alcohol's id]}`

### example

access `http://api.fkr.kr:8081/recommend/13`

output : `{"index" : [{"id": 133}, {"id": 196}, {"id": 232}]}`

## `/test/<int:user_id>/<int:question_index>/<int:answer_index>`

It records which answer user select. 

## `/gettest/<int:user_id>`

It returns test result. 

### output

`{"index": [list of recommended alcohol's id]}`

### example

access `http://api.fkr.kr:8081/gettest/13`

output : `{"index" : [{"id": 133}]}`