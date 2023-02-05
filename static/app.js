// document.querySelectorAll('.btn').forEach(item => {
//     item.addEventListener('click', event => {
//       //handle click
//       console.log(item.id);

//       fetch("/view/"+item.id).then(
//         response => {
//             if(response.redirected){
//                 window.location = response.url
//             }
//             else{
//                 console.log("error")
//             }
//         }
//       )
//     })
//   })