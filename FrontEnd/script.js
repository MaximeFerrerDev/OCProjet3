/* Works retrieval from API */
const worksServerResponse = await fetch('http://localhost:5678/api/works')
const works = await worksServerResponse.json()
console.log(works)

/** 
 * Generate the HTML from the works retrieved from API
 * @param { Array } works Array of objects containing each work
**/ 
function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const workToGenerate = works[i]
        /* Récupération de l'élément du DOM qui va contenir les travaux */
        const worksGallery = document.querySelector(".gallery")
        /* Création de la balise qui contient un travail */
        const workElement = document.createElement("figure")
        /* Création des balises contenant l'image et la description */
        const workImage = document.createElement("img")
        workImage.src = workToGenerate.imageUrl
        workImage.alt = workToGenerate.title ?? "Projet sans titre"
        const workCaption = document.createElement("figcaption")
        workCaption.innerText = workToGenerate.title ?? "Projet sans titre"
        /* Intégration des balises dans le HTML */
        worksGallery.appendChild(workElement)
        workElement.appendChild(workImage)
        workElement.appendChild(workCaption)
    }
}

/* Script */
generateWorks(works)