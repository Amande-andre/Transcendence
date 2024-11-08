function shufflePlayer() {
    let listPlayer = Array.from(document.querySelectorAll('.player'));
    listPlayer = Array.from(listPlayer).map(input => input.value);
    for (let i = listPlayer.length - 1; i >= 0; i--) {
        if (listPlayer[i] === '')
            listPlayer[i] = 'Player' + (i + 1);
        }
    if (listPlayer.length % 2 !== 0) {
        for (let i = 0; i <  Math.log2(listPlayer.length); i++)
            listPlayer.push('IA');
    }
    for (let i = listPlayer.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [listPlayer[i], listPlayer[j]] = [listPlayer[j], listPlayer[i]];  // Échange des éléments
    }
    return listPlayer
}

            function sleep(ms) {
                console.log('sleep');
                return new Promise(resolve => setTimeout(resolve, ms));
            }

async function tournament(game, canvas) {
    nbPlayer = listPlayer.length;
    let round = nbPlayer / 2;
    let step = Math.log2(nbPlayer);
    const visualizer = new TournamentVisualizer(nbPlayer);
    for (let i = 0; i < step; i++) {
        console.log('step', i + 1);
        for (let j = 0; j < round; j++) {
            console.log('Round = ', i + 1);
            console.log('listPlayer = ', listPlayer);
            await game(j);
            //faut faire un truc du genre
            // await new Promise((resolve) => {
                // const continueButton = document.createElement('button');
                // continueButton.textContent = 'Continue';
                // continueButton.addEventListener('click', () => {
                    // continueButton.remove();
                    // resolve();
                // });
                // canvas.appendChild(continueButton);
            // });
            // je veux attendre ici que lutilisateur clic sur un bouton pour continuer
            console.log('listPlayer = ', listPlayer);
        }
        round /= 2;
    }
    console.log('jeu fini');
    console.log('canvas = ', canvas);
    canvas.remove();
}
