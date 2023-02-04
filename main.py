from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
 
app = Flask(__name__)
 
 
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/add")
def addcert():
    return render_template("addcert.html")

@app.route('/uploader', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        print(dict(request.form))
        f = request.files['file']
        # e = request.files['event']
        # i = request.files['instname']
        if f:
            f.save(secure_filename(f.filename))
            # print(e,i)
            return 'File uploaded successfully'
        else:
            return 'Error occured'


 
if __name__ == "__main__":
  app.run(debug=True)