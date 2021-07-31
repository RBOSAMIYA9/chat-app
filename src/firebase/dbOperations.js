import { projectFirestore, timeStamp } from './firebaseConfig'

const addChatRoom = (roomName, createdBy) => {
    console.log(roomName, createdBy)
    const collectionRef = projectFirestore.collection("chatData");
    var data = {
        timeStamp: timeStamp(),
        createdBy: createdBy,
        roomName: roomName

    }
    collectionRef.add(data).then((ack) => {
        console.log("data added", ack);
    }).catch((e) => {
        console.log("error while adding data", e);
    })


}

const addMessage = (roomId, message, sender) => {
    // console.log(roomId, message, sender);
    const collectionRef = projectFirestore.collection("chatData");
    collectionRef.doc(roomId).collection('messages').add({
        message: message,
        sender: sender,
        timestamp: timeStamp()
    }).then((ack) => {
        console.log("message added", ack);
    }).catch((e) => {
        console.log("error", e);
    })
}


const deleteChatRoomById = (id) => {
    return new Promise((resolve, reject) => {
        console.log("id in delete", id);
        const collectionRef = projectFirestore.collection("chatData");
        collectionRef.doc(id).delete().then(() => {
            console.log("deleted chat room");
            resolve("deleted")
        }).catch((e) => reject("failed to delete"))
    })

}

export { addChatRoom, addMessage, deleteChatRoomById }