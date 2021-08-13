const messageElement = document.querySelector("#message")
const formElement = document.querySelector('form')

//functions
const sendData = (e) => {

    e.preventDefault()
    let countryCodes = ['lt', 'lv', 'ee']

    if(!countryCodes.includes(e.target.countryLocation.value)){
        messageElement.textContent = "The country code is invalid"
        return
    }



    if(!e.target.countryLocation.value || !e.target.modelId.value || !e.target.numberPlate.value){
        messageElement.textContent = "The input fields cannot be empty"
        return
    }

    e.preventDefault()
    let vehicle = {
        model_id: e.target.modelId.value,
        number_plate: e.target.numberPlate.value,
        country_location: e.target.countryLocation.value
    }

    console.log(vehicle)

    return fetch("https://cbee-app.herokuapp.com/vehicles", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicle),
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)  
        if(data.message==='New vehicle added!'){
          messageElement.textContent ='New vehicle added'
          formElement.reset()
        }
      })
      .catch(err=>messageElement.textContent ='Cannot connect to server')
}

document.querySelector("form").addEventListener("submit", sendData)