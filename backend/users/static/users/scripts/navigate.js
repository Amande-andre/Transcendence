function navigate(page) {
	// annuler le comportement par default du lien
	//event.preventDefault();

	//consol.log("navigate to " + page + " with SPA function");

	const url_map = {
		'home': 'http://localhost:8080/api/home/',
		'login': 'http://localhost:8080/api/users/login/',
		'register': 'http://localhost:8080/api/users/register/'
	};

	const url = url_map[page];

	$.ajax({
		url: url,
		type: 'GET',
		success: function(response) {
			//consol.log(response);
			$('html').html(response);
			// change the URL
			window.history.pushState({page: page}, page, url);
		}
	});

	
}