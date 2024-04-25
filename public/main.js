const socket = io()

const clientsTotal = document.getElementById('client-total')
const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
})

socket.on('clients-total', (data) => {
    clientsTotal.innerText = 'Total clients : ' + data
})

function sendMessage() {
    if(messageInput.value === '') return
    //console.log(messageInput.value)
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit('message', data)
    addMessageToUI(true, data)
    messageInput.value = ''
}

socket.on('chat-message', (data) => {
    console.log(data)
    addMessageToUI(false, data)
})

function addMessageToUI(isOwnMessage, data){
    clearFeedback()
    const element = `
    <li class="${isOwnMessage ? "message-right" : "message-left"}">
        <p class="message">
            ${data.message}
            <span> ${data.name} ${moment(data.dateTime).fromNow()}</span>
        </p>
    </li>
    `
    messageContainer.innerHTML += element
    scrollTOBottom()
}

function scrollTOBottom() {
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}

// // Function to handle file upload
// function uploadFiles() {
//     const fileInput = document.getElementById('fileInput');
//     const files = fileInput.files;

//     // Check if any files are selected
//     if (files.length === 0) {
//         alert('Please select a file');
//         return;
//     }

//     // Create a FormData object to send files to the server
//     const formData = new FormData();

//     // Append each selected file to the FormData object
//     for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         formData.append('files', file);
//     }

//     // Send a POST request to the server with the FormData containing the files
//     fetch('/upload', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => {
//         if (response.ok) {
//             alert('Files uploaded successfully');
//         } else {
//             throw new Error('Failed to upload files');
//         }
//     })
//     .catch(error => {
//         console.error('Error uploading files:', error);
//         alert('An error occurred while uploading files');
//     });
// }


messageInput.addEventListener('focus', (e) => {
    socket.emit('feedback', {
        feedback: `${nameInput.value} is typing`,
    })
 })
messageInput.addEventListener('keypress', (e) => { 
    socket.emit('feedback', {
        feedback: `${nameInput.value} is typing`,
    })
})
messageInput.addEventListener('blur', (e) => { 
    socket.emit('feedback', {
        feedback: '',
    })
})

socket.on('feedback', (data) => {
    clearFeedback()
    const element = `
    <li class="message-feedback">
        <p class="feedback" id="feedback">
        ${data.feedback}
        </p>    
    </li>
    `
    messageContainer.innerHTML += element
})
function clearFeedback(){
    document.querySelectorAll('li.message-feedback').forEach(element => {
        element.parentNode.removeChild(element)
    })
}