const socket = io('https://nodeserver-o1v4.onrender.com')

const form = document.getElementById('send-box')
const input = document.getElementById('message-input')
const msgContainer = document.querySelector('.container')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = input.value;
    append(`You : ${message}` , 'right');
    socket.emit('send' , message);
    input.value = '';
})

const append = (message , position)=>{
    const msgElement = document.createElement('div');
    msgElement.innerHTML = message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    msgContainer.append(msgElement);

}
const name = prompt("Enter your name to join chat");

socket.emit('new-user-joined' , name);

socket.on('user-joined' , (name) =>{
   append(`${name} joined the chat`,'right')
})

socket.on('receive', data=>{
    append(`${data.user} : ${data.message}` , 'left');
    
})
socket.on('left', name=>{
    append(`${name} left the chat` , 'left');
    
})
