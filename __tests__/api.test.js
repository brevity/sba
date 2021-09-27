const request = require('supertest')
const api = require('../src/api.js')

const goodPostBody = {
	firstName: 'Your',
	lastName: 'Mom',
	checkIn: '2042-01-01',
	checkOut: '2042-01-03',
	guests: 2,
}
describe('POST /booking', () => {
	describe('Should return statusCode 200', () => {
		test('if on the happy path', () => request(api)
			.post('/booking')
			.set('Accept', 'application/json')
			.send(goodPostBody)
			.then(resp => {
				expect(resp.statusCode).toBe(201)
				expect(resp.body.id).toBeDefined()
				expect(resp.body.info).toBeDefined()
			}))
	})
	describe('Should return statusCode 400', () => {
		describe('if bookingData is invalid', () => {
			const badBody = Object.assign({}, goodPostBody)
			delete badBody.firstName

			return test('firstName is required', () => request(api)
				.post('/booking')
				.send(badBody)
				.set('Accept', 'application/json')
				.then(resp => {
					expect(resp.statusCode).toBe(400)
				}))
		})
		describe.skip('if required props are null', () => {
			test('such as...', () => Promise.reject('nope'))
		})
		describe.skip('if props are in the wrong format', () => {
			test('such as...', () => Promise.reject('nope'))
		})
	})

	describe.skip('Should return statusCode 422', () => {
		describe('if there is a scheduling conflict', () => {
			test('such as a previously booked date', () => Promise.reject('nope'))
		})
	})
})

describe.skip('GET /booking/:id', () => {
	describe('Should return statusCode 200', () => {
		test('if on the happy path', () => Promise.reject('nope'))
	})
	describe('Should return statusCode 404', () => {
		test('if no valid id is given', () => Promise.reject('nope'))
	})
})

describe.skip('DEL /booking/:id', () => {
	describe('Should return statusCode 203', () => {
		test('if on the happy path', () => Promise.reject('nope'))
	})
})

describe('validPostData() should return false if..', () => {
	const required = [
		'firstName',
		'lastName',
		'checkIn',
		'checkOut',
		'guests',
	]
	required.map(prop => {
		const badBody = Object.assign({}, goodPostBody)
		delete badBody[prop]

		return test(prop + ' is missing', () => {
			expect(api.locals.validPostData(badBody)).toBe(false)
		})
	})
})
