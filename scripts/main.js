function main () {
    let pongButton = document.getElementById('PongButton');
    let breakoutButton = document.getElementById('BreakoutButton');

   // pongButton.addEventListener('click', () => {
   //     startPong();
   // });
    breakoutButton.addEventListener('click', () => {
        startBreakout();
    });
}

main();