(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')

        // our code
        event.preventDefault()
        const eventname = document.getElementById("event").value;
        const instname = document.getElementById("institutionname").value;
        const startdate = document.getElementById("startdate").value;
        const enddate = document.getElementById("enddate").value;
        const prize = document.getElementById("prize").value;
        const level = document.getElementById("level").value;
        const cashprize = document.getElementById("cashprize").value;

        console.log(eventname,instname,startdate,enddate,prize,level,cashprize)
      }, false)
    })
  })()