import express from 'express';
import axios from 'axios';
var cors = require('cors');

const API_URL = 'https://qa-interview-test.splytech.dev/api/drivers';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/taxies', function (req, res) {
	axios
		.get(API_URL, {params: req.query})
		.then(data => {
			res.send(data.data)})
		.catch(err => res.send({error: err}));
});

app.listen(8080, () => {
	console.log('App Listening on port 8080');
});
