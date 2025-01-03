const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:amount', async (req, res) => {
    const amount = req.params.amount; // Сумма в KZT
    const apiKey = process.env.CURRENCY_API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/KZT`;

    try {
        const response = await axios.get(url);
        const rates = response.data.conversion_rates;

        // Конвертируем сумму в основные валюты
        const converted = {
            USD: (amount * rates.USD).toFixed(2),
            EUR: (amount * rates.EUR).toFixed(2),
            RUB: (amount * rates.RUB).toFixed(2),
        };

        res.json({
            base: "KZT",
            amount: amount,
            converted,
        });
    } catch (error) {
        console.error('Error fetching currency data:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch currency data' });
    }
});

module.exports = router;
