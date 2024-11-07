function shufflePlayer() {
    let listPlayer = Array.from(document.querySelectorAll('.player'));
    listPlayer = Array.from(listPlayer).map(input => input.value);
    for (let i = listPlayer.length - 1; i >= 0; i--) {
        if (listPlayer[i] === '')
            listPlayer[i] = 'Player' + (i + 1);
        }
    if (listPlayer.length % 2 !== 0)
        listPlayer.push('IA');
    console.log('listPlayer = ', listPlayer);
    for (let i = listPlayer.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [listPlayer[i], listPlayer[j]] = [listPlayer[j], listPlayer[i]];  // Échange des éléments
    }
    console.log('listPlayer = ', listPlayer);
    return listPlayer
}

async function tournament(game, canvas) {
    let round = listPlayer.length / 2;
    console.log('round = ', round);
    while (round > 0) {
        await game();
        round--;
    }
    console.log('jeu fini');
    console.log('canvas = ', canvas);
    canvas.remove();
}
