//Change page
function filesPage(){
    document.getElementById("profile").style.display = "none";
    document.getElementById("files").style.display = "block";
    document.getElementById("discussions").style.display = "none";
}

//Load all files
loadFiles();

function deleteFiles(file){
    firebase.storage().ref().child("/" + file).delete().then(() => {
        console.log("File Deleted!")
        loadFiles();
    }).catch((error) => {
        console.log(error);
    });
}

function loadFiles(){
    document.querySelectorAll("#fileItems").forEach(function(element){element.remove()});
    firebase.storage().ref().child('/').listAll()
    .then((res) => {
        res.items.forEach((fileRef) => {
            fileRef.getDownloadURL().then(function(url){
                console.log(url);
                const file = document.createElement("a");
                file.href = url;
                file.id = "fileItems"
                file.target = "_blank";
                if(url.includes("png")){
                    file.innerHTML = `<div class='p-2' style='color: black; display: inline-block; text-align: center; margin: 10px;'><h1><i class="far fa-image"></i></h1><h5 style='font-size: 10px;'><strong>${fileRef._delegate._location.path_}</strong></h5><a href='javascript:deleteFiles("${fileRef._delegate._location.path_}")' style='text-decoration: none;'><h5 style='font-size: 10px; color: red;' onmouseover='this.style.color = "darkred"' onmouseout='this.style.color = "red"'><strong>Delete</strong></h5></a></div>`;
                }
                if(url.includes("jpg")){
                    file.innerHTML = `<div class='p-2' style='color: black; display: inline-block; text-align: center; margin: 10px;'><h1><i class="far fa-image"></i></h1><h5 style='font-size: 10px;'><strong>${fileRef._delegate._location.path_}</strong></h5><a href='javascript:deleteFiles("${fileRef._delegate._location.path_}")' style='text-decoration: none;'><h5 style='font-size: 10px; color: red;' onmouseover='this.style.color = "darkred"' onmouseout='this.style.color = "red"'><strong>Delete</strong></h5></a></div>`;
                }
                if(url.includes("jpeg")){
                    file.innerHTML = `<div class='p-2' style='color: black; display: inline-block; text-align: center; margin: 10px;'><h1><i class="far fa-image"></i></h1><h5 style='font-size: 10px;'><strong>${fileRef._delegate._location.path_}</strong></h5><a href='javascript:deleteFiles("${fileRef._delegate._location.path_}")' style='text-decoration: none;'><h5 style='font-size: 10px; color: red;' onmouseover='this.style.color = "darkred"' onmouseout='this.style.color = "red"'><strong>Delete</strong></h5></a></div>`;
                }
                if(url.includes("gif")){
                    file.innerHTML = `<div class='p-2' style='color: black; display: inline-block; text-align: center; margin: 10px;'><h1><i class="far fa-image"></i></h1><h5 style='font-size: 10px;'><strong>${fileRef._delegate._location.path_}</strong></h5><a href='javascript:deleteFiles("${fileRef._delegate._location.path_}")' style='text-decoration: none;'><h5 style='font-size: 10px; color: red;' onmouseover='this.style.color = "darkred"' onmouseout='this.style.color = "red"'><strong>Delete</strong></h5></a></div>`;
                }
                if(url.includes("pdf")){
                    file.innerHTML = `<div class='p-2' style='color: black; display: inline-block; text-align: center; margin: 10px;'><h1><i class="far fa-file-pdf"></i></h1><h5 style='font-size: 10px;'><strong>${fileRef._delegate._location.path_}</strong></h5><a href='javascript:deleteFiles("${fileRef._delegate._location.path_}")' style='text-decoration: none;'><h5 style='font-size: 10px; color: red;' onmouseover='this.style.color = "darkred"' onmouseout='this.style.color = "red"'><strong>Delete</strong></h5></a></div>`;
                }
                if(url.includes("rtf")){
                    file.innerHTML = `<div class='p-2' style='color: black; display: inline-block; text-align: center; margin: 10px;'><h1><i class="far fa-file-word"></i></h1><h5 style='font-size: 10px;'><strong>${fileRef._delegate._location.path_}</strong></h5><a href='javascript:deleteFiles("${fileRef._delegate._location.path_}")' style='text-decoration: none;'><h5 style='font-size: 10px; color: red;' onmouseover='this.style.color = "darkred"' onmouseout='this.style.color = "red"'><strong>Delete</strong></h5></a></div>`;
                }
                if(url.includes("docx")){
                    file.innerHTML = `<div class='p-2' style='color: black; display: inline-block; text-align: center; margin: 10px;'><h1><i class="far fa-file-word"></i></h1><h5 style='font-size: 10px;'><strong>${fileRef._delegate._location.path_}</strong></h5><a href='javascript:deleteFiles("${fileRef._delegate._location.path_}")' style='text-decoration: none;'><h5 style='font-size: 10px; color: red;' onmouseover='this.style.color = "darkred"' onmouseout='this.style.color = "red"'><strong>Delete</strong></h5></a></div>`;
                }
                if(url.includes("pptx")){
                    file.innerHTML = `<div class='p-2' style='color: black; display: inline-block; text-align: center; margin: 10px;'><h1><i class="far fa-file-powerpoint"></i></h1><h5 style='font-size: 10px;'><strong>${fileRef._delegate._location.path_}</strong></h5><a href='javascript:deleteFiles("${fileRef._delegate._location.path_}")' style='text-decoration: none;'><h5 style='font-size: 10px; color: red;' onmouseover='this.style.color = "darkred"' onmouseout='this.style.color = "red"'><strong>Delete</strong></h5></a></div>`;
                }
                if(url.includes("xlsx")){
                    file.innerHTML = `<div class='p-2' style='color: black; display: inline-block; text-align: center; margin: 10px;'><h1><i class="far fa-file-excel"></i></h1><h5 style='font-size: 10px;'><strong>${fileRef._delegate._location.path_}</strong></h5><a href='javascript:deleteFiles("${fileRef._delegate._location.path_}")' style='text-decoration: none;'><h5 style='font-size: 10px; color: red;' onmouseover='this.style.color = "darkred"' onmouseout='this.style.color = "red"'><strong>Delete</strong></h5></a></div>`;
                }
                if(url.includes("txt")){
                    file.innerHTML = `<div class='p-2' style='color: black; display: inline-block; text-align: center; margin: 10px;'><h1><i class="far fa-file-alt"></i></h1><h5 style='font-size: 10px;'><strong>${fileRef._delegate._location.path_}</strong></h5><a href='javascript:deleteFiles("${fileRef._delegate._location.path_}")' style='text-decoration: none;'><h5 style='font-size: 10px; color: red;' onmouseover='this.style.color = "darkred"' onmouseout='this.style.color = "red"'><strong>Delete</strong></h5></a></div>`;
                }
                if(url.includes("mp3")){
                    file.innerHTML = `<div class='p-2' style='color: black; display: inline-block; text-align: center; margin: 10px;'><h1><i class="far fa-file-audio"></i></h1><h5 style='font-size: 10px;'><strong>${fileRef._delegate._location.path_}</strong></h5><a href='javascript:deleteFiles("${fileRef._delegate._location.path_}")' style='text-decoration: none;'><h5 style='font-size: 10px; color: red;' onmouseover='this.style.color = "darkred"' onmouseout='this.style.color = "red"'><strong>Delete</strong></h5></a></div>`;
                }
                if(url.includes("mp4")){
                    file.innerHTML = `<div class='p-2' style='color: black; display: inline-block; text-align: center; margin: 10px;'><h1><i class="far fa-file-video"></i></h1><h5 style='font-size: 10px;'><strong>${fileRef._delegate._location.path_}</strong></h5><a href='javascript:deleteFiles("${fileRef._delegate._location.path_}")' style='text-decoration: none;'><h5 style='font-size: 10px; color: red;' onmouseover='this.style.color = "darkred"' onmouseout='this.style.color = "red"'><strong>Delete</strong></h5></a></div>`;
                }
                if(url.includes("mov")){
                    file.innerHTML = `<div class='p-2' style='color: black; display: inline-block; text-align: center; margin: 10px;'><h1><i class="far fa-file-video"></i></h1><h5 style='font-size: 10px;'><strong>${fileRef._delegate._location.path_}</strong></h5><a href='javascript:deleteFiles("${fileRef._delegate._location.path_}")' style='text-decoration: none;'><h5 style='font-size: 10px; color: red;' onmouseover='this.style.color = "darkred"' onmouseout='this.style.color = "red"'><strong>Delete</strong></h5></a></div>`;
                }
                if(url.includes("zip")){
                    file.innerHTML = `<div class='p-2' style='color: black; display: inline-block; text-align: center; margin: 10px;'><h1><i class="far fa-file-archive"></i></h1><h5 style='font-size: 10px;'><strong>${fileRef._delegate._location.path_}</strong></h5><a href='javascript:deleteFiles("${fileRef._delegate._location.path_}")' style='text-decoration: none;'><h5 style='font-size: 10px; color: red;' onmouseover='this.style.color = "darkred"' onmouseout='this.style.color = "red"'><strong>Delete</strong></h5></a></div>`;
                }
                document.getElementById("filestorage").appendChild(file);
            })
        });
    }).catch((error) => {
        console.log(error);
    });
}

document.getElementById("fileUploadInput").onchange = function(event) {
    document.getElementById("uploadMessage").style.display = "none";
    console.log("." + document.getElementById("fileUploadInput").value.split(".").pop());
    console.log(event.target.files);
    var fileList = event.target.files;
    var uploadTask = firebase.storage().ref().child("/" + document.getElementById("fileUploadInput").value.split(/(\\|\/)/g).pop()).put(fileList[0])
    uploadTask.on("state_changed",
        function progress(snapshot){
            var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            document.getElementById("progressbar").style.display = "block";
            document.getElementById("progressbar").value = percentage;
        },

        function error(err){
            document.getElementById("progressbar").style.display = "none";
            document.getElementById("uploadMessage").style.display = "flex";
            document.getElementById("uploadMessage").style.color = "red";
            document.getElementById("uploadMessage").innerHTML = err;
            
        },

        function complete(){
            document.getElementById("progressbar").style.display = "none";
            document.getElementById("uploadMessage").style.display = "flex";
            document.getElementById("uploadMessage").style.color = "#00ff00";
            document.getElementById("uploadMessage").innerHTML = "Complete";
            loadFiles();
        }
    );
}