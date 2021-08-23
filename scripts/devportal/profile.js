//Change page
function profilePage(){
    document.getElementById("profile").style.display = "block";
    document.getElementById("files").style.display = "none";
    document.getElementById("discussions").style.display = "none";
}

firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        if (user !== null) {
            const photoURL = user.photoURL;
            const displayName = user.displayName;
            const email = user.email;

            if(photoURL){
                const photoURLRenderer = document.createElement("img");
                photoURLRenderer.src = user.photoURL;
                photoURLRenderer.style.width = "15vw"
                photoURLRenderer.id = "photoURLRenderer";
                document.getElementById("profileImage").appendChild(photoURLRenderer);
                document.getElementById("imageUrl").value = user.photoURL;
            }
            
            if(displayName){
                document.getElementById("displayName").value = displayName;
                document.getElementById("showDisplayName").innerHTML = displayName;
            }

            const uid = user.uid;
        }
    }
});

function changeUrl(){
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            user.updateProfile({
                photoURL: document.getElementById("imageUrl").value
            }).then(() => {
                console.log("SUCCESS Image Url");
            }).catch((error) => {
                console.log(error);
            }); 

            document.getElementById("photoURLRenderer").remove();
            const photoURLRenderer = document.createElement("img");
            photoURLRenderer.src = document.getElementById("imageUrl").value;
            photoURLRenderer.id = "photoURLRenderer";
            photoURLRenderer.style.width = "15vw"
            document.getElementById("profileImage").appendChild(photoURLRenderer);
            document.getElementById("imageUrl").value = user.photoURL;
        
            const uid = user.uid;
            
        }
    });
}

function changeDisplayName(){
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            user.updateProfile({
                displayName: document.getElementById("displayName").value
            }).then(() => {
                console.log("SUCCESS Display Name");
                document.getElementById("showDisplayName").innerHTML = document.getElementById("displayName").value;
                updateDisplayName();
            }).catch((error) => {
                console.log(error);
            });

            const uid = user.uid;
        }
    });
}

function deleteUser(){
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            user.delete().then(() => {
                location.replace("login.html");
            }).catch((error) => {
                console.log(error);
            });
            const uid = user.uid;
        }
    });
}