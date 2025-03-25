import chickenImage from "./img/fried-chicken-breast-with-vegetables.jpg"
import potWithChickemImage from "./img/3253.jpg"
import starterImage from "./img/3418.jpg"
import beefImage from "./img/14307.jpg"

function loadHomePageFn(){
    //Get ID of content
    const content = document.getElementById("content")

    const cardDiv = document.createElement("div")
    const bannerDiv = document.createElement("div")
    bannerDiv.classList.add("banner")
    cardDiv.classList.add("card");  


    //Creates cardImage, imports from files, appends to cardImage
    const cardImage = document.createElement("img")
    cardImage.src = chickenImage;
    cardDiv.appendChild(cardImage)
    //Appends to DOM

    

    const descriptionDiv = document.createElement("div")
    descriptionDiv.classList.add("card","description")
    const descriptionP = document.createElement("p")
    descriptionP.textContent="Welcome to The Culinary Corner, where every dish is a celebration of flavor and creativity. Join us and discover a taste of culinary excellence that will leave you craving more."
    descriptionDiv.appendChild(descriptionP)

    bannerDiv.appendChild(cardDiv)
    bannerDiv.appendChild(descriptionDiv)
    content.appendChild(bannerDiv)

    const dishesText = document.createElement("p")
    dishesText.textContent = "Check out our full Menu."
    const dishesTextDiv = document.createElement("div")
    dishesTextDiv.appendChild(dishesText)

    dishesTextDiv.classList.add("dishes-description")
    content.appendChild(dishesTextDiv)

    const dishOneImage = document.createElement("img")
    dishOneImage.src=potWithChickemImage;
    const dishTwoImage = document.createElement("img")
    dishTwoImage.src = starterImage
    const dishThreeImage = document.createElement("img")
    dishThreeImage.src = beefImage
    const dishes = document.createElement("div")
    dishes.classList.add("dishes")
    dishes.appendChild(dishOneImage)
    dishes.appendChild(dishTwoImage)
    dishes.appendChild(dishThreeImage)

    content.appendChild(dishes)
}


export {loadHomePageFn}
