
/** 
 * RETRIEVE WORKS FROM API
 * @return { Array } Array of objects containing each work
**/ 
async function retrieveWorks() {
    const worksServerResponse = await fetch('http://localhost:5678/api/works')
    const works = await worksServerResponse.json()
    return works
}

/** 
 * RETRIEVE CATEGORIES FROM API
 * @return { Array } Array of objects containing each work
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

/** 
 * CHECKING USER LOGIN
 * @return { Boolean } which is true if there is a bearer token
**/
function checkLogin() {
    const token = (localStorage.getItem("token"))
    return Boolean(token)
}

/**
 * STARTING THE ADD PICTURE MODAL
 **/
const startAddPictureModal = function () {
    /* Removing the gallery modal */
    const modalGalleryContainer = document.querySelector(".modal-gallery-container")
    modalGalleryContainer.innerHTML = ''
    const modalGallery = document.querySelector("#modal-gallery")
    modalGallery.style.display = "none"
   
    /* Adding the add picture modal */
    const addPictureModal = document.querySelector("#modal-add-picture")
    addPictureModal.style.display = null

    /* Adding listener to close the modal */
    const modalPictureCloseButton = document.querySelector(".button-close-modal-picture")
    modalPictureCloseButton.addEventListener("click",function() {
        addPictureModal.style.display ="none"
        /* Resetting the picture input */
        const pictureSubmittingContainer = document.querySelector(".picture-submitting-container")
        pictureSubmittingContainer.innerHTML= `
            <img src="./assets/icons/picture.svg" alt="picture">
            <label class="download-picture-button-label">
                <input type="file" name="file" required class="download-picture-button" hidden></input>
                <p>+ Ajouter photo</p>
            </label>
            <p class="max-download-info">jpg, png : 4mo max</p>
            `
    })

    /* Adding listener to go back to the gallery modal */
    const backToGalleryModalButton = document.querySelector(".button-back-gallery-modal")
    backToGalleryModalButton.addEventListener("click", function() {
        addPictureModal.style.display ="none"
        const modalGalleryContainer = document.querySelector(".modal-gallery-container")
        modalGalleryContainer.innerHTML = ''
        /* Resetting the picture input */
        const pictureSubmittingContainer = document.querySelector(".picture-submitting-container")
        pictureSubmittingContainer.innerHTML= `
            <img src="./assets/icons/picture.svg" alt="picture">
            <label class="download-picture-button-label">
                <input type="file" name="file" required class="download-picture-button" hidden></input>
                <p>+ Ajouter photo</p>
            </label>
            <p class="max-download-info">jpg, png : 4mo max</p>
            `
        startGalleryModal()
    })

    /* Showing preview after uploading a picture */
    const downloadPictureButton = document.querySelector(".download-picture-button")
    downloadPictureButton.addEventListener("change", function(event) {
        const pictureUpload = downloadPictureButton.files 
        if (pictureUpload) {
            const pictureSubmittingContainer = document.querySelector(".picture-submitting-container")
            pictureSubmittingContainer.innerHTML = ``
            const previewPicture = document.createElement("img")
            previewPicture.className = "preview-picture"
            previewPicture.src = URL.createObjectURL(event.target.files[0])
            console.log(previewPicture.src)
            console.log(previewPicture)
            pictureSubmittingContainer.appendChild(previewPicture)
        }
    })

    /* Retrieving data from the form */
    const addedPictureTitleInput = document.querySelector("#title")
    const addedPictureCategoryInput = document.querySelector("#category")
    const submitPictureButton = document.querySelector(".submit-picture-button")
    submitPictureButton.addEventListener("click", function(event) {
        event.preventDefault()
        console.log(addedPictureCategoryInput.value)
        console.log(addedPictureTitleInput.value)
        console.log(downloadPictureButton.value)
        const category = addedPictureCategoryInput.value
        const title = addedPictureTitleInput.value
        const picture = downloadPictureButton.value
        /* Creating a formdata object */
        const formData = new FormData()
        const newId = works.length + 1
        formData.append("id", newId)
        formData.append("title", addedPictureTitleInput.value)
        formData.append("imageUrl", downloadPictureButton.value)
        formData.append("categoryId", addedPictureCategoryInput.value)
        const userId = localStorage.getItem("userId")
        formData.append("userId", userId)
        /* Sending the formdata */
    })

}

/**
 * STARTING THE GALLERY MODAL
 **/
const startGalleryModal = function () {
    /* Opening the modal window */
    const modalGallery = document.querySelector("#modal-gallery")
    modalGallery.style.display = null

    /* Adding listener to close the modal */
    const modal = document.querySelector(".modal")
    const modalCloseButton = document.querySelector(".button-close-modal-gallery")
    const modalGalleryContainer = document.querySelector(".modal-gallery-container")
    modalCloseButton.addEventListener("click", function() {
       modal.style.display ="none"
       modalGalleryContainer.innerHTML = ''
    })

    /* Adding listener to open the second modal*/
    const AddingPictureButton = document.querySelector(".add-picture-button")
    AddingPictureButton.addEventListener("click", startAddPictureModal)

    /* Generating miniature pictures and the remove image buttons */
    for (let i = 0; i < works.length; i++) {
        const workModalImage = document.createElement("img")
        const imageSubContainer = document.createElement("div")
        const removeImageButton = document.createElement("div")
        removeImageButton.className= "remove-image-button"
        /* need to add an identifier here for later */
        removeImageButton.innerHTML= `<i class="fa-solid fa-trash-can fa-xs"></i>` 
        imageSubContainer.className = "image-sub-container"
        workModalImage.src = works[i].imageUrl
        imageSubContainer.appendChild(workModalImage)
        imageSubContainer.appendChild(removeImageButton)
        modalGalleryContainer.appendChild(imageSubContainer)
    }

}

/** 
 * STARTING THE EDIT MODE
**/
function startEditMode() {
    /* Generating the edit mode header */
    const editHeader = document.createElement("div")
    editHeader.className = "edit-header"
    editHeader.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> <p> Mode édition </p>'
    const header = document.querySelector("header")
    const mainHeader = document.querySelector(".main-header")
    header.insertBefore(editHeader,mainHeader)

    /* Switching the login button to logout */
    const loginLogoutButton = document.querySelector(".login-logout-button")
    loginLogoutButton.innerHTML = '<a href="login.html">logout</a>'

    /* Removing token and userId when logging out */
    loginLogoutButton.addEventListener("click", function(){
        window.localStorage.removeItem("userId")
        window.localStorage.removeItem("token")
    })

    /* Adding modal window button */
    const modalButton = document.createElement("div")
    modalButton.className = "modal-button"
    modalButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> <p> modifier </p>'
    const main = document.querySelector("main")
    const sectionPortfolio = document.querySelector("#portfolio")
    main.insertBefore(modalButton,sectionPortfolio)

    /* Adding listener to start modal window */
    modalButton.addEventListener("click", startGalleryModal)
}


/* CODE STARTING WHEN THE PAGE LOADS */
const works = await retrieveWorks()
const categories = await retrieveCategories()
generateWorks(works)
addingFilterButtonsReactions()
const loginCheck = checkLogin()
if (loginCheck) {
    startEditMode()
}
