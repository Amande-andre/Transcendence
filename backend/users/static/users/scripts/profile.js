const parties = [
	{nom1: "Titouin", score1: 3, resultat: "Victoire", score2: 2, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 3, resultat: "Victoire", score2: 2, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 2, resultat: "Defaite", score2: 3, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 3, resultat: "Victoire", score2: 1, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 3, resultat: "Defaite", score2: 2, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 1, resultat: "Defaite", score2: 3, nom2: "P.Diddy"},
    {nom1: "Titouin", score1: 3, resultat: "Victoire", score2: 2, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 3, resultat: "Victoire", score2: 2, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 2, resultat: "Defaite", score2: 3, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 3, resultat: "Victoire", score2: 1, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 3, resultat: "Defaite", score2: 2, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 1, resultat: "Defaite", score2: 3, nom2: "P.Diddy"},
    {nom1: "Titouin", score1: 3, resultat: "Victoire", score2: 2, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 3, resultat: "Victoire", score2: 2, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 2, resultat: "Defaite", score2: 3, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 3, resultat: "Victoire", score2: 1, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 3, resultat: "Defaite", score2: 2, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 1, resultat: "Defaite", score2: 3, nom2: "P.Diddy"},
	{nom1: "Titouin", score1: 3, resultat: "Victoire", score2: 1, nom2: "P.Diddy"},
];

win = 0;
lose = 0;
match = 0;

function afficherHistorique() {
    const historiqueDiv = document.getElementById('historique');
    historiqueDiv.innerHTML = '';

    parties.forEach(partie => {
        const result = document.createElement('div');
        result.className = 'result-item d-flex justify-content-between align-items-center';

		if (partie.resultat === "Victoire") {
            result.classList.add('victoire');
            win++;
            match++;
        } else if (partie.resultat === "Defaite") {
            result.classList.add('defaite');
            lose++;
            match++;
        }

        const nom1 = document.createElement('div');
        nom1.className = 'player-name left';
        nom1.textContent = partie.nom1 + ' - ' + partie.score1;

        const vs = document.createElement('div');
        vs.className = 'vs';
        vs.textContent = 'vs';

        const nom2 = document.createElement('div');
        nom2.className = 'player-name right';
        nom2.textContent = partie.score2 + ' - ' + partie.nom2;

        result.appendChild(nom1);
        result.appendChild(vs);
        result.appendChild(nom2);
        
        historiqueDiv.appendChild(result);
    });
}

afficherHistorique();

function changeImage(newSrc) {
    const imgElement = document.getElementById('profileImage');
    imgElement.src = newSrc;
}



let winElement = document.getElementById('win');
winElement.innerText = win;

let loseElement = document.getElementById('lose');
loseElement.innerText = lose;

let matchElement = document.getElementById('matchs');
matchElement.innerText = match;


function editPseudo() {
    var pseudoDiv = document.getElementById("pseudo");
    var pseudoInput = document.getElementById("pseudo-input");

    // Fixer explicitement la largeur de l'input pour éviter les sauts
    pseudoInput.style.width = pseudoDiv.offsetWidth + "px";

    // Masquer la div et afficher l'input
    pseudoDiv.style.display = "none";
    pseudoInput.style.display = "block";
    pseudoInput.focus();
}

function savePseudo() {
    var pseudoDiv = document.getElementById("pseudo");
    var pseudoInput = document.getElementById("pseudo-input");

    // Sauvegarder le texte et revenir à l'affichage de la div
    pseudoDiv.textContent = pseudoInput.value;

    // Masquer l'input et afficher la div
    pseudoDiv.style.display = "block";
    pseudoInput.style.display = "none";
}

function checkEnter(event) {
    if (event.key === "Enter") {
        savePseudo();
    }
}

function updatePseudo() {
	var pseudo = document.getElementById("pseudoInput").value;
	if (pseudo.trim() !== "") {
		document.getElementById("displayPseudo").innerHTML = "Pseudo: " + pseudo;
	} else {
		document.getElementById("displayPseudo").innerHTML = "Veuillez entrer un pseudo.";
	}
}

function previewImage(event) {
	const image = document.getElementById('profileImage');
	const file = event.target.files[0];

	if (file) {
		const reader = new FileReader();
		reader.onload = function(e) {
			image.src = e.target.result;
		};
		reader.readAsDataURL(file);
	}
}