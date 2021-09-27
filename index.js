const app = require('./src/api.js')

app
	.listen(8080, () => {
		console.log('Listening on port 8080')
	})
