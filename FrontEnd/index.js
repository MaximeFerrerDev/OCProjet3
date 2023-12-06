/* Code starting when the page loads */
const works = await retrieveWorks()
const categories = await retrieveCategories()
generateWorks(works)
addingFilterButtonsReactions()

/** 
 * RETRIEVE WORKS FROM API
 * @return { Array } works Array of objects containing each work
**/ 
async function retrieveWorks() {
    const worksServerResponse = await fetch('http://localhost:5678/api/works')
    const works = await worksServerResponse.json()
    return works
}

/** 
 * RETRIEVE CATEGORIES FROM API
 * @return { Array } categories Array of objects containing each work
**/ 
async function retrieveCategories() {
    const categoriesServerResponse = await fetch('http://localhost:5678/api/categories')
    const categories = await categoriesServerResponse.json()
    return categories
}

/** 
 * GENERATE THE HTML PRESENTING THE WORKS
 * @param { Array } works Array of objects containing each work
**/ 
function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const workToGenerate = works[i]
        /* Retrieval of the DOM element which will contain works*/
        const worksGallery = document.querySelector(".gallery")
        /* Creation of the tag containing a work */
        const workElement = document.createElement("figure")
        /* Creation of the tags for image and title */
        const workImage = document.createElement("img")
        workImage.src = workToGenerate.imageUrl
        workImage.alt = workToGenerate.title ?? "Projet sans titre"
        const workCaption = document.createElement("figcaption")
        workCaption.innerText = workToGenerate.title ?? "Projet sans titre"
        /* Integration of the tags in the HTML */
        worksGallery.appendChild(workElement)
        workElement.appendChild(workImage)
        workElement.appendChild(workCaption)
    }
}

/** 
 * ADDING CATEGORIES FILTERS BUTTONS REACTIONS
 * categoryId : 1 => "Objets"
 * categoryId : 2 => "Appartements"
 * categoryId : 3 => "Hôtels&restaurants"
**/
function addingFilterButtonsReactions() {
    /* Retrieving all DOM elements */
    const allCategoriesButton = document.querySelector(".all-categories-button") 
    const objetsButton = document.querySelector(".objets-button") 
    const appartementsButton = document.querySelector(".appartements-button") 
    const hotelsRestaurantsButton = document.querySelector(".hotels-restaurants-button") 

    /* All categories button */
    allCategoriesButton.addEventListener("click", function(){
            /* Deleting gallery temporarily*/
            document.querySelector(".gallery").innerHTML = ""
            /* Generating the works again */
            generateWorks(works)
            /* Changing CSS classes to show focus */
            allCategoriesButton.classList.add("focus-button")
            objetsButton.classList.remove("focus-button")
            appartementsButton.classList.remove("focus-button")
            hotelsRestaurantsButton.classList.remove("focus-button")
    })

    /* "Objets" button */
    objetsButton.addEventListener("click", function(){
        const worksFiltered = Array.from(works)
        /* Deleting every work for which categoryId isn't corresponding to "Objets" from the array */
        for (let i = worksFiltered.length -1 ; i >= 0 ; i--){
            if (worksFiltered[i].categoryId != 1) {
                worksFiltered.splice(i,1)
            }
        }
        /* Deleting gallery temporarily */
        document.querySelector(".gallery").innerHTML = ""
        /* Generating the works from the new filtered array */
        generateWorks(worksFiltered)
        /* Changing CSS classes to show focus */
        allCategoriesButton.classList.remove("focus-button")
        objetsButton.classList.add("focus-button")
        appartementsButton.classList.remove("focus-button")
        hotelsRestaurantsButton.classList.remove("focus-button")
    })

    /* "Appartements" button */  
    appartementsButton.addEventListener("click", function(){
        const worksFiltered = Array.from(works)
        /* Deleting every work for which categoryId isn't corresponding to "Appartements" from the array */
        for (let i = worksFiltered.length -1 ; i >= 0 ; i--){
            if (worksFiltered[i].categoryId != 2) {
                worksFiltered.splice(i,1)
            }
        }
        /* Deleting gallery temporarily */
        document.querySelector(".gallery").innerHTML = ""
        /* Generating the works from the new filtered array */
        generateWorks(worksFiltered)
        /* Changing CSS classes to show focus */
        allCategoriesButton.classList.remove("focus-button")
        objetsButton.classList.remove("focus-button")
        appartementsButton.classList.add("focus-button")
        hotelsRestaurantsButton.classList.remove("focus-button")
    })

    /* "Hôtels&restaurants" button */
    hotelsRestaurantsButton.addEventListener("click", function(){
        const worksFiltered = Array.from(works)
        /* Deleting every work for which categoryId isn't corresponding to "Hôtels&restaurants" from the array */
        for (let i = worksFiltered.length -1 ; i >= 0 ; i--){
            if (worksFiltered[i].categoryId != 3) {
                worksFiltered.splice(i,1)
            }
        }
        /* Deleting gallery temporarily */
        document.querySelector(".gallery").innerHTML = ""
        /* Generating the works from the new filtered array */
        generateWorks(worksFiltered)
        /* Changing CSS classes to show focus */
        allCategoriesButton.classList.remove("focus-button")
        objetsButton.classList.remove("focus-button")
        appartementsButton.classList.remove("focus-button")
        hotelsRestaurantsButton.classList.add("focus-button")
    })
}