document.getElementById("email").select();
var input1 = document.getElementById("email");
input1.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("login").click();
    }
});
var input2 = document.getElementById("password");
input2.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("login").click();
    }
});

document.getElementById("login").addEventListener("click", function(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user)
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                location.replace("devportal.html");
            }
        });
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("error-container").style.display = "block";
        document.getElementById("error").innerHTML = errorMessage;
    });
})