/** 
 * MEMO
 * email: sophie.bluel@test.tld
 * password: S0phie 
 * **/ 


/** 
 * Management of the login button actions
**/

/* Adding the listener */
const submitLoginButton = document.querySelector(".submit-login")
submitLoginButton.addEventListener("click", async function(event) {
    event.preventDefault()
    /* Retrieving the login values entered by the user */
    const loginCredentials =  {
        email : document.querySelector("[name=email]").value,
        password : document.querySelector("[name=password]").value
    }
    const loginCredentialsJSON = JSON.stringify(loginCredentials)
    /* Sending the login values to the server and stocking the answer */
    const loginServerResponse = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: loginCredentialsJSON
    })
    const loginResult = await loginServerResponse.json()
    const IdTokenValue = Object.values(loginResult)
    window.localStorage.setItem("userId", IdTokenValue[0])
    window.localStorage.setItem("token", IdTokenValue[1])
    /* Sending the user back to the homepage */
    /* window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html" */
})

