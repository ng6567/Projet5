const urlParams = location.search // constante de la chaine de l'url que l'on va manipuler

const urlSearchParams = new URLSearchParams(urlParams) // chaine de caractère que l'on souhaite manipuler
const kanapId = urlSearchParams.get("id") // puis id indiqué en paramètre
function displayProduct(result){
    const imageContainer = document.getElementsByClassName("item__img")[0] // Création et ajout de l'image
        const img = document.createElement("img") 
        img.src = result.imageUrl
        img.alt = result.altTxt
        imageContainer.appendChild(img) // Rattachement de la balise img à "imageContainer"
       

        // Ajout et affichage du titre 
        const titleContainer = document.getElementById("title")
        titleContainer.innerText = result.name
        
        // Ajout et affichage de la description
        const descriptionContainer = document.getElementById("description")
        descriptionContainer.innerText = result.description
       
        // Ajout et affichage du prix
        const priceContainer = document.getElementById("price")
        priceContainer.innerText = result.price 
        
        // Ajout des options couleurs
        const colorContainer = document.getElementById("colors") 
        for (let i = 0; i < result.colors.length; i++) { // Boucle pour l'ajout des options couleurs disponibles selon la couleur choisie
            const color = result.colors[i] // 
            const newOption = document.createElement("option") // Création du menu déroulant pour accueillir les options couleurs
            newOption.value = color // Ajout des valeurs couleurs
            newOption.innerText = color // Affichage de la couleur choisie
            colorContainer.appendChild(newOption) // Rattachement au containerColor
        }

        document.getElementById("addToCart") // Ajout du bouton pour modifier la quantité des produits
            .addEventListener("click", function () { // Déclaration de la fonction qui s'executera au clique si la sélection correspond à au moins une couleurs et quantité compris entre 1 et 100
                const _id = result._id 
                const quantity = parseInt(document.getElementById("quantity").value)
                const color = colorContainer.value 
                if (!color || !(quantity <= 100 && quantity > 0)) { 
                    alert("Vous devez sélectionner une couleur et une quantité valide (1-100)") // Si un des paramètres (couleur, quantité) n'est pas complété selon les paramètres imposés message alert
                    return
                }
                
                const storedBasket = localStorage.getItem("nadia_p5_kanap") // Création d'une constante pour récupérer les éléments stocker dans le localStorage
                let basket; // Création de la variable basket qui correspond au panier
                if (storedBasket) { // Condition : le panier sera égale aux éléments parsés contenus dans le storedbasket 
                    basket = JSON.parse(storedBasket) 

                } else {
                    basket = [] // Si pas d'élément dans le storedbasket le panier retourna un tableau vide
                }
                // On vérifie le tableau localStorage avant la transmission d'un article 
                const existingIndex = basket.findIndex((item) => item._id === _id && item.color === color) // Création de la constante pour éviter les doublons pour les id et couleur identiques
                if (existingIndex > -1) { // Si l'article n'est pas encore présent (index à -1) on le rajoute au tableau sinon on incrémente uniquement sa quantité
                    const existingQuantity = basket[existingIndex].quantity 
                    if (quantity + existingQuantity > 100) { 
                        basket[existingIndex].quantity = 100 
                    } else {
                        basket[existingIndex].quantity = quantity + existingQuantity 
                    }
                } else {
                    basket.push({ // Si pas de doublon on incrémente nouvelle id, quantité,et couleur
                        _id: _id,
                        quantity: quantity,
                        color: color
                    })
                }
                
                localStorage.setItem("nadia_p5_kanap", JSON.stringify(basket)) // Enregistrement dans le local storage des éléments panier
            })
}
function fetchProduct(){
    fetch("http://localhost:3000/api/products/" + kanapId)  // Appel de l'URL lié à l'id produit
    .then(function (response) { //Fetch renvoie une promise, à la réponse de l'API execution du then 
        return response.json() // Récupérer la réponse en json
        

    })
    .then(displayProduct)
    
}
fetchProduct()

     
