let userName = '';

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

// LOGINFORM

loginForm.addEventListener('submit', login);

function login(event) {
  event.preventDefault();

  const userNameInput = document.querySelector('#username').value;

  if (userNameInput.trim() === '') {
    alert('Please enter your username.');
  } else {
    const userName = userNameInput;

    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
}

// MESSAGEFORM
addMessageForm.addEventListener('submit', sendMessage);

function sendMessage(event) {
  event.preventDefault();
  const messageContent = messageContentInput.value.trim();
  if (messageContent === '') {
    alert('Please enter your message.');
  } else {
    addMessage(userName, messageContent);
    messageContentInput.value = '';
  }
}

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
  }