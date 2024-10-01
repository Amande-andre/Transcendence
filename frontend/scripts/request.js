function registerRequest(username, password) {
	fetch('http://localhost:8080/api/pong/register/', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken
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
	.catch(error => {
		console.error('Error:', error);
	});
}

function loginRequest(username, password) {
	fetch('http://localhost:8080/api/pong/login/', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
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
