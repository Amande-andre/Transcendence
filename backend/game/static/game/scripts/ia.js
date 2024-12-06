// IA BREAKOUT
function calculePositionsBr(player) {
    let x = player.balls[0].x;
    let y = player.balls[0].y;
    let speedX = player.balls[0].speedX;
    let speedY = player.balls[0].speedY;
    if (speedY > 0){
        for (i = y; i > 0; i-=5){
            x += speedX;
            y += speedY;
            if (x >= WIDTH || x <= 0){
                speedX = speedX * -1;
                //speedY = speedY * -1;
            }
        }
    }
    return x;
}

function choiceIa(player, nb)  {
        
    //faire les calcule de diff avant et toujours comparer entre un scope ex si >40 et <400 par exemple
    let halfP = player.paddles[0].height / 2;
    let mid = player.paddles[0].midlPong;
    let left = player.paddles[0].x;
    let right = player.paddles[0].x + player.paddles[0].height;
    let ball = player.balls[0].x;
    //regarde si la balle est a droite si oui il se place au milieu
    let pos = calculePositionsBr(player);
    // console.log('pos == ', pos);
    // console.log('left == ', left);
    // console.log('right == ', right);
    if (player.balls[0].speedX > 0){
        if (pos > right){
            player.distance = pos - right;
            player.lastInput = 'd';
        }
        else if (pos < left){
            player.distance = left - pos;
            player.lastInput = 'a';
        }
        player.distance = (player.distance / 300) * 500;
    }
    else if (player.balls[0].speedX < 0){
        if (ball > right){
            player.distance = pos - mid;
            player.lastInput = 'd';
        }
        else if (ball < left){
            player.distance = mid - pos;
            player.lastInput = 'a';
        }
        player.distance = (player.distance / 300) * 250;
    }
    else{
            player.distance = 0;
            return null;
    }
    return player.lastInput;
}

function IaControle(player, nb) {
    
    if (!player.isIa)
        return;
    player.second = new Date().getSeconds();
    if (player.second === player.past){ 
        return;
    }
    // console.log('player.second == ', player.second);
    let eventup = new KeyboardEvent('keyup', {
        key: player.lastInput,
    });
    document.dispatchEvent(eventup);
    // 
    player.past = player.second;
    let eventTab = choiceIa(player, nb);
    if (eventTab === null){
        
        return;
    }
    otherevent = eventTab === 'a' ? 'd' : 'a';
    // document.dispatchEvent(player.lastInput);
    let eventdown = new KeyboardEvent('keydown', {
        key: eventTab,
    });
    //document.dispatchEvent(eventup);
    document.dispatchEvent(eventdown);
    setTimeout(() => {
        // console.log('player.distance == ', player.distance);
        //0.3 j avance de 160
        document.dispatchEvent(eventup);
    }, player.distance);
    // console.log('====================');
}

// IA PONG
function calculePositions(player) {
    let mid = player.paddles[0].midlPong;
    let ball = player.balls[0].x;
    let x = player.balls[0].x;
    let y = player.balls[0].y;
    let speedX = player.balls[0].speedX;
    let speedY = player.balls[0].speedY;

    if (speedX < 0){
        for (i = x; x > 0; i-=5){
            x += speedX;
            y += speedY;
            if (y >= HEIGHT || y <= 0){
                speedY = speedY * -1;
            }
        }
    }
    else {
        for (i = x; x < (WIDTH / 2) - 20 ; i++){
            x += speedX;
            y += speedY;
            if (y >= HEIGHT || y <= 0){
                speedY = speedY * -1;
            }
        }
    }
    return y;
}

function choiceIaPong(player)  {
        
    //faire les calcule de diff avant et toujours comparer entre un scope ex si >40 et <400 par exemple
    let halfP = player.paddles[0].height / 2;
    let top = player.paddles[0].y;
    let bot = player.paddles[0].y + player.paddles[0].height;
    //regarde si la balle est a droite si oui il se place au milieu
    let pos = calculePositions(player);
    if (player.balls[0].speedX < 0){
        // console.log('pos == ', pos);
        // console.log('bot == ', bot);
        // console.log('top == ', top);        
        if (pos > bot){
            player.distance = pos - bot;
            player.lastInput = 's';
        }
        else if (pos < top){
            player.distance = top - pos;
            player.lastInput = 'w';
        }
        else {
            player.distance = 0;
            return null;
        }

        player.distance = player.distance / 300 * 1000;
        return player.lastInput;
    }
    
    // else if (player.balls[0].speedX > 0 && player.balls[0].x < WIDTH / 2){
    //     if (mid + 100 > HEIGHT / 2){
    //         player.distance = 100;
    //         return 'w';
    //     }
    //     else if (mid - 100 < HEIGHT / 2) {
    //         player.distance = 100;
    //         return 's';
    //     }
    // }
    player.distance = 0;

    return null;
}

function IaControlePong(player, nb) {
    
    if (!player.isIa)
        return;
    player.second = new Date().getSeconds();
    if (player.second === player.past){ 
        return;
    }
    let eventup = new KeyboardEvent('keyup', {
        key: player.lastInput,
    });
    document.dispatchEvent(eventup);
    // 
    player.past = player.second;
    let eventTab = choiceIaPong(player, nb);
    // console.log('====================');
    if (eventTab === null){
        
        return;
    }
    otherevent = eventTab === 'w' ? 's' : 'w';
    let eventdown = new KeyboardEvent('keydown', {
        key: eventTab,
    });
    document.dispatchEvent(eventdown);
    if (player.distance < 500){
        if (player.distance < 50)
            player.distance += 50;
        setTimeout(() => {
            document.dispatchEvent(eventup);
        }, player.distance);
    }
}

// BOTH IA
function isIa(player) {
    if (player)
        return true;
    return false;
}