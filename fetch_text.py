import openai
import json
from PIL import Image
from pytesseract import pytesseract


# tesseract
TESSERACTPATH = "D:/tesseract/tesseract.exe"

def get_text(FILEPATH):
    img = Image.open(FILEPATH)
    pytesseract.tesseract_cmd = TESSERACTPATH
    text = pytesseract.image_to_string(img)
    return text

# request to chatgpt

openai.api_key = "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"

prompt = '''You are supposed to identify name without honorifics, Event, 
Institution Name,Start Date,
End Date, Prize, Level, Cash Prize from a text which is extracted from a certificate. 
Give the response in a JSON format like 
{
"name": "RAPHAEL TONY",
  "event": "Webspace",
  "instname": "Rajagiri School of Engineering",
  "start_date": "15th February 2022",
  "end_date": "17th February 2022",
  "prize": null,
  "level":null,
  "cash_prize": null
}
The prize values can only be First, Second, Third or Particpant.
If a valid enddate is not found use same value as startdate.
The levels can be State, National, International or Collegiate

'''

def get_response(FILEPATH):
    certificate = get_text(FILEPATH)

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": prompt },
                {"role": "user", "content": certificate},
            ]
    )

    result = ''
    for choice in response.choices:

        result += choice.message.content

    d = json.loads(result)
    print(d)
    return d