let winner = 'player1';
let loser = 'player2';

function getCsrfToken() {
    const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrftoken='));
    return csrfToken ? csrfToken.split('=')[1] : null;
}

function sendData() {
    fetch('/saveMatch/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCsrfToken(),
        },
        body: JSON.stringify({
            'winner': winner,
            'loser': loser,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

sendData();