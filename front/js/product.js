const urlParams = location.search //Stockage de dans l'objet window.location - search chaine de caractère fin de l'url

const urlSearchParams = new URLSearchParams(urlParams) // chaine de caractère que l'on souhaite manipuler
const kanapId = urlSearchParams.get("id") // Création de la constante qui stocke l'url et de l'id
fetch("http://localhost:3000/api/products/" + kanapId)  // URL du service à interroger
    .then(function (response) { //Extraire les données JSON de ma requête
        return response.json()

    })
    .then(function (result) { // Envoie des ces données dans la function "result"
        
        const imageContainer = document.getElementsByClassName("item__img")[0] // Création de la constante imageContainer pour contenir les objets de ClassName 'item_img"
        const img = document.createElement("img") // Création de la balise image
        img.src = result.imageUrl
        img.alt = result.altTxt
        imageContainer.appendChild(img) // Rattachement de la balise img au parent "imageContainer"
        

        // Créations des constantes pour appel des balises title, description, price, et affichage des éléments appropriés 
        const titleContainer = document.getElementById("title")
        titleContainer.innerText = result.name
        

        const descriptionContainer = document.getElementById("description")
        descriptionContainer.innerText = result.description
       
        const priceContainer = document.getElementById("price")
        priceContainer.innerText = result.price
        
        const colorContainer = document.getElementById("colors") // Création d'une constante et appel de la balise colors 
        for (let i = 0; i < result.colors.length; i++) { // Boucle pour l'ajout des différentes couleurs depuis la fonction result
            const color = result.colors[i] 
            const newOption = document.createElement("option") // Création d'une constante "option"
            newOption.value = color // Rattachement de la constante à l'élément "value" du DOM qui déterminera la couleur choisie
            newOption.innerText = color // Afichage de la couleur choisie
            colorContainer.appendChild(newOption) // Rattachement de la constante "newOption" à la balise couleur
            
        }
        

        document.getElementById("addToCart") // Appel du bouton "addToCart"
            .addEventListener("click", function () { // Ajout d'un evenement click à l'élément bouton
                const _id = result._id 
                const quantity = parseInt(document.getElementById("quantity").value)// Création de la constante quantity, appel la value de l'id quantity et qui retournera un nombre entier
                const color = colorContainer.value // Création de la constante color qui appel la valeur du colorContainer
                if (!color || !(quantity <= 100 && quantity > 0)) { // Condition : couleur présente et quantité entre 0 et 100 sinon message erreur
                    alert("Vous devez sélectionner une couleur et une quantité valide (1-100)")
                    return
                }
                const storedBasket = localStorage.getItem("nadia_p5_kanap") // Création d'une constante pour récupérer les données éventuellement stocker dans le localStorage
                let basket; // Création de la variable basket
                if (storedBasket) { // Condition : si il y a des données stocker dans le localStorage les reconstruire en mémoire 
                    basket = JSON.parse(storedBasket)

                } else {
                    basket = [] // Sinon array vide
                }
              
                const existingIndex = basket.findIndex((item) => item._id === _id && item.color === color) // Création constante permettant de définir les items id et couleur contenu dans le panier 
                if (existingIndex > -1) { // S'il n'existe pas d'id ou color similaire
                    const existingQuantity = basket[existingIndex].quantity // création de la constante existingQuantity qui permettra d"ajouter une quantité aux id ou couleurs 
                    if (quantity + existingQuantity > 100) { // Si il y a déjà une quantité et id ou une couleur déjà existant 
                        basket[existingIndex].quantity = 100 // On ajoute une quantité aux id ou couleur similaires existants
                    } else {
                        basket[existingIndex].quantity = quantity + existingQuantity //Sinon on ajoute une quantié et les id ou couleurs
                    }
                } else {
                    basket.push({ // Si l'on ne retrouve pas les éléments de la constante existingIndex alors on ajoute un id, un quantité,et couleurs au panier
                        _id: _id,
                        quantity: quantity,
                        color: color
                    })
                }
                
                localStorage.setItem("nadia_p5_kanap", JSON.stringify(basket)) // Enregistrement dans le local storage des éléments baskets converties en format JSON
            })

    })
     
