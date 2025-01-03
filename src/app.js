require('dotenv').config();
const express = require('express');
const cors = require('cors');

const weatherRoutes = require('./routes/weather');
const currencyRoutes = require('./routes/currency');
const newsRoutes = require('./routes/news');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/weather', weatherRoutes);
app.use('/api/currency', currencyRoutes);
app.use('/api/news', newsRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    