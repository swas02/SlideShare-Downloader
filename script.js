if (window.location.origin == 'https://www.slideshare.net') {
    const dURL = 'https://parthmaniar2.herokuapp.com/slideshare?url=';
    location.replace(dURL + document.URL);
}