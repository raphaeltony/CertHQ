// event.preventDefault()
//         const eventname = document.getElementById("event").value;
//         const instname = document.getElementById("institutionname").value;
//         const startdate = document.getElementById("startdate").value;
//         const enddate = document.getElementById("enddate").value;
//         const prize = document.getElementById("prize").value;
//         const level = document.getElementById("level").value;
//         const cashprize = document.getElementById("cashprize").value;
//         const selectedFile = document.getElementById("formFile").files[0];

var edit_button = document.getElementById("edit")
edit_button.addEventListener("click", edit);

function edit() {
    console.log("work");


    var input = document.getElementsByTagName("input");
    for (var i = 0; i < input.length; i++) {
        input[i].disabled = false;
    }

    // const eventname = document.getElementById("eventname");
    // const instname = document.getElementById("institutionname").value;
    // const startdate = document.getElementById("startdate").value;
    // const enddate = document.getElementById("enddate").value;
    // const prize = document.getElementById("prize").value;
    const level = document.getElementById("level");
    level.disabled = false;
    const prize = document.getElementById("prize");
    prize.disabled = false;

    const ffile = document.getElementById("filediv");
    ffile.style.display = "block"
    // const selectedFile = document.getElementById("formFile").files[0];
    const updatebtn = document.getElementById("update");
    updatebtn.style.display = "block"
    document.getElementById("edit").remove();



}

var updatebtn = document.getElementById("update")
updatebtn.addEventListener("click", event => {
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        form.classList.add('was-validated')
    })

    //our code
    event.preventDefault()
    const eventname = document.getElementById("eventname").value;
    const instname = document.getElementById("institution").value;
    const startdate = document.getElementById("startdate").value;
    const enddate = document.getElementById("enddate").value;
    const prize = document.getElementById("prize").value;
    const level = document.getElementById("level").value;
    const cashprize = document.getElementById("cashprize").value;
    const selectedFile = document.getElementById("formFile").files[0];

    // console.log(eventname,instname,startdate,enddate,prize,level,cashprize)

    var formdata = new FormData();
    formdata.append("event", eventname);
    formdata.append("instname", instname);
    formdata.append("startdate", startdate);
    formdata.append("enddate", enddate);
    formdata.append("prize", prize);
    formdata.append("level", level);
    formdata.append("cashprize", cashprize);
    formdata.append("file", selectedFile);

    var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
    };

    fetch("/update/" + getMongoID(), requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            alert(result);
        })
        .catch((error) => {
            console.log("error", error);
            alert(result);
        });

});

function getMongoID(){
    let url = String(window.location.href);
    url = url.trim().split("/")
    url = url.pop()
    return url
}

var deletebtn = document.getElementById("delete")
deletebtn.addEventListener("click", event =>{

    fetch("/delete/" + getMongoID())
    .then((response) => response.text())
    .then((result) => {
        window.location.href = "http://127.0.0.1:5000/";
        console.log(result);
        // alert(result);
    })
    .catch((error) => {
        console.log("error", error);
        alert(result);
    });
    }
)