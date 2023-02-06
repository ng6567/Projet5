const itemsSection = document.getElementById("items") //Récupération de l'élément du DOM qui accueillera les "items" de chaque canapé dans une constante itemsSection
fetch("http://localhost:3000/api/products") //Appel de l'API en ligne 
    .then(function (response) { //Récupération des "items" depuis le fichier JSON
        return response.json()

    })
    .then(function (result) {  // Fonction result pour l'ajout des différents "items"
        let htmlString = "" // Création d'une variable - chaine de caractère - qui accueillera les "items"
        for (let i = 0; i < result.length; i++) { // Boucle for pour l'ajout des tout les "items"
            const kanap = result[i] // Création de la constante kanap qui contient tous les items

            // Ajout des balises des "items" dans la variable chaine de caractère htmlString
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






