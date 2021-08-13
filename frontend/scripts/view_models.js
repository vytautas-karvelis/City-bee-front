// variables
const tbody = document.querySelector("#first-tbody")
const tbody2 = document.querySelector("#second-tbody")
const messageElement = document.querySelector("#message")

//functions
const getAllModels = () => {
    fetch('https://cbee-app.herokuapp.com/models')
      .then((res) => res.json())
      .then((data) => {
        
        if(data.length === 0) messageElement.textContent ='No data' 
        if(data.length > 0) messageElement.textContent =''
        
        tbody.innerHTML = data.reduce((total, currentItem) => {
          total += `
         <tr>
            <td>${currentItem._id}</td>
            <td>${currentItem.name}</td>
            <td>${currentItem.hour_price}</td>
         </tr>
         `;  
          return total;
        }, '');
      });

      fetch('https://cbee-app.herokuapp.com/modelscount')
      .then((res) => res.json())
      .then((data) => {
        
        if(data.length === 0) messageElement.textContent ='No data'
        if(data.length > 0) messageElement.textContent =''

        tbody2.innerHTML = data.reduce((total, currentItem) => {
          total += `
         <tr>
            <td>${currentItem.modelName}</td>
            <td>${currentItem.vehicleCount}</td>            
         </tr>
         `;  
          return total;
        }, '');
      })
      .catch(err=>messageElement.textContent ='Cannot connect to server')


  };

//events
document.addEventListener("DOMContentLoaded", getAllModels)

