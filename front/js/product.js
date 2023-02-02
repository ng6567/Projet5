const urlParams = location.search
const urlSearchParams = new URLSearchParams(urlParams)
const kanapId = urlSearchParams.get("id")
fetch("http://localhost:3000/api/products/" + kanapId)
    .then(function (response) {
        return response.json()

    })
    .then(function (result) {
        console.log(result)
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
        for (let i = 0; i < result.colors.length; i++) {
            const color = result.colors[i]
            const newOption = document.createElement("option")
            newOption.value = color
            newOption.innerText = color
            colorContainer.appendChild(newOption)
        }

        document.getElementById("addToCart")
            .addEventListener("click", function () {
                const _id = result._id
                const quantity = parseInt(document.getElementById("quantity").value)
                const color = colorContainer.value
                if (!color.value || !(quantity <= 100 && quantity > 0)) {
                    alert("Vous devez sélectionner une couleur et une quantité valide (1-100)")
                    return
                }
                const storedBasket = localStorage.getItem("nadia_p5_kanap")
                let basket;
                if (storedBasket) {
                    basket = JSON.parse(storedBasket)

                } else {
                    basket = []
                }

                const existingIndex = basket.findIndex((item) => item._id === _id && item.color === color)
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
                localStorage.setItem("nadia_p5_kanap", JSON.stringify(basket))
            })

    })
     
