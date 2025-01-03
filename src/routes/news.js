const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:topic', async (req, res) => {
    const topic = req.params.topic;
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.json({
            topic: topic,
            articles: response.data.articles.map(article => ({
                title: article.title,
                description: article.description,
                url: article.url,
                source: article.source.name,
            })),
        });
    } catch (error) {
        console.error('Error fetching news data:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch news data' });
    }
});

module.exports = router;
