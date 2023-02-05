from flask import Flask, render_template, request,make_response
from pymongo import MongoClient


app = Flask(__name__)


print("welcome to mongodb")
client = MongoClient("mongodb://localhost:27017/")
print(client)
db = client['certhqdb']
collection = db['certs']
# dictionary = {"name": "RAPH" , "age": 59 }
# collection.insert_one(c1.__dict__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/add")
def addcert():
    return render_template("addcert.html")

@app.route("/view")
def view():
    try:
        query = {"event": "shark tank"}
        cursor = collection.find_one(query)
        cursor.pop('_id')
        cursor.pop('image')
        print(cursor)
        # return cursor
    except Exception as e:
        return e
    return render_template("view.html",data=cursor)

@app.route("/view-image")
def viewimage():
    try:
        query = {"event": "shark tank"}
        cursor = collection.find_one(query)
        fileName = 'cert'
        print(cursor['image'])
        response = make_response(cursor['image'])
        print(response)
        response.headers['Content-Type'] = 'image/jpeg'
        response.headers["Content-Dispostion"] = "attachment; filename=\"%s\"" %fileName
        return response
    except Exception as e:
#          self.errorList.append("No results found." + type(e))
            return False



@app.route('/uploader', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        print(dict(request.form))  
        f = request.files['file']  #we got the file as file storage object from frontend
        print(type(f))

        if f:
            cert_details = dict(request.form) #contains rest of the certificate details minus file
            cert_details.update({'image':f.read()}) #to convert it into binary and append the dictionary with the file
            collection.insert_one(cert_details)
            
            return 'File uploaded successfully'
        else:
            return 'Error occured'

# #update 
# @app.route('/update', methods=['GET', 'POST'])
# def update_file():


#delete
@app.route('/delete', methods=['GET', 'POST'])
def delete_file():
    if request.method == 'GET':
        try:
            query = {"event": "wer"}
            print(query)
            collection.delete_one(query)
            print("deleted")
        except Exception as e:
            return e
    return render_template("delete.html")



if __name__ == "__main__":
  app.run(debug=True)