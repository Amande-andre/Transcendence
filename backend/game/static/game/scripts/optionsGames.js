let playerCount = 2;
const maxPlayers = 8;

function addPlayer() {
	if (playerCount < maxPlayers) {
		playerCount++;
		const playerContainer = document.getElementById('players-container');
		const newPlayerDiv = document.createElement('div');
		newPlayerDiv.className = 'player-input mb-3';
		newPlayerDiv.innerHTML = `
			<div class="input-group">
				<span class="input-group-text">Player ${playerCount}</span>
				<input type="text" class="form-control" placeholder="Player name">
				<input type="color" class="form-control form-control-color" value="#${Math.floor(Math.random()*16777215).toString(16)}" title="Choisir la couleur">
			</div>
		`;
		playerContainer.appendChild(newPlayerDiv);
	}
}

function removePlayer() {
	if (playerCount > 2) {
		const playerContainer = document.getElementById('players-container');
		playerContainer.removeChild(playerContainer.lastChild);
		playerCount--;
	}
}

// window.addEventListener('resize', function() {
//     var switchElement = document.getElementById('bonusSwitch');
//     var scaleValue = window.innerWidth / 1000;  // Ajuste ce facteur comme tu le souhaites
//     switchElement.style.transform = 'scale(' + scaleValue + ')';
// });

