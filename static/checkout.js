(() => {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()        //for the green ticks
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')

        // our code
        //getting the details from the form
        event.preventDefault()
        const eventname = document.getElementById("event").value; //here "event" is the id
        const instname = document.getElementById("institutionname").value;
        const startdate = document.getElementById("startdate").value;
        const enddate = document.getElementById("enddate").value;
        const prize = document.getElementById("prize").value;
        const level = document.getElementById("level").value;
        const cashprize = document.getElementById("cashprize").value;
        const selectedFile = document.getElementById("formFile").files[0];

        // console.log(eventname,instname,startdate,enddate,prize,level,cashprize)

        //all the data from the form is appended into formdata
        var formdata = new FormData();
        formdata.append("event",eventname);
        formdata.append("instname",instname);
        formdata.append("startdate",startdate);
        formdata.append("enddate",enddate);
        formdata.append("prize",prize);
        formdata.append("level",level);
        formdata.append("cashprize",cashprize);
        formdata.append("file", selectedFile);


        //we are making a post request

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        
        fetch("/uploader", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            alert(result);
          })
          .catch((error) => {
            console.log("error", error);
            alert(result);
          });
      }, false)
    })
  })()

  // Event handler when the file is chosen
  document.getElementById('formFile').addEventListener('change', function(e) {
    var formdata = new FormData();
    
    if (e.target.files[0]) {
      // document.body.append('You selected ' + e.target.files[0].name);
      formdata.append("file", e.target.files[0]);
      var requestOptions = {
        method: "POST",
        body: formdata
      };
      
      fetch("/fetch_text", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          var obj = JSON.parse(result);
          console.log(obj["start_date"])

          if(obj["start_date"]){
            var temp_date = new Date(obj["start_date"])
            obj["start_date"] = temp_date.toISOString().slice(0, 10);
          }
          if(obj["end_date"]){
            var temp_date = new Date(obj["end_date"])
            obj["end_date"] = temp_date.toISOString().slice(0, 10);
          }
          set_values(obj)
          // alert(result);
        })
        .catch((error) => {
          console.log("error", error);
          alert(result);
        });
    }
  });

  function set_values(data_obj){
    document.getElementById("event").value = data_obj["name"]; //here "event" is the id
    document.getElementById("institutionname").value = data_obj["instname"];
    document.getElementById("startdate").value = data_obj["start_date"];
    document.getElementById("enddate").value = data_obj["end_date"];
    document.getElementById("prize").value = data_obj["prize"];
    document.getElementById("level").value = data_obj["level"];
    document.getElementById("cashprize").value = data_obj["cash_prize"];
  }
