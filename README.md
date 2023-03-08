# CertHQ

A simple certificate management GUI using MongoDB. Integrated with ChatGPT to perform autofilling of certificate details.

## Demo

## Components

- Frontend : HTML, CSS, JS, Bootstrap
- Backend : Flask
- Database : MongoDB

## Pre-requisites
- Personal OpenAI API keys. Sign up [here](https://platform.openai.com/account/api-keys). Click on View API Keys and paste the key in the `fetch_text.py` file

- Tesseract OCR engine. Get it [here](https://tesseract-ocr.github.io/tessdoc/Installation.html). Set the path of executable file in `fetch_text.py`

- Python

- Necessary packages (check requirements.txt) :

```
pip install -r requirements.txt

```

## Running the program
- Clone the repository and navigate to the folder
- Install the required python packages (Check previous section)
- Run `main.py`