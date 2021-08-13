// variables
const tbody = document.querySelector("#first-tbody")
const allVehiclesBtn = document.querySelector("#all-vehicles")
const ltVehiclesBtn = document.querySelector("#lt-vehicles")
const lvVehiclesBtn = document.querySelector("#lv-vehicles")
const eeVehiclesBtn = document.querySelector("#ee-vehicles")
const messageElement = document.querySelector("#message")

//functions
const getAllModels = () => {   
      fetch('https://cbee-app.herokuapp.com/vehicles')
      .then((res) => res.json())
      .then((data) => {
          
        if(data.length === 0) messageElement.textContent ='No data'

        tbody.innerHTML = data.reduce((total, currentItem) => {
          total += `
         <tr>
            <td>${currentItem._id}</td>
            <td>${currentItem.model_name}</td>            
            <td>${currentItem.hour_price}</td>            
            <td>${currentItem.number_plate}</td>            
            <td>${currentItem.country_location}</td>            
         </tr>
         `;  
          return total;
        }, '');
      })
      .catch(err=>messageElement.textContent ='Cannot connect to server')

};

const renderVehicles = (country) => {
    console.log('render!')
    fetch('https://cbee-app.herokuapp.com/vehicles/' + country)
    .then((res) => res.json())
    .then((data) => {

      if(data.length === 0) messageElement.textContent ='No data'        

      tbody.innerHTML = data.reduce((total, currentItem) => {
        total += `
       <tr>
          <td>${currentItem._id}</td>
          <td>${currentItem.model_name}</td>            
          <td>${currentItem.hour_price}</td>            
          <td>${currentItem.number_plate}</td>            
          <td>${currentItem.country_location}</td>            
       </tr>
       `;  
        return total;
      }, '');
    })
    .catch(err=>messageElement.textContent ='Cannot connect to server')

}

//events
document.addEventListener("DOMContentLoaded", getAllModels)
allVehiclesBtn.addEventListener("click", getAllModels)
ltVehiclesBtn.addEventListener("click", ()=>renderVehicles('lt'))
lvVehiclesBtn.addEventListener("click", ()=>renderVehicles('lv'))
eeVehiclesBtn.addEventListener("click", ()=>renderVehicles('ee'))