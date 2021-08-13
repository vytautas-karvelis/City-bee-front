const messageElement = document.querySelector("#message")
const formElement = document.querySelector('form')
//functions
const sendData = (e) => {

    e.preventDefault()

    if(isNaN(e.target.modelHourPrice.value)){
        messageElement.textContent = "The hour price must be a number"
        return
    }

    if(!e.target.modelName.value ||! e.target.modelHourPrice.value){
        messageElement.textContent = "The input fields cannot be empty"
        return
    }

    e.preventDefault()
    let model = {
        name: e.target.modelName.value,
        hour_price: e.target.modelHourPrice.value
    }

    fetch("https://cbee-app.herokuapp.com/models", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data.message==="New model added!"){
          messageElement.textContent ='New model added'
          formElement.reset()
        }
        
      })
      .catch(err=>messageElement.textContent ='Cannot connect to server')
      
}

document.querySelector("form").addEventListener("submit", sendData)