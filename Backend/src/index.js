const express = require('express');
const morgan = require('morgan')
const env = require('dotenv').config();
const db = require('./config/db')
const router = require('./routers')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan('combined'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
router(app)
db.connect();
app.listen(process.env.port, () => {
  console.log(`Example app listening at http://localhost:${process.env.port}`);
});
