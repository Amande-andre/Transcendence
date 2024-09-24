document.addEventListener('DOMContentLoaded', function() {
    const authButton = document.getElementById('AuthButton');
    const authContainer = document.getElementById('authContainer');
    const authForm = document.getElementById('authForm');
    const authSubmit = document.getElementById('authSubmit');
    const toggleAuth = document.getElementById('toggleAuth');
    let isLogin = true;
    authButton.addEventListener('click', function() {
        authContainer.classList.toggle('d-none');
    });

    toggleAuth.addEventListener('click', function(e) {
        e.preventDefault();
        isLogin = !isLogin;
        updateAuthUI();
    });

    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (isLogin){
            // fetch('http://localhost:8080/api/pong/get/', {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // })
            // .then(response => response.json())
            // .then(data => {
            //     console.log(data);
            // })
            fetch('http://localhost:8080/api/pong/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })

            //console.log('Tentative de connexion:', { username, password });
            // Ajoutez ici la logique de connexion
        } else {
            console.log('Tentative d\'inscription:', { username, password });
            // Ajoutez ici la logique d'inscription
        }
    });

    function updateAuthUI() {
        authSubmit.textContent = isLogin ? 'Se connecter' : 'S\'inscrire';
        toggleAuth.textContent = isLogin ? 'S\'inscrire' : 'Se connecter';
    }
});