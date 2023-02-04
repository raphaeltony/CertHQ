from flask import Flask, render_template
 
app = Flask(__name__)
 
 
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/add")
def addcert():
    return render_template("addcert.html")
 
if __name__ == "__main__":
  app.run(debug=True)