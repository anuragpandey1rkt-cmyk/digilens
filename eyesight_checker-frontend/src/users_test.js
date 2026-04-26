class UsersTest {
    constructor(id, test_name, test_result, user_id, users_name){
        this.id = id;
        this.test_name = test_name; 
        this.test_result = test_result;
        this.user_id = user_id;
        this.users_name = users_name;
    }

    // render usersTest instsnce methode
  
    renderUsersTest() {

        let usersTestDiv = document.getElementById("users-test-container")
        usersTestDiv.innerHTML +=
        `
        <div>
        <ul>
            <li>User name: ${this.users_name} </li> 
            <li>Test name: ${this.test_name} </li> 
            <li>Your score: ${this.test_result} </li>
        </ul> 
        <button class="delete-bttn" data-id=${this.id} onclick="deleteUsersTest()">Delete Test </button>
        </div>
        `
    }
}

// #index
function fetchUsers_Tests(){
    fetch(`${BASE_URL}/users_tests`)
    .then(resp => resp.json())
    .then(users_tests => {
        for (const users_test of users_tests){
            let ut = new UsersTest(users_test.id, users_test.test_name, users_test.test_result, users_test.user_id, users_test.users_name)
            ut.renderUsersTest();
        }
    })
}


function deleteUsersTest(){
    let usersTestId = parseInt(event.target.dataset.id)

    fetch(`${BASE_URL}/users_tests/${usersTestId}`, {
        method: 'DELETE'
    })
    event.target.parentElement.remove() 
}