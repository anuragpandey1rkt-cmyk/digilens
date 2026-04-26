class UsersTest {
    constructor(id, test_name, test_result, user_id, users_name){
        this.id = id;
        this.test_name = test_name; 
        this.test_result = test_result;
        this.user_id = user_id;
        this.users_name = users_name;
    }

    renderUsersTest() {
        let usersTestDiv = document.getElementById("users-test-container")
        
        const testCard = document.createElement('div');
        testCard.className = 'test-result-card animate-fade-in';
        testCard.innerHTML = `
            <div class="test-header">
                <span class="test-type">${this.test_name}</span>
                <button class="delete-test-btn" data-id="${this.id}">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
                </button>
            </div>
            <div class="test-body">
                <div class="user-info">
                    <span class="label">Patient:</span>
                    <span class="value">${this.users_name}</span>
                </div>
                <div class="score-display">
                    <span class="score-label">Result Score</span>
                    <span class="score-value">${this.test_result}</span>
                </div>
            </div>
        `;
        
        testCard.querySelector('.delete-test-btn').addEventListener('click', deleteUsersTest);
        usersTestDiv.appendChild(testCard);
    }
}

function fetchUsers_Tests(){
    const container = document.getElementById("users-test-container");
    container.innerHTML = `
        <div class="container-header">
            <h2>TEST RESULTS HISTORY</h2>
        </div>
    `;
    fetch(`${BASE_URL}/users_tests`)
    .then(resp => resp.json())
    .then(users_tests => {
        users_tests.reverse().forEach(users_test => {
            let ut = new UsersTest(users_test.id, users_test.test_name, users_test.test_result, users_test.user_id, users_test.users_name)
            ut.renderUsersTest();
        });
    })
}

function deleteUsersTest(event){
    const btn = event.target.closest('.delete-test-btn');
    let usersTestId = parseInt(btn.dataset.id)

    fetch(`${BASE_URL}/users_tests/${usersTestId}`, {
        method: 'DELETE'
    })
    
    gsap.to(btn.closest('.test-result-card'), {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        onComplete: () => {
            btn.closest('.test-result-card').remove();
        }
    });
}