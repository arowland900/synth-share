require('dotenv').config()
const
	express = require('express'),
	app = express(),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/synth-maker',
	PORT = process.env.PORT || 3001,
	usersRoutes = require('./routes/users.js'),
	synthsRoutes = require('./routes/synths.js')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
	console.log(err || `Connected to MongoDB.`)
})

app.use(express.static(`${__dirname}/client/build`))
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
	res.json({message: "API root."})
})

app.use('/api/users', usersRoutes)
app.use('/api/synths', synthsRoutes)

app.get('*', (req, res) => {
	res.sendFile(`${__dirname}/client/build/index.html`)
})


app.listen(PORT, (err) => {
	console.log(err || `Server running on port ${PORT}.`)
})