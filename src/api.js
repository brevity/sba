const jsonParser = require('body-parser').json()
const express = require('express')
const bookings = require('./bookings.js')

const api = express()

api.locals.bookings = bookings

api
	.use(jsonParser)
	.post('/booking', (request, response) => {
		try {
			// TODO: Validate body
			const booking = bookings.create(request.body)
			return response.status(201).send(booking)
		} catch (error) {
			return response.status(500).send(error)
		}
	})
	.get('/', (_, response) => {
		response.json({ok: true})
	})

module.exports = api
