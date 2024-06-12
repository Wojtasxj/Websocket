let userName = '';

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');
const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('newUser', (userName) => { 
  addMessage('Chat Bot', `${userName} has joined the conversation!`, 'italic');
});
socket.on('removeUser', (userName) => {
  addMessage('Chat Bot', `${userName} has left the conversation... :(`, 'italic');
});
socket.on('loginError', (error) => {
  alert(error);
});

// LOGIN FORM
loginForm.addEventListener('submit', login);

function login(event) {
  event.preventDefault();

  const userNameInputValue = userNameInput.value.trim();

  if (userNameInputValue === '') {
    alert('Please enter your username.');
  } else {
    userName = userNameInputValue;
    socket.emit('login', userName);

    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
}

// MESSAGE FORM
addMessageForm.addEventListener('submit', sendMessage);

function sendMessage(event) {
  event.preventDefault();

  const messageContent = messageContentInput.value.trim();

  if (messageContent === '') {
    alert('Please enter your message.');
  } else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent });
    messageContentInput.value = '';
  }
}

function addMessage(author, content, style = 'normal') {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content" style="font-style: ${style}">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}