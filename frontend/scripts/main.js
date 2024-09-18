function main () {
    let pongButton = document.getElementById('PongButton');
    let breakoutButton = document.getElementById('BreakoutButton');
    let body = document.querySelector('body');
    canvas.classList.add('hidden');
    body.classList.remove('theme-game');
    body.classList.add('theme-home');
    let loginButton = document.getElementById('LoginButton');
   pongButton.addEventListener('click', () => {
        canvas.classList.remove('hidden');
        body.classList.remove('theme-home');
        body.classList.add('theme-game');
        startPong();
    });
    breakoutButton.addEventListener('click', () => {
        canvas.classList.remove('hidden');
        body.classList.remove('theme-home');
        body.classList.add('theme-game');
        startBreakout();
    });
    loginButton.addEventListener('click', () => {
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
        fetch('http://localhost:8080/api/pong/post/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Sami',
                score: 1000
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
    });

}

main();