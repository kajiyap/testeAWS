const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
