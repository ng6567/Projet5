const sectionCart = document.querySelector("#cart__items"); // Appel de la balise section cart_items ous sera stockée la carte
const totalQuantityElt = document.getElementById("totalQuantity"); // Appel de la balise

const totalPriceElt = document.getElementById("totalPrice");
let totalQuantity = 0;
let totalPrice = 0;
let basket;
let basketWithInfos;


function run (){
    
    const storedBasket = localStorage.getItem("nadia_p5_kanap");
    
    if (storedBasket){
        basket = JSON.parse(storedBasket)
    }else{
        document.getElementById("cartAndFormContainer").innerHTML = "<h1>Votre panier est vide</h1>"
        return
    }

    getAllKanaps ()
}

function getOneKanap (kanap){
    return new Promise ((resolve)=> {
        fetch("http://localhost:3000/api/products/" + kanap._id)  // 
    .then(function (response) { 
        return response.json()

    })
    .then(function (result) { // Fonction pour "result" contenant les différents "items"
        resolve ({
            _id : kanap._id,
            color : kanap.color,
            quantity : Number(kanap.quantity),
            price : Number(result.price),
            imageUrl : result.imageUrl,
            altTxt : result.altTxt,
            name : result.name
        
        })
    })
    })
}
console.log(result)
function getAllKanaps (){
   
    const promises = [];
    for (let i = 0; i < basket.length; i++){
        const kanap = basket [i]
        promises.push (getOneKanap (kanap))
    }
Promise.all (promises).then ((kanaps) => {
    
    basketWithInfos = kanaps;
    for(let i = 0; i < kanaps.length; i++){
        const kanap = kanaps [i];
        createKanapElement(kanap);
        totalQuantity += kanap.quantity;
        totalPrice += kanap.quantity * kanap.price;
    }
    totalPriceElt.innerText = totalPrice;
    totalQuantityElt.innerHTML = totalQuantity;
})

}


function createKanapElement (kanap) {
    
    const article = document.createElement("article") // Création des balises
    article.className = "cart__item"
    article.dataset.id = kanap._id
    article.dataset.color = kanap.color
    

    const cart__item__img = document.createElement("div");
    cart__item__img.className = "cart__item__img";
    
    const imageElement = document.createElement("img");
    imageElement.src = kanap.imageUrl;
    imageElement.altTxt = kanap.altTxt;

    const cart__item__content = document.createElement("div")
    cart__item__content.className = "cart__item__content";

    const cart__item__content__description = document.createElement("div")
    cart__item__content__description.className = "cart__item__content__description";

    const nameElement = document.createElement("h2");
    nameElement.innerHTML = kanap.name;

    const colorElement = document.createElement("p");
    colorElement.innerHTML = kanap.color;

    const priceElement = document.createElement("p");
    priceElement.innerHTML = kanap.price + "€";

    const cart__item__content__settings = document.createElement("div")
    cart__item__content__settings.className = "cart__item__content__settings";

    const cart__item__content__settings__quantity = document.createElement("div")
    cart__item__content__settings__quantity.className = "cart__item__content__settings__quantity";

    const quantityElement = document.createElement("p");
    quantityElement.innerHTML = "Quantité :";

    const inputElement = document.createElement ("input");

    inputElement.addEventListener('change', () =>{
      const newValue = Number (inputElement.value);
      const index = basket.findIndex((item)=> item._id === kanap._id && item.color === kanap.color);
      const oldValue = basket[index].quantity;
      const difference = newValue - oldValue;
      
      totalQuantity += difference;
      totalPrice += (difference * kanap.price);
      totalQuantityElt.innerText = totalQuantity;
      totalPriceElt.innerText = totalPrice;
      basket[index].quantity = newValue;
      localStorage.setItem('nadia_p5_kanap', JSON.stringify(basket));
    })

  

    inputElement.type = "number";
    inputElement.className = "itemQuantity";
    inputElement.name = "itemQuantity";
    inputElement.min = 1;
    inputElement.max = 100;
    inputElement.value = kanap.quantity;

    const cart__item__content__settings__delete = document.createElement("div")
    cart__item__content__settings__delete.className = "cart__item__content__settings__delete";

    const deleteItems = document.createElement("p");
    deleteItems.innerHTML = "supprimer";
    deleteItems.className = "deleteItem";
    deleteItems.addEventListener('click', () =>{
      
      const index = basket.findIndex((item)=> item._id === kanap._id && item.color === kanap.color);
      const quantity = basket[index].quantity;
      
      totalQuantity -= quantity;
      totalPrice -= (quantity * kanap.price);
      totalQuantityElt.innerText = totalQuantity;
      totalPriceElt.innerText = totalPrice;
      basket.splice(index, 1);
      localStorage.setItem('nadia_p5_kanap', JSON.stringify(basket));
      article.remove();
    })
    
    
    sectionCart.appendChild(article);

    article.appendChild(cart__item__img);
    cart__item__img.appendChild(imageElement);

    article.appendChild(cart__item__content);
    cart__item__content.appendChild(cart__item__content__description)
    cart__item__content__description.appendChild(nameElement);
    cart__item__content__description.appendChild(colorElement);
    cart__item__content__description.appendChild(priceElement);

    article.appendChild(cart__item__content__settings);
    cart__item__content__settings.appendChild(cart__item__content__settings__quantity);
    cart__item__content__settings__quantity.appendChild(quantityElement);
    cart__item__content__settings__quantity.appendChild(inputElement);

    cart__item__content__settings.appendChild(cart__item__content__settings__delete);
    cart__item__content__settings__delete.appendChild(deleteItems);
   
    

}

const firstNameInput = document.getElementById('firstName');
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastNameInput = document.getElementById('lastName');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
const addressInput = document.getElementById('address');
const addressErrorMsg = document.getElementById('addressErrorMsg');
const cityInput = document.getElementById('city');
const cityErrorMsg = document.getElementById('cityErrorMsg');
const emailInput = document.getElementById('email');
const emailErrorMsg = document.getElementById('emailErrorMsg');

document.querySelector('.cart__order__form').addEventListener('submit', (e) =>{
  e.preventDefault();
  [firstNameErrorMsg, lastNameErrorMsg, addressErrorMsg, cityErrorMsg, emailErrorMsg].forEach(item =>{
    item.innerText = '';
  })
  let hasError = false;
  if(!firstNameInput.value.match(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i)){
    firstNameErrorMsg.innerText = 'Erreur!';
    hasError = true;

  }
  if(!lastNameInput.value.match(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i)){
    lastNameErrorMsg.innerText = 'Erreur!';
    hasError = true;
  }
  if(!addressInput.value.match(/^[a-zA-Z0-9\s,.'-]{3,}$/)){
    addressErrorMsg.innerText = 'Erreur!';
    hasError = true;
  }
  if(!cityInput.value.match(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/)){
    cityErrorMsg.innerText = 'Erreur!';
    hasError = true;
  }
  if(!emailInput.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
    emailErrorMsg.innerText = 'Erreur!';
    hasError = true;
  }
  if(!hasError){
    const order = {
      products : basket.map(item => item.id ),
      data : {
        firstName : firstNameInput.value,
        lastName : lastNameInput.value,
        address : addressInput.value,
        city : cityInput.value,
        email : emailInput.value
      }
    }
  }

} )
















run()
