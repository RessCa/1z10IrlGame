### 1z10 Irl Game

## Running 
To work on the app:
- clone this repository
- instal dependiencies - npm i
- run app in dev mode - npm run dev


## Json file structure for importing players data and example data:

[
    {
        "name": "jan",
        "surname": "Kowalski",
        "class": "5a",
    }
]


## Json file structure for importing colosed ABCD questions data and example data:

[
    {
        "category": "math",
        "question": "2+2",
        "answer": "D",
        "answerA": "0",
        "answerB": "5",
        "answerC": "3",
        "answerD": "4"
    }
]


## Json file structure for importing open questions data and example data:
# when answerA id null app automaticly recognises

[
    {
        "category": "math",
        "question": "3*3",
        "answer": "9",
        "answerA": "",
        "answerB": "",
        "answerC": "",
        "answerD": ""
    }
]