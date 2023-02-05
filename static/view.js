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
    document.getElementById("edit").innerHTML = "Hello World";

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


    
}