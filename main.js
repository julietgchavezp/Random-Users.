const userList = document.getElementById('user-list');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const addBtn = document.getElementById('add-btn');

// Leer usuarios al cargar la página
document.addEventListener('DOMContentLoaded', getUsers);

// Agregar evento al botón "Agregar"
addBtn.addEventListener('click', addUser);

function getUsers() {
  // Hacer una solicitud GET a la API de Random User Generator para obtener 5 usuarios aleatorios
  fetch('https://randomuser.me/api/?results=5')
    .then(response => response.json())
    .then(data => {
      const users = data.results;
      
      users.forEach(user => {
        createUserCard(user);
      });
    })
    .catch(error => {
      console.log('Error al obtener los datos:', error);
    });
}

function createUserCard(user) {
  const userCard = document.createElement('li');
  userCard.classList.add('user-card');

  const name = document.createElement('h3');
  name.textContent = `${user.name.first} ${user.name.last}`;
  userCard.appendChild(name);

  const email = document.createElement('p');
  email.textContent = user.email;
  userCard.appendChild(email);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.addEventListener('click', () => deleteUser(userCard));
  userCard.appendChild(deleteBtn);

  userList.appendChild(userCard);
}

function addUser() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (name === '' || email === '') {
    alert('Por favor, ingresa un nombre y un correo electrónico.');
    return;
  }

  const newUser = {
    name: {
      first: name,
      last: '',
    },
    email: email,
  };

  createUserCard(newUser);

  nameInput.value = '';
  emailInput.value = '';
}

function deleteUser(userCard) {
  userList.removeChild(userCard);
}

