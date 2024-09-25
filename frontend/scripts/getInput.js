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
        // ici les donne sont recuperees
        if (isLogin) {
            console.log('Tentative de connexion:', { username, password });
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

document.addEventListener('DOMContentLoaded', function() {
    const pongButton = document.getElementById('PongButton');
    const breakoutButton = document.getElementById('BreakoutButton');
    const Container = document.getElementById('setGameContainer');
    const setPlayer = document.getElementById('setPlayer');
    let nbPlayer = document.getElementById('setPlayer');
    let namePlayer = document.getElementById('namePlayer');
    let colorPlayer = document.getElementById('colorPlayer');
    pongButton.addEventListener('click', function() {
        Container.classList.remove('d-none');
    });
    setPlayer.addEventListener('submit', function(e) {
        e.preventDefault();
        const   nbPlayer = document.getElementById('userGame').value;
        console.log({nbPlayer});
        Container.classList.add('d-none');
    });

    // breakoutButton.addEventListener('click', function() {
    //     Container.classList.remove('d-none');
    // });

});
