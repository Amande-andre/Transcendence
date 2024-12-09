let winner = 'player1';
let loser = 'player2';

function getCsrfToken() {
    const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrftoken='));
    return csrfToken ? csrfToken.split('=')[1] : null;
}

function postMatch(players, player1, player2, round) {
    score1 = players[player1.index].score[round];
    score2 = players[player2.index].score[round];
    bounce1 = player1.bounce
    bounce2 = player2.bounce
    bonusTaken1 = player1.bonusTaken;
    bonusTaken2 = player2.bonusTaken;
    name1 = players[player1.index].username;
    name2 = players[player2.index].username;
    const date = new Date();
    const dateTime = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    fetch('/saveMatch/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCsrfToken(),
        },
        body: JSON.stringify({
            player1: name1,
            player2: name2,
            score1: score1,
            score2: score2,
            bounce1: bounce1,
            bounce2: bounce2,
            bonus1: bonusTaken1,
            bonus2: bonusTaken2,
            dateTime: dateTime,

        }),
    })
        .then((response) => response.json())
        .then((data) => {
            //consol.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
