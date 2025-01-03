document.addEventListener('DOMContentLoaded', () => {
    const index = localStorage.getItem('newsIndex');
    const articles = JSON.parse(localStorage.getItem('newsData'));
    const article = articles[index];

    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <p>Source: ${article.source}</p>
        <a href="${article.url}" target="_blank">Read Full Article</a>
    `;
});
