/** 
 * MEMO
 * email: sophie.bluel@test.tld
 * password: S0phie 
 * **/ 

/* CODE STARTING WHEN THE PAGE LOADS */
addLoginListener()

/**
 * ADDING LISTENER ON THE LOGIN SUBMIT BUTTON
 **/
function addLoginListener() {
    const submitLoginButton = document.querySelector(".submit-login")
    submitLoginButton.addEventListener("click", async function(event) {
        event.preventDefault()
        const loginCredentialsJSON = loginCredentialsRetrieval()
        const loginServerResponse = await sendLoginRequest(loginCredentialsJSON)
        loginAction(loginServerResponse)
    })
}

/**
 * RETRIEVES LOGIN INFORMATION FROM THE FORM AND RETURNS IT IN AN OBJECT
 * @return {Object} with two keys "email" and "password"
 **/
function loginCredentialsRetrieval() {
    const loginCredentials =  {
        email : document.querySelector("[name=email]").value,
        password : document.querySelector("[name=password]").value
    }
    const loginCredentialsJSON = JSON.stringify(loginCredentials)
    return loginCredentialsJSON
}

/**
 * SENDS A LOGIN REQUEST TO THE SERVER AND RETURNS THE RESPONSE
 * @param {String} loginCredentialsJSON string made from an object with two keys "email" and "password"
 * @return {Object} the server response
 **/
async function sendLoginRequest(loginCredentialsJSON) {
    const loginServerResponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: loginCredentialsJSON
        })
    return loginServerResponse
}


/**
 * PERFORMS THE LOGIN ACTION DEPENDING ON THE SERVER RESPONSE
 * if the server response is "not authorized" or "user not found", sends an error message to the user
 * if the server response id "connected", stores the values and redirecting to index.html
 * @param {Object} loginServerResponse the server response
 **/

function loginAction(loginServerResponse) {
    if (loginServerResponse.status !== 200) {
        if (loginServerResponse.status === 401 || loginServerResponse.status === 404) {
            alert("Identifiants incorrects")
        }
    }  else {
        const loginResult = loginServerResponse.json()
        const IdTokenValue = Object.values(loginResult)
        window.localStorage.setItem("userId", IdTokenValue[0])
        window.localStorage.setItem("token", IdTokenValue[1])
        window.location.href = "index.html"
    }
}