const jsonParser = require('body-parser').json()
const express = require('express')
const bookings = require('./bookings.js')

const api = express()

api.locals.bookings = bookings
api.locals.validPostData = validPostData

api
	.use(jsonParser)
	.get('/booking/:id', (request, response) => {
		const booking = bookings.get(request.params.id)
		return response.status(200).send(booking)
	})
	.post('/booking', (request, response) => {
		try {
			if (!api.locals.validPostData(request.body)) {
				return response.status(400).send({})
			}

			const booking = bookings.create(request.body)
			return response.status(201).send(booking)
		} catch (error) {
			return response.status(500).send(error)
		}
	})
	.get('/', (_, response) => {
		response.json({ok: true})
	})

function validPostData(postData) {
	return postData !== undefined
	&& isPresent(postData, 'firstName')
	&& isPresent(postData, 'lastName')
	&& isPresent(postData, 'checkIn')
	&& isPresent(postData, 'checkOut')
	&& isPresent(postData, 'guests')
	&& typeof postData.firstName === 'string'
	&& typeof postData.lastName === 'string'
	&& typeof postData.checkIn === 'string'
	&& typeof postData.checkOut === 'string'
	&& typeof postData.guests === 'number'
	&& typeof postData.guests === 'number'
}

// TODO: stash in util module...
// Or refactor all validation using joi : -/
function isPresent(body, prop) {
	return body[prop] !== undefined
	&& body[prop] !== null
}

module.exports = api
