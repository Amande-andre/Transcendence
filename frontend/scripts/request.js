function registerRequest(username, password) {
	fetch('http://localhost:8080/api/pong/register/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: username,
			password: password
		})
	})
	.then(response => response.json())
	.then(data => {
		console.log(data);
	})
}

function loginRequest(username, password) {
	fetch('http://localhost:8080/api/pong/login/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: username,
			password: password
		})
	})
	.then(response => response.json())
	.then(data => {
		console.log(data);
	})
}
