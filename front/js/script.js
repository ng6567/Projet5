    function displayProducts (result) { // et ensute le résultat sera utilisé dans la déclaration de la fonction qui s'executera pour structurer la liste de produits
      const itemsSection = document.getElementById("items") //Déclaration de la variable utilisées pour l'ensemble des produits 
      let htmlString = "" 
      for (let i = 0; i < result.length; i++) { // Création d'une boucle pour itérer les produits disponibles
          const kanap = result[i] 
         // Création de la structure html qui accueillera les données de la page d'accueil - Récupération des paramètres des produits
          htmlString += `<a href="./product.html?id=${kanap._id}"> 
  <article>
    <img src="${kanap.imageUrl}" alt="${kanap.altTxt}"> 
    <h3 class="productName">${kanap.name}</h3>
    <p class="productDescription">${kanap.description}Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
  </article>
  </a>`
      }
      itemsSection.innerHTML = htmlString // Génère les différents produits sur la page web
  }
    

    function fetchProducts (){
      fetch("http://localhost:3000/api/products") // On appelle la méthode fetch avec URL de notre API
    .then(function (response) { // Fetch renvoie une promise, à la réponse de l'API execution du then
        return response.json() // Récupérer la réponse en json
      
    })
    .then(displayProducts)
    }
    
    fetchProducts()

/*<a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> */






