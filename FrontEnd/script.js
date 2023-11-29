/* Récupération des travaux depuis l'API */
const worksServerResponse = await fetch('http://localhost:5678/api/works')
const works = await worksServerResponse.json()


function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const workToGenerate = works[i]

        const worksGallery = document.querySelector(".gallery")

        const workElement = document.createElement("figure")

        const workImage = document.createElement("img")
        workImage.src = workToGenerate.imageUrl
        workImage.alt = workToGenerate.title
        const workCaption = document.createElement("figcaption")
        workCaption.innerText = workToGenerate.title

        worksGallery.appendChild(workElement)
        workElement.appendChild(workImage)
        workElement.appendChild(workCaption)
    }
}

generateWorks(works)