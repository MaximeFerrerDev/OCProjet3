/* CODE STARTING WHEN THE PAGE LOADS */
let works = await retrieveWorks()
const categories = await retrieveCategories()
generateWorks(works)
generateFilterButtons(categories)
addFilterButtonsReactions(categories)
const loginCheck = checkLogin()
if (loginCheck) {
    addEditModeHeader()
    addLogoutButton()
    addModalStartingButton()
}

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
 * @return { Array } Array of objects containing each id and name of categories
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
    /* Deleting the gallery if there was something before */
    document.querySelector(".gallery").innerHTML = ""
    /* Generating works */
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
    console.log(works)
}

/** 
 * GENERATING CATEGORIES FILTER BUTTONS
 *  * @param { Array } categories Array of objects containing each id and name of categories
**/
function generateFilterButtons(categories) {
    for (let i = 0; i < categories.length; i++) {
        const filtersButtonContainer = document.querySelector(".filters-buttons-container")
        const newFilterButton = document.createElement("button")
        newFilterButton.classList.add("not-focus-button", "filter-button-"+ categories[i].id)
        newFilterButton.innerText = categories[i].name
        filtersButtonContainer.appendChild(newFilterButton)
    }
}


/** 
 * ADDING REACTIONS TO CATEGORIES FILTER BUTTONS
 *  * @param { Array } categories Array of objects containing each id and name of categories
**/
function addFilterButtonsReactions(categories) {
        /* For each individual button */
        for (let i = 0; i < categories.length; i++) {
            const filterButton = document.querySelector(`.filter-button-${categories[i].id}`)
            filterButton.addEventListener("click", function() {
                /* Deleting every work for which categoryId isn't corresponding */
                const worksFiltered = Array.from(works)
                for (let j = worksFiltered.length -1 ; j >= 0 ; j--){
                    if (worksFiltered[j].categoryId != categories[i].id) {
                        worksFiltered.splice(j,1)
                    }
                }
                /* Deleting gallery and regenerating works from the new filtered array */
                generateWorks(worksFiltered)
                /* Changing CSS classes to show focus */
                const allFiltersButtons = document.querySelectorAll(".not-focus-button")
                allFiltersButtons.forEach((button) => button.classList.remove("focus-button") )
                filterButton.classList.add("focus-button")
            })
        }
    
        /* For the "All categories" button */
        const allCategoriesButton = document.querySelector(".all-categories-button")
        allCategoriesButton.addEventListener("click", function(){
            /* Deleting gallery temporarily and regenerating works */
            generateWorks(works)
            /* Changing CSS classes to show focus */
            const allFiltersButtons = document.querySelectorAll(".not-focus-button")
            allFiltersButtons.forEach((button) => button.classList.remove("focus-button") )
            allCategoriesButton.classList.add("focus-button")
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
 * ADD "EDIT MODE" HEADER
**/
function addEditModeHeader() {
    const editHeader = document.createElement("div")
    editHeader.className = "edit-header"
    editHeader.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> <p> Mode édition </p>'
    const header = document.querySelector("header")
    const mainHeader = document.querySelector(".main-header")
    header.insertBefore(editHeader,mainHeader)
}

/** 
 * TRANSFORM LOGIN BUTTON TO LOGOUT AND ADDING ITS REACTION
**/
function addLogoutButton() {
        /* Switching the login button to logout */
        const loginLogoutButton = document.querySelector(".login-logout-button")
        loginLogoutButton.innerHTML = '<a href="login.html">logout</a>'
    
        /* Removing token and userId when logging out */
        loginLogoutButton.addEventListener("click", function(){
            window.localStorage.removeItem("userId")
            window.localStorage.removeItem("token")
        })
}

/** 
 * ADDING THE BUTTON TO START MODAL WINDOW
**/
function addModalStartingButton() {
    /* Adding modal window button */
    const modalButton = document.createElement("div")
    modalButton.className = "modal-button"
    modalButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> <p> modifier </p>'
    const main = document.querySelector("main")
    const sectionPortfolio = document.querySelector("#portfolio")
    main.insertBefore(modalButton,sectionPortfolio)

    /* Adding listener to start modal window */
    modalButton.addEventListener("click", galleryModal)
}

/**
 * MAIN FUNCTION FOR THE "GALLERY" MODAL
 **/
function galleryModal() {
    openGalleryModalWindow()
    addCloseGalleryModalListeners()
    addOpenAddPictureModalListener()
    addMiniatureGallery()
    addMiniatureGalleryListeners()
}

/**
 * OPENING THE "GALLERY" MODAL WINDOW
 **/
function openGalleryModalWindow() {
   const modalGallery = document.querySelector("#modal-gallery")
   modalGallery.style.display = null
}

/**
 * ADDING LISTENERS TO CLOSE THE "GALLERY" MODAL
 **/
function addCloseGalleryModalListeners() {
    /* When clicking on the cross */
    const modalCloseButton = document.querySelector(".button-close-modal-gallery")
    modalCloseButton.addEventListener("click", function() {
        closeGalleryModal()
        resetMiniatureGallery()
    })
    /* When clicking outside the modal */
    const modal = document.querySelector("#modal-gallery")
    modal.addEventListener("click", function() {
        closeGalleryModal()
        resetMiniatureGallery()
    })
    const modalWindow = document.querySelector("#modal-gallery .modal-wrapper")
    modalWindow.addEventListener("click", function(event) {
        event.stopPropagation()
    })
}

/**
 * ADDING LISTENER TO OPEN THE "ADD PICTURE" MODAL
 **/
function addOpenAddPictureModalListener() {
    const AddingPictureButton = document.querySelector(".add-picture-button")
    AddingPictureButton.addEventListener("click", addPictureModal)
}

/**
 * ADDING MINIATURE PICTURES IN THE GALLERY MODAL AND THE DELETE BUTTONS
 **/
function addMiniatureGallery() {
    /* Generating miniature pictures and the remove image buttons */
    for (let i = 0; i < works.length; i++) {
        const Id = works[i].id
        const workModalImage = document.createElement("img")
        const imageSubContainer = document.createElement("div")
        const removeImageButton = document.createElement("div")
        removeImageButton.className= "remove-image-button"
        removeImageButton.classList.add(`remove-${Id}`)
        removeImageButton.innerHTML= `<i class="fa-solid fa-trash-can fa-xs"></i>` 
        imageSubContainer.className = "image-sub-container"
        workModalImage.src = works[i].imageUrl
        imageSubContainer.appendChild(workModalImage)
        imageSubContainer.appendChild(removeImageButton)
        const modalGalleryContainer = document.querySelector(".modal-gallery-container")
        modalGalleryContainer.appendChild(imageSubContainer)
    }
}

/**
 * ADDING LISTENERS ON THE DELETE BUTTONS TO DELETE WORKS FROM API
 **/
function addMiniatureGalleryListeners() {
    for (let i = 0; i < works.length; i++) {   
        const Id = works[i].id
        const removeImageButton = document.querySelector(`.remove-${Id}`)
        removeImageButton.addEventListener("click", async function(event) {
            const request = new XMLHttpRequest()
            const token = localStorage.getItem("token")
            request.open("DELETE", `http://localhost:5678/api/works/${Id}`, true)
            request.setRequestHeader("Authorization", "Bearer "+ token)
            request.send(Id)
            resetMiniatureGallery()
            works = await retrieveWorks()
            generateWorks(works)
            addMiniatureGallery()
            addMiniatureGalleryListeners()
        })
    }
}

/**
 * DELTING MINIATURE PICTURES IN THE GALLERY MODAL INCLUDING BUTTONS
 **/
function resetMiniatureGallery() {
    const modalGalleryContainer = document.querySelector(".modal-gallery-container")
    modalGalleryContainer.innerHTML = ''
}

/**
 * CLOSING "GALLERY" MODAL WINDOW
 **/
function closeGalleryModal() {
    const modalGallery = document.querySelector("#modal-gallery")
    modalGallery.style.display = "none"
}

/**
 * MAIN FUNCTION FOR THE "ADD PICTURE" MODAL
 **/
function addPictureModal() {
    closeGalleryModal()
    resetMiniatureGallery()
    openAddPictureModal()
    addCloseAddPictureModalListener()
    addBackToGalleryModalListener()
    addPreviewListener()
    addSubmitNewWorkListener()
}

/**
 * OPENING THE "ADD PICTURE" MODAL WINDOW
 **/
function openAddPictureModal() {
   const addPictureModal = document.querySelector("#modal-add-picture")
   addPictureModal.style.display = null
}

/**
 * ADDING LISTENERS TO CLOSE THE "ADD PICTURE" MODAL
 **/
function addCloseAddPictureModalListener() {
    /* When clicking on the cross */
    const modalPictureCloseButton = document.querySelector(".button-close-modal-picture")
    modalPictureCloseButton.addEventListener("click",function() {
        closeAddPictureModal()
        resetPictureSubmit()
    })
    /* When clicking outside the modal */
    const modal = document.querySelector("#modal-add-picture")
    modal.addEventListener("click", function() {
        closeAddPictureModal()
        resetPictureSubmit()
    })
    const modalWindow = document.querySelector("#modal-add-picture .modal-wrapper")
    modalWindow.addEventListener("click", function(event) {
        event.stopPropagation()
    })
}

/**
 * ADDING LISTENER TO GO BACK TO "GALLERY" MODAL FROM "ADD PICTURE" MODAL
 **/
function addBackToGalleryModalListener() {
    const backToGalleryModalButton = document.querySelector(".button-back-gallery-modal")
    backToGalleryModalButton.addEventListener("click", function() {
        closeAddPictureModal()
        resetMiniatureGallery()
        resetPictureSubmit()
        galleryModal()
    })
}

/**
 * DISPLAYING A PREVIEW AFTER UPLOADING A PICTURE
 **/
function addPreviewListener() {
    const downloadPictureButton = document.querySelector(".download-picture-button")
    downloadPictureButton.addEventListener("change", function(event) {
        const pictureUpload = downloadPictureButton.files 
        if (pictureUpload) {
            const pictureSubmittingContainer = document.querySelector(".picture-submitting-container")
            pictureSubmittingContainer.innerHTML = ``
            const previewPicture = document.createElement("img")
            previewPicture.className = "preview-picture"
            previewPicture.src = URL.createObjectURL(event.target.files[0])
            pictureSubmittingContainer.appendChild(previewPicture)
        }
    })
}

/**
 * ADDING LISTENER TO SUBMIT NEW WORK THROUGH THE FORM
 **/
function addSubmitNewWorkListener() {
    /* Retrieving data from the form */
    const addedPictureTitleInput = document.querySelector("#title")
    const addedPictureCategoryInput = document.querySelector("#category")
    const submitPictureButton = document.querySelector(".submit-picture-button")
    submitPictureButton.addEventListener("click", function(event) {
        event.preventDefault()
        const category = 1 /* Value set for testing, to be modified */
        const picture = downloadPictureButton.files[0]
        /* Creating a formdata object */
        const formData = new FormData()
        formData.append("image", picture)
        formData.append("title", addedPictureTitleInput.value)
        formData.append("category", category)
        /* Sending the formdata */
        const request = new XMLHttpRequest()
        const token = localStorage.getItem("token")
        request.open("POST", "http://localhost:5678/api/works", true)
        request.setRequestHeader("Authorization", "Bearer "+ token)
        request.send(formData)
    })
}

/**
 * RESETTING THE PICTURE SUBMITTING CONTAINER TO DEFAULT
 * (deleting the preview and regenerating button)
 **/
function resetPictureSubmit() {
    const pictureSubmittingContainer = document.querySelector(".picture-submitting-container")
    pictureSubmittingContainer.innerHTML= `
        <img src="./assets/icons/picture.svg" alt="picture">
        <label class="download-picture-button-label">
            <input type="file" name="file" required class="download-picture-button" hidden></input>
            <p>+ Ajouter photo</p>
        </label>
        <p class="max-download-info">jpg, png : 4mo max</p>
        `
}

/**
 * CLOSING "ADD PICTURE" MODAL WINDOW
 **/
function closeAddPictureModal() {
    const addPictureModal = document.querySelector("#modal-add-picture")
    addPictureModal.style.display ="none"
}