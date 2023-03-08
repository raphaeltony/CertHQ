import openai
import json
from PIL import Image
from pytesseract import pytesseract
from dateutil import parser


# tesseract : set path 
TESSERACTPATH = "D:/tesseract/tesseract.exe"    

def get_text(FILEPATH):
    img = Image.open(FILEPATH)
    pytesseract.tesseract_cmd = TESSERACTPATH
    text = pytesseract.image_to_string(img)
    return text

# set your openapi key here
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

    d = json.loads(result)  #converting json string to python dictionary
    try:
        d["start_date"] = parser.parse(d["start_date"]).date()
        d["end_date"] = parser.parse(d["end_date"]).date()
    except(Exception):
        pass
    print(d)
    return d
