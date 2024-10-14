document.body.addEventListener('htmx:response', function (evt) {
    if (evt.detail.xhr.status === 200) {
        const response = JSON.parse(evt.detail.xhr.responseText);
        if (response.success) {
            // Redirige l'utilisateur
            window.location.href = response.redirect;
        }
    }
});