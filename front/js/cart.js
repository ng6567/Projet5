// Création de la structure html qui accueillera les données de la carte 
const sectionCart = document.querySelector("#cart__items"); 
const totalQuantityElt = document.getElementById("totalQuantity"); 

const totalPriceElt = document.getElementById("totalPrice"); 
let totalQuantity = 0; // Création des différentes variables permettant la manipulation des articles dans le panier
let totalPrice = 0;
let basket;
let basketWithInfos;


function run (){ // Déclaration de la fonction run qui s'executera selon les éléments stockés dans le basket (panier)/storeBasket (localStorage)
    
    const storedBasket = localStorage.getItem("nadia_p5_kanap"); //  storeBasket (localstorage) qui détermine où seront récupérés les éléments
    
    if (storedBasket){ // Si des éléments sont ajoutés dans le basket (panier) les éléments seront également dans le storeBasket (localstorage) sous forme de tableau
        basket = JSON.parse(storedBasket) 
    }else{
        document.getElementById("cartAndFormContainer").innerHTML = "<h1>Votre panier est vide</h1>" // Sinon balise H1 avec le texte qui s'affichera "votre panier est vide"
        return
    }

    getAllKanaps () // Execution de la fonction qui remplit le tableau
}

function getOneKanap (kanap){ // Déclaration de la nouvelle fonction getOneKanap qui executera l'objet Kanap
    return new Promise ((resolve)=> { 
        fetch("http://localhost:3000/api/products/" + kanap._id)  // Appel de l'URL lié à kanap._id
    .then(function (response) { //Fetch renvoie une promise, à la réponse de l'API execution du then 
        return response.json()// Récupérer la réponse en json
    })
    .then(function (result) { ///Fonction qui recevra les données de la précédente promesse pour afficher l'objet Kanap
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


function getAllKanaps (){ //  Déclaration fonction getAllKanaps utilisation de l'objet getOneKanap- "Affichage des informations de l'objet kanap, calcul du prix total et quantité totale"
   
    const promises = []; // Tableau vide
    for (let i = 0; i < basket.length; i++){ // Boucle qui permet d'incrémenter les objets  disponibles dans basket (panier)
        const kanap = basket [i] // 
        promises.push (getOneKanap (kanap)) // on incrémente l'objets kanap récupérer de la fonction getOneKanap
    }
   
    
Promise.all (promises).then ((kanaps) => { // Lorsque les "promises" sont résolues alors on récupère tous les objets kanaps qui correspondent à tous les différents produits séléctionnés 
    
    basketWithInfos = kanaps; // Remplissage des objets kanap contenu dans le tableau kanaps dans le panier en prenant compte de la quantité et du prix
    for(let i = 0; i < kanaps.length; i++){ // boucle qui permet d'incrémenter tous les objets de la const Kanap dans un tableau kanaps
        const kanap = kanaps [i]; 
        createKanapElement(kanap);
        totalQuantity += kanap.quantity; // Quantité totale de produits
        totalPrice += kanap.quantity * kanap.price; // Prix total de produits
    }
    totalPriceElt.innerText = totalPrice; // Afficher le prix total
    totalQuantityElt.innerHTML = totalQuantity; // Afficher la quantité total
})


}


function createKanapElement (kanap) { // Déclaration de la fonction qui executera l'addition ou suppression des éléments dans basket et storedBasket de la carte
    //// Création de la structure html qui accueillera les données de la carte- Récupération des paramètres des produits
    const article = document.createElement("article") 
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

    const inputElement = document.createElement ("input"); //Création de l'élément input - Evenement qui sera écoutée
   
    inputElement.addEventListener('change', () =>{ //Ajout d'un evenement qui écoutera l'ajout du nombre d'articles séléctionnées
      const newValue = Number (inputElement.value); // Valeur de l'input après le changement
      const index = basket.findIndex((item)=> item._id === kanap._id && item.color === kanap.color); // Création de la constante pour éviter les doublons pour les id et couleurs identiques
      const oldValue = basket[index].quantity; // Si l'article n'est pas encore présent on le rajoute au tableau sinon on incrémente uniquement sa quantité
      const difference = newValue - oldValue; // Valeur finale 
      
      totalQuantity += difference; // Calculs et affichages des totaux prix et quantité
      totalPrice += (difference * kanap.price); 
      totalQuantityElt.innerText = totalQuantity; 
      totalPriceElt.innerText = totalPrice; 
      basket[index].quantity = newValue; 
      localStorage.setItem('nadia_p5_kanap', JSON.stringify(basket)); // Mise à jour du localStorage et sérialisation des données
    })

  
    //Création des éléments input du formulaire 
    inputElement.type = "number"; 
    inputElement.className = "itemQuantity";
    inputElement.name = "itemQuantity";
    inputElement.min = 1;
    inputElement.max = 100;
    inputElement.value = kanap.quantity;
    
    // Création de la structure html pour la suppression des éléments
    const cart__item__content__settings__delete = document.createElement("div") 
    cart__item__content__settings__delete.className = "cart__item__content__settings__delete"; 

    const deleteItems = document.createElement("p"); 
    deleteItems.innerHTML = "supprimer"; 
    deleteItems.className = "deleteItem";
    deleteItems.addEventListener('click', () =>{ //Déclaration de la fonction qui executera la suppression d'un élément ou des éléments du basket (panier) /StoredBasket (localstorate)
       
      // On vérifie le contenu du basket avant la supression d'un article 
      const index = basket.findIndex((item)=> item._id === kanap._id && item.color === kanap.color); // 
      const quantity = basket[index].quantity;
      
      totalQuantity -= quantity; // Décrémentation et affichage de la quantité et du prix
      totalPrice -= (quantity * kanap.price); 
      totalQuantityElt.innerText = totalQuantity;
      totalPriceElt.innerText = totalPrice;
      basket.splice(index, 1); // Supression d'un élément à partir de l'index
      localStorage.setItem('nadia_p5_kanap', JSON.stringify(basket)); //Mise à jour du localStorage et sérialisation des données
      article.remove(); 
    })
    
    
    sectionCart.appendChild(article); //Rattachement des différents éléments html du formulaire

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
//Mise en place du formulaire pour la finalisation de la commande - Détermination des données input du formulaire
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

document.querySelector('.cart__order__form').addEventListener('submit', (e) =>{ //Ajout du bouton pour soumettre le formulaire au serveur
  e.preventDefault(); // annuler l'action par défaut pour le contrôle du formulaire et affichage de la page de confirmation
  [firstNameErrorMsg, lastNameErrorMsg, addressErrorMsg, cityErrorMsg, emailErrorMsg].forEach(item =>{ // Déclaration d'une fonction qui s'éxecutera lorsque tous les champs match les regex 
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

     //création d'un objet contact pour l'envoi au server
    const order = {
      products : basket.map(item => item._id ),
      contact : {
        firstName : firstNameInput.value,
        lastName : lastNameInput.value,
        address : addressInput.value,
        city : cityInput.value,
        email : emailInput.value
      }
    }
    //Envoi des produits et contact au serveur avec la méthode post
    fetch ("http://localhost:3000/api/products/order", { //Order paramètre demandée par l'API
      method : "post",
      headers : {"Content-Type": "application/json"},
      body : JSON.stringify(order) // Information transmises en JSON
      
    })
    .then(response => response.json()) // si réponse ok
    .then(result => { 
      localStorage.removeItem('nadia_p5_kanap') // Vider le localStorage
      location.href = "./confirmation.html?orderId="+ result.orderId // chargement de la page de confirmation avec url composé de l'url orderid
    })

  }

} )















run()
