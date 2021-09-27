const jsonParser = require('body-parser').json()
const express = require('express')
const bookings = require('./bookings.js')

const api = express()

// api.locals.bookings = bookings
api.locals.validPostData = validPostData

api
	.use(jsonParser)
	.delete('/booking/:id', (request, response) => {
		try {
			bookings.delete(request.params.id)
			return response.status(202).send({})
		} catch (error) {
			if (error.message === 'booking not found') {
				return response.status(404).send({})
			}

			console.error(error)
			return response.status(500).send()
		}
	})
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
			if (/422/.test(error.message)) {
				return response.status(422).send(error.message)
			}

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
