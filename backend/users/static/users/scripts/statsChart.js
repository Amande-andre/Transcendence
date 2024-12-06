document.addEventListener('DOMContentLoaded', () => {
    const statsModal = document.getElementById('statsModal');
	
	if (!statsModal)
		return;
    statsModal.addEventListener('shown.bs.modal', () => {
        // Données pour les victoires/défaites
        const matches = parseInt(document.getElementById('matchs').textContent);
        const wins = parseInt(document.getElementById('win').textContent);
        const losses = parseInt(document.getElementById('lose').textContent);
        // Données pour les statistiques supplémentaires
        const rebounds = 35; // Exemple dynamique ou API
        const bricksBroken = 42;
        const longestRally = 15;

        // Mettre à jour les statistiques supplémentaires
        document.getElementById('rebounds').textContent = rebounds;
        document.getElementById('bricks-broken').textContent = bricksBroken;
        document.getElementById('longest-rally').textContent = longestRally;

        // Graphique des victoires/défaites
        const ctxWins = document.getElementById('statsChartWins').getContext('2d');
        new Chart(ctxWins, {
            type: 'doughnut',
            data: {
                labels: ['Wins', 'Losses'],
                datasets: [{
                    data: [wins, losses],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });

        // Graphique des statistiques supplémentaires
        const ctxStats = document.getElementById('statsChartStats').getContext('2d');
        new Chart(ctxStats, {
            type: 'bar',
            data: {
                labels: ['Rebounds', 'Bricks Broken', 'Longest Rally'],
                datasets: [{
                    data: [rebounds, bricksBroken, longestRally],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
});
