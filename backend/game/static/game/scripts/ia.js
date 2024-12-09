// IA BREAKOUT
function calculePositionsBr(player) {
    let x = player.balls[0].x;
    let y = player.balls[0].y;
    let mid = player.paddles[0].x + 50;
    let speedX = player.balls[0].speedX;
    let speedY = player.balls[0].speedY;
    
    if (player.paddles[0].x >= (WIDTH / 2)){
        if (speedY > 0){
            for (i = y; i < HEIGHT; i+= speedY){
                y += speedY;
                if (x >= WIDTH || x <= WIDTH / 2){
                    speedX = speedX * -1;
                    //speedY = speedY * -1;
                }
                x += speedX;
            }
            player.distance = Math.abs(mid - x);    
        }
        else {
            player.distance = -1;
        }
    }
    else {
        if (speedY > 0){
            for (i = y; i < HEIGHT; i += speedY){
                y += speedY;
                if (x >= WIDTH / 2 || x <= 0){
                    speedX = speedX * -1;
                    //speedY = speedY * -1;
                }
                x += speedX;
            }
            player.distance = Math.abs(mid - x);
        }
        else {
            player.distance = -1;
        }
    }
    player.nextPose = x;
    return x;
}

function choiceIa(player, nb) {
    
    //faire les calcule de diff avant et toujours comparer entre un scope ex si >40 et <400 par exemple
    let halfP = player.paddles[0].height / 2;
    let mid = player.paddles[0].x + 50;
    let left = player.paddles[0].x;
    let right = player.paddles[0].x + 100; //player.paddles[0].width; === 100
    let ball = player.balls[0].x;

    //regarde si la balle est a droite si oui il se place au milieu
    player.nextPose = calculePositionsBr(player);
    if (player.distance <= 50){
        // player.lastInput = null;
        return null;
    }
    if (player.nextPose > mid){
        if (player.paddles[0].x >= (WIDTH / 2))
            player.lastInput = '3';
        else
            player.lastInput = 'd';
    }
    else if (player.nextPose < mid){
        if (player.paddles[0].x >= (WIDTH / 2))
            player.lastInput = '1';
        else
            player.lastInput = 'a';
    }
    
    return player.lastInput;
}

function IaControle(player, nb) {
    
    if (!player.isIa)
        return;
    let eventup = new KeyboardEvent('keyup', {
        key: player.lastInput,
    });
    player.second = new Date().getSeconds();
    if (Math.abs(player.nextPose - player.paddles[0].midl) <= 50 /* && player.distance >=0 */){
        //player.nextPose + Math.abs(player.paddles[0].midlPong)
        document.dispatchEvent(eventup);
    }
    if (player.second === player.past){ 
        return;
    }
    document.dispatchEvent(eventup); 
    player.past = player.second;
    let eventTab;
    eventTab = choiceIa(player, nb);
    let eventdown = new KeyboardEvent('keydown', {
        key: eventTab,
    });
    document.dispatchEvent(eventdown);
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
        for (i = x; x > 0; i -= speedX){
            x += speedX;
            y += speedY;
            if (y >= HEIGHT || y <= 0){
                speedY = speedY * -1;
            }
        }
    }
    else {
        for (i = x; x < (WIDTH); i += speedX){
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

    if (player.paddles[0].x <= 50){
        if (player.balls[0].speedX < 0){       
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
                player.lastInput = null;
            }
            player.distance = player.distance / 300 * 1000;
            return player.lastInput;
        }
    }
    else {

        if (player.balls[0].speedX > 0){
            if (pos > bot){
                player.distance = pos - bot;
                player.lastInput = '2';
            }
            else if (pos < top){
                player.distance = top - pos;
                player.lastInput = '5';
            }
            else {
                player.distance = 0;
                player.lastInput = null;
            }
            player.distance = player.distance / 300 * 1000;
            return player.lastInput;
        }
    }
    
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
    if (eventTab === null){
        return;
    }
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