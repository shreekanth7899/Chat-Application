const socket = io()

socket.on('Clients-total', (data) => {
    console.log(data)
})