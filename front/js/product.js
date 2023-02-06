const urlParams = location.search
const urlSearchParams = new URLSearchParams(urlParams) // Création de l'url produit
const kanapId = urlSearchParams.get("id") // Création de la constante qui récupère les id du DOM
fetch("http://localhost:3000/api/products/" + kanapId)  // Appel de l'API
    .then(function (response) { //Récupération des éléments "id" depuis le fichier JSON
        return response.json()

    })
    .then(function (result) { // Fonction pour "result" contenant les différents "items"
        console.log(result)
        const imageContainer = document.getElementsByClassName("item__img")[0] // Appel de la classe image
        const img = document.createElement("img") // Création de la balise image
        img.src = result.imageUrl
        img.alt = result.altTxt
        imageContainer.appendChild(img) // Rattachement de la balise img au parent "imageContainer"

        // Créations des constantes et appel des balises title, description, price, et rattachement aux sections appropriés 
        const titleContainer = document.getElementById("title")
        titleContainer.innerText = result.name

        const descriptionContainer = document.getElementById("description")
        descriptionContainer.innerText = result.description

        const priceContainer = document.getElementById("price")
        priceContainer.innerText = result.price

        const colorContainer = document.getElementById("colors") // Création d'une constante et appel de la balise colors 
        for (let i = 0; i < result.colors.length; i++) { // Boucle pour l'ajout des différentes couleurs 
            const color = result.colors[i]
            const newOption = document.createElement("option") // Création d'une constante "option"
            newOption.value = color // Rattachement de la constante à l'élément "value" du DOM qui déterminera la couleur choisie
            newOption.innerText = color
            colorContainer.appendChild(newOption) // Rattachement de la constante "newOption" à la balise couleur
        }

        document.getElementById("addToCart") // Appel du bouton "addToCart"
            .addEventListener("click", function () { // Ajout d'un evenement click à l'élément bouton
                const _id = result._id 
                const quantity = parseInt(document.getElementById("quantity").value)// Création de deux constantes quantity (nbr entier) et pour la couleur
                const color = colorContainer.value
                if (!color.value || !(quantity <= 100 && quantity > 0)) { // Condition : couleur présente et quantité entre 0 et 100 sinon message erreur
                    alert("Vous devez sélectionner une couleur et une quantité valide (1-100)")
                    return
                }
                const storedBasket = localStorage.getItem("nadia_p5_kanap") // Création d'une constante pour récupérer les données éventuellement à  dans le localStorage
                let basket;
                if (storedBasket) { // Condition : si il y a des données les reconstruire en mémoire sinon récupérer les données de la constante "basket"
                    basket = JSON.parse(storedBasket)

                } else {
                    basket = [] 
                }

                const existingIndex = basket.findIndex((item) => item._id === _id && item.color === color) // Création de la constante qui permet de définir les items que l'on recherche
                if (existingIndex > -1) { 
                    const existingQuantity = basket[existingIndex].quantity 
                    if (quantity + existingQuantity > 100) {
                        basket[existingIndex].quantity = 100
                    } else {
                        basket[existingIndex].quantity = quantity + existingQuantity
                    }
                } else {
                    basket.push({
                        _id: _id,
                        quantity: quantity,
                        color: color
                    })
                }
                localStorage.setItem("nadia_p5_kanap", JSON.stringify(basket)) // Enregistrement dans le local storage des éléments baskets converties en format JSON
            })

    })
     
