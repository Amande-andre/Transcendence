function handleRedirect(event) {
    console.log("HTMX response:", event.detail.xhr.response); // Log the response
    if (event.detail.xhr.response) {
        const response = JSON.parse(event.detail.xhr.response);
        if (response.redirect) {
            console.log("Redirecting to:", response.url); // Log the redirect URL
            window.history.pushState({}, '', response.url);  // Change the URL in the address bar
        }
    }
}
