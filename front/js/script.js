const itemsSection = document.getElementById("items") //Constante itemdSection : Récupération de l'élément du DOM "items" qui accueillera les articles disponible à la vente
fetch("http://localhost:3000/api/products") // URL du service à interroger
    .then(function (response) { //Renvoie d'un résultat - Fonction de rappel response
        return response.json() // Extraire les données JSON de ma requête
      
    })
    .then(function (result) {  //Envoie des ces données dans la function "result"
        let htmlString = "" // Création d'une variable - qui accueillera les objets Kanap
        for (let i = 0; i < result.length; i++) { // Boucle for pour l'ajout des objets kanap
            const kanap = result[i] // Création de la constante kanap égal aux résultats des requêtes pour chacun des objets 
            // Ajout des balises des objets dans la variable chaine de caractère htmlString
            htmlString += `<a href="./product.html?id=${kanap._id}"> 
    <article>
      <img src="${kanap.imageUrl}" alt="${kanap.altTxt}"> 
      <h3 class="productName">${kanap.name}</h3>
      <p class="productDescription">${kanap.description}Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
    </article>
    </a>`
        }
        itemsSection.innerHTML = htmlString // Générer la page web avec les différents canapés
    })

/*<a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> */






