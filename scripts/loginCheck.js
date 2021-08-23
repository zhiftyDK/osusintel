firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        document.body.style.display = "block";
    } else {
        location.replace("login.html");
    }
});

function signout(){
    firebase.auth().signOut();
}