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
            const uid = user.uid;

            const photoURLRenderer = document.createElement("img");
            photoURLRenderer.src = photoURL;
            photoURLRenderer.style.width = "15vw"
            photoURLRenderer.id = "photoURLRenderer";
            document.getElementById("profileImage").appendChild(photoURLRenderer);
            document.getElementById("displayName").value = displayName;
            document.getElementById("showDisplayName").innerHTML = displayName;
            document.getElementById("userId").value = uid;
        }
    }
});

document.getElementById("imageUploadInput").onchange = function(event) {
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            const photoURL = user.photoURL;
            const displayName = user.displayName;
            const email = user.email;
            const uid = user.uid;
            console.log("." + document.getElementById("imageUploadInput").value.split(".").pop());
            var fileList = event.target.files;
            firebase.storage().ref().child("/profileImage/" + uid + "/" + uid + "." + document.getElementById("imageUploadInput").value.split(".").pop()).put(fileList[0]).then(function(snapshot){
                console.log("Image uploaded")
                firebase.storage().ref().child("/profileImage/" + uid + "/").listAll().then((res) => {
                    res.items.forEach((fileRef) => {
                        firebase.storage().ref().child("/" + fileRef._delegate._location.path_).delete().then(() => {
                            console.log("File Deleted")
                            importNewfile();
                        }).catch((error) => {
                            importNewfile();
                        });
                    });
                })
            })
            function importNewfile(){
                console.log("." + document.getElementById("imageUploadInput").value.split(".").pop());
                var fileList = event.target.files;
                firebase.storage().ref().child("/profileImage/" + uid + "/" + uid + "." + document.getElementById("imageUploadInput").value.split(".").pop()).put(fileList[0]).then(function(snapshot){
                    console.log("Image uploaded")
                    firebase.storage().ref().child("/profileImage/" + uid + "/").listAll().then((res) => {
                        res.items.forEach((fileRef) => {
                            fileRef.getDownloadURL().then(function(url){
                                user.updateProfile({
                                    photoURL: url
                                }).then(() => {
                                    document.getElementById("photoURLRenderer").remove();
                                    const photoURLRenderer = document.createElement("img");
                                    photoURLRenderer.src = url;
                                    photoURLRenderer.id = "photoURLRenderer";
                                    photoURLRenderer.style.width = "15vw"
                                    document.getElementById("profileImage").appendChild(photoURLRenderer);
                                })
                            })
                        });
                    })
                })   
            }

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