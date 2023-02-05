from flask import Flask, render_template, request,make_response
from pymongo import MongoClient
from math import ceil
from bson.objectid import ObjectId


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
    try:
        cursor = collection.find({},{'event':1,'instname':1})
        data = list(cursor)
        for i in data:
            i.update({'_id':str(i['_id'])})
        nrows = ceil(len(data)/3)
        print(data)

        # finaldata structure :
        # finaldata[0] = [ {item1}, {item2}, {item3}]
        # finaldata[1] = [ {item3}, {item4}, {item5}]
        # finaldata[2] = [ {item1}]
        finaldata = []
        j = 0
        finaldata.append([])
        for i in range(len(data)):
            finaldata[j].append(data[i])
            if (i+1)%3==0:
                print(finaldata)
                j=j+1
                finaldata.append([])
        # return finaldata
    except Exception as e:
        return e
    return render_template("index.html",data=finaldata,nrows=nrows)

@app.route("/add")
def addcert():
    return render_template("addcert.html")

@app.route("/view/<mongoid>")
def view(mongoid):
    try:
        query = {"_id": ObjectId(mongoid)}
        cursor = collection.find_one(query)
        cursor.pop('_id')
        cursor.pop('image')
        print(mongoid)
        # return cursor
    except Exception as e:
        return e
    return render_template("view.html",data=cursor,mid=mongoid)

@app.route("/viewimage/<mongoid>")
def viewimage(mongoid):
    try:
        query = {"_id": ObjectId(mongoid)}
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


@app.route('/update/<mongoid>', methods=['GET', 'POST'])
def update_file(mongoid):
    if request.method == 'POST':
        print(dict(request.form))  
        f = request.files['file']  #we got the file as file storage object from frontend
        print(type(f))

        if f:
            cert_details = dict(request.form) #contains rest of the certificate details minus file
            cert_details.update({'image':f.read()}) #to convert it into binary and append the dictionary with the file

            # Fetch the record and update it
            query = {"_id": ObjectId(mongoid)}
            collection.update_one(query,{"$set":cert_details})
            

            # cert_details.pop('image')
            return 'File uploaded successfully'
            # return render_template("view.html",data=cert_details,mongoid=mongoid)
        else:
            return 'Error occured'
        



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