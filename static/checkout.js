(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
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