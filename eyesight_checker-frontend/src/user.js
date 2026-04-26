class User {
    constructor(id, name, email){
        this.id = id;
        this.name = name; 
        this.email = email;
    }

    renderUser() {
        let usersDiv = document.getElementById("users-container")
        
        const userCard = document.createElement('div');
        userCard.className = 'user-card animate-fade-in';
        userCard.innerHTML = `
            <div class="user-info">
                <h4>${this.name}</h4>
                <p>${this.email}</p>
            </div>
            <button class="delete-bttn" data-id="${this.id}">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
            </button>
        `;
        
        userCard.querySelector('.delete-bttn').addEventListener('click', deleteUser);
        usersDiv.appendChild(userCard);
    }
}

const BASE_URL = 'http://127.0.0.1:3000'
let activeTestType = null; // Tracks which test the user is starting

function fetchUsers(){
    const usersContainer = document.getElementById("users-container");
    usersContainer.innerHTML = '<h2>ALL USERS</h2>';
    fetch(`${BASE_URL}/users`)
    .then(resp => resp.json())
    .then(users => {
        users.forEach(user => {
            let u = new User(user.id, user.name, user.email)
            u.renderUser();
        });
    })
}

function createForm(){
    let formContainer = document.getElementById("form-container")
    formContainer.innerHTML = `
    <form id="actual-user-form" class="modern-form">
        <div class="input-group">
            <input type="text" id="name" placeholder=" " required>
            <label for="name">User Name</label>
        </div>
        <div class="input-group">
            <input type="text" id="email" placeholder=" " required>
            <label for="email">Email Address</label>
        </div>
        <button type="submit" class="btn start-btn">Start Test Session</button>
    </form>
    `;
    
    document.getElementById("actual-user-form").addEventListener("submit", userFormSubmission);
    document.getElementById("form-back-btn").onclick = () => {
        gsap.to("#users-form", { opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => {
            document.getElementById("users-form").classList.add('hide');
            document.querySelector('.test-sections').classList.remove('hide');
            gsap.from(".test-sections", { opacity: 0, y: 20, duration: 0.4 });
        }});
    };
}

let users_id;
let users_name;

function userFormSubmission(event){
    event.preventDefault();
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value

    let user = { name, email }
    
    // Success animation and transition
    const usersForm = document.getElementById('users-form');
    const mainTest = document.getElementById("main-test");
    const mainTest2 = document.getElementById("main-test-2");

    // Add loading state
    const submitBtn = event.target.querySelector('button');
    submitBtn.innerText = "Initializing...";
    submitBtn.disabled = true;

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
        
        gsap.to(usersForm, { opacity: 0, scale: 1.1, duration: 0.4, onComplete: () => {
            usersForm.classList.add('hide');
            // Reset styles for next appearance without breaking CSS centering
            gsap.set(usersForm, { opacity: 1, scale: 1, clearProps: "transform" });
            
            const testSections = document.querySelector('.test-sections');
            const resultsContainer = document.getElementById('users-test-container');
            const allUsersContainer = document.getElementById('users-container');
            
            testSections.classList.remove('hide');
            resultsContainer.classList.add('hide'); // Hide results during test
            allUsersContainer.classList.add('hide'); // Hide users during test
            
            gsap.set(testSections, { opacity: 1, y: 0 });

            if (activeTestType === 2) {
                mainTest2.classList.remove('hide');
                mainTest.classList.add('hide');
                if (typeof startTest2 === 'function') startTest2(users_id, users_name);
                gsap.fromTo(mainTest2, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 });
            } else {
                mainTest.classList.remove('hide');
                mainTest2.classList.add('hide');
                if (typeof startTest === 'function') startTest(users_id, users_name);
                gsap.fromTo(mainTest, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 });
            }
        }});
    })
    .catch(err => {
        console.error(err);
        submitBtn.innerText = "Start Test Session";
        submitBtn.disabled = false;
    });
}

function deleteUser(event){
    const btn = event.target.closest('.delete-bttn');
    let userId = parseInt(btn.dataset.id)
    fetch(`${BASE_URL}/users/${userId}`, { method: 'DELETE' })
    gsap.to(btn.closest('.user-card'), { opacity: 0, x: 20, duration: 0.3, onComplete: () => {
        btn.closest('.user-card').remove();
    }});
}