//Change page
function discussionsPage(){
    document.getElementById("profile").style.display = "none";
    document.getElementById("files").style.display = "none";
    document.getElementById("discussions").style.display = "block";
    const div = document.getElementById("discussionChat");
    div.scrollTop = div.scrollHeight - div.clientHeight;
}

function updateDisplayName() {
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            if (user !== null) {
                const photoURL = user.photoURL;
                const displayName = user.displayName;
                const email = user.email;
                
                if(displayName){
                    document.getElementById("chatInput").setAttribute("placeholder",displayName + ", Write a message!");
                }

                const uid = user.uid;
            }
        }
    });
}
updateDisplayName();

var chatInput = document.getElementById("chatInput");
chatInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        firebase.auth().onAuthStateChanged(function(user) {
            if(user){
                if (user !== null) {
                    const photoURL = user.photoURL;
                    const displayName = user.displayName;
                    const email = user.email;
                    
                    if(displayName && chatInput.value != ""){
                        firebase.database().ref('chats/').once('value', function(message_object){
                            var index = parseFloat(message_object.numChildren()) + 1
                            console.log(index);
                            firebase.database().ref('chats/' + `message_${index}`).set({
                              name: displayName,
                              message: chatInput.value,
                              index: index
                            });
                        })
                    }
                    else {
                        alert("A name or message is needed, when sending messages. Create name on the profiles page, and create a message in the field!")
                    }
        
                    const uid = user.uid;
                    chatInput.value = "";
                    const div = document.getElementById("discussionChat");
                    div.scrollTop = div.scrollHeight - div.clientHeight;
                }
            }
        });
    }
});

firebase.database().ref('chats/').on('value', function(messages_object){
    if(messages_object.numChildren() != 0){
        document.querySelectorAll("#messageItems").forEach(function(element){element.remove()});
        for (let i = 1; i < Object.values(messages_object.val()).length + 1; i++) {
            const chatMessage = eval(`messages_object.val().message_${i}.message`);
            const chatName = eval(`messages_object.val().message_${i}.name`);
            const message = document.createElement("div");
            message.id = "messageItems"
            message.innerHTML = `<div style='color: black; display: inline-block; text-align: start; margin: 10px; padding: 0px;'><p style='margin: 0px; padding: 0px;'><strong>${chatName}</strong></p><p style='font-size: 15px;'>${chatMessage}</+></div>`;
            document.getElementById("discussionChat").appendChild(message);
        }
        const div = document.getElementById("discussionChat");
        div.scrollTop = div.scrollHeight - div.clientHeight;
    }
})

// if(!document.getElementById("discussions").offsetWidth > 0 && !document.getElementById("discussions").offsetHeight > 0){
//     if(Notification.permission == "granted"){
//         const notiChatMessage = eval(`messages_object.val().message_${Object.values(messages_object.val()).length}.message`);
//         const chatName = eval(`messages_object.val().message_${Object.values(messages_object.val()).length}.name`);
//         var notification = new Notification(chatName, {
//             body: notiChatMessage
//         });
//         notification.onclick = function () {
//             window.focus();
//             discussionsPage();
//         };
//     }
//     else if(Notification.permission != "denied"){
//         Notification.requestPermission();
//     }
// }