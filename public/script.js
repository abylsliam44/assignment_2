async function fetchNews() {
    const topic = document.getElementById('newsTopic').value;
    const response = await fetch(`/api/news/${topic}`);
    const data = await response.json();

    const newsResult = document.getElementById('news-result');
    if (data.error) {
        newsResult.innerHTML = `<p>Error: ${data.error}</p>`;
    } else {
        newsResult.innerHTML = `<h3>News on "${data.topic}":</h3>`;
        data.articles.forEach((article, index) => {
            newsResult.innerHTML += `
                <div class="news-article">
                    <h4>${article.title}</h4>
                    <button onclick="goToNewsDetails(${index})">View Details</button>
                </div>
            `;
        });
        localStorage.setItem('newsData', JSON.stringify(data.articles));
    }
}

function goToNewsDetails(index) {
    localStorage.setItem('newsIndex', index);
    window.location.href = 'news-details.html';
}

async function fetchCurrency() {
    const amount = document.getElementById('amount').value; // Сумма в KZT
    const response = await fetch(`/api/currency/${amount}`);
    const data = await response.json();

    const currencyResult = document.getElementById('currency-result');
    if (data.error) {
        currencyResult.innerHTML = `<p>Error: ${data.error}</p>`;
    } else {
        currencyResult.innerHTML = `
            <h3>Converted Amount</h3>
            <p><strong>${data.amount} KZT</strong> is equal to:</p>
            <p>USD: ${data.converted.USD}</p>
            <p>EUR: ${data.converted.EUR}</p>
            <p>RUB: ${data.converted.RUB}</p>
        `;
    }
}
