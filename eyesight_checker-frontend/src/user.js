class User {
    constructor(id, name, email){
        this.id = id;
        this.name = name; 
        this.email = email;
    }

    // render users instsnce methode
    renderUser() {
        let usersDiv = document.getElementById("users-container")
        
        usersDiv.innerHTML +=
        `
        <div>
        <h4> Name/Email:</h4>
        <ul>
            <li data-id=${this.id}> ${this.name} </li> 
            <li> ${this.email} </li>
        </ul> 
        <button class="delete-bttn" data-id=${this.id} onclick="deleteUser()">Delete User</button>
        </div>
        `
        usersDiv.addEventListener('dblclick', this.handleUserClick.bind(this))
        this.li = document.querySelector('li')
        this.li.addEventListener('blur', this.updateUser.bind(this), true)
    }

    // double click to edit
    handleUserClick(e){
        const li = e.target
        li.contentEditable = true
        li.focus()
        li.classList.add('editable')
    }

    updateUser(e) {
        const li = e.target
        li.contentEditable = false
        li.classList.remove('editable')
        const name = li.innerHTML
        const id = li.dataset.id
 
        fetchToUpdateUser(name, id)
    }
}

const BASE_URL = 'http://127.0.0.1:3000'

// #index
function fetchUsers(){
    fetch(`${BASE_URL}/users`)
    .then(resp => resp.json())
    .then(users => {
        for (const user of users){
            let u = new User(user.id, user.name, user.email)
            u.renderUser();
        }
    })
}
// #new user
function createForm(){
    let usersForm = document.getElementById("users-form")

    usersForm.innerHTML +=
    `
    <form>
        <input type="text" id="name" placeholder="User Name">
        <input type="text" id="email" placeholder="Email">
        <input type="submit" value="Create User">
    </form>
    `
    usersForm.addEventListener("submit", userFormSubmission)
}

let users_id;
let users_name;

function userFormSubmission(){
    event.preventDefault();
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value

    let user = {
        name: name,
        email: email
    }
    fetch(`${BASE_URL}/users`, { 
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(user => {
        users_id = user.id
        users_name = user.name
        let u = new User(user.id, user.name, user.email)
        u.renderUser();
        if (testContainerElement.classList.contains('hide')){ 
            testContainerElement.classList.remove('hide')
            usersFormElement.classList.add('hide')
            startTest(users_id, users_name) 
        } else {
            testContainerElement2.classList.remove('hide')
            usersFormElement.classList.add('hide')
            startTest2(users_id, users_name) 
        }
    })
}

// delete user
function deleteUser(){
    let userId = parseInt(event.target.dataset.id)
   
    fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE'
    })
    event.target.parentElement.remove() 
}

// update user
function fetchToUpdateUser(name, id) {

    let user = {
        name: name
        }
    fetch(`${BASE_URL}/users/${id}`, {    
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(resp => resp.json())
}