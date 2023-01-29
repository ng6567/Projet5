const urlParams = location.search
const urlSearchParams = new URLSearchParams (urlParams)
const kanapId = urlSearchParams .get("id")
fetch("http://localhost:3000/api/products/"+kanapId)
    .then(function (response) {
        return response.json()

    })
    .then(function (result) {    
    console.log (result)
     const imageContainer = document.getElementsByClassName("item__img")[0] 
     const img = document.createElement("img") 
     img.src = result.imageUrl
     img.alt = result.altTxt
     imageContainer.appendChild(img)
    
     const titleContainer = document.getElementById("title")
     titleContainer.innerText = result.name

     const descriptionContainer = document.getElementById("description")
     descriptionContainer.innerText = result.description

     const priceContainer = document.getElementById("price")
     priceContainer.innerText = result.price

     const colorContainer = document.getElementById("colors")
     for (let i = 0; i<result.colors.length; i++){
        const color = result.colors [i]
        const newOption = document.createElement("option")
        newOption.value = color
        newOption.innerText = color
        colorContainer.appendChild(newOption)
     }
        
     
     
    })