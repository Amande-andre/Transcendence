
function addPlayer() {
	const maxPlayers = 8;
	let playerCount = document.querySelectorAll('.player').length;
	const playerContainer = document.getElementById('players-container');
	if (playerCount < maxPlayers) {
		const newPlayerDiv = document.createElement('div');
		newPlayerDiv.className = 'player-input mb-3';
		newPlayerDiv.innerHTML = `
			<div class="input-group">
				<span class="input-group-text">Player ${playerCount + 1}</span>
				<input type="text" class="player" class="form-control" placeholder="Player name">
				<input type="color" class="form-control form-control-color" value="#${Math.floor(Math.random()*16777215).toString(16)}" title="Choisir la couleur">
			</div>
		`;
		playerContainer.appendChild(newPlayerDiv);
	}
}

function removePlayer() {
	let playerCount = document.querySelectorAll('.player').length
	if (playerCount > 2) {
		const playerContainer = document.getElementById('players-container');
		playerContainer.removeChild(playerContainer.lastChild);
	}
}

// window.addEventListener('resize', function() {
//     var switchElement = document.getElementById('bonusSwitch');
//     var scaleValue = window.innerWidth / 1000;  // Ajuste ce facteur comme tu le souhaites
//     switchElement.style.transform = 'scale(' + scaleValue + ')';
// });

