const request = require('supertest')
const app = require('../src/api.js')

describe('POST /booking', () => {
	const goodBody = {
		firstName: 'Your',
		lastName: 'Mom',
		checkIn: '2042-01-01',
		checkOut: '2042-01-03',
		guests: 2,
	}
	describe('Should return statusCode 200', () => {
		test('if on the happy path', () => request(app)
			.post('/booking')
			.set('Accept', 'application/json')
			.send(goodBody)
			.then(resp => {
				expect(resp.statusCode).toBe(201)
				expect(resp.body.id).toBeDefined()
				expect(resp.body.info).toBeDefined()
			}))
	})
	describe.skip('Should return statusCode 400', () => {
		describe('if required props are absent', () => {
			test('such as...', () => Promise.reject('nope'))
		})
		describe('if required props are null', () => {
			test('such as...', () => Promise.reject('nope'))
		})
		describe('if props are in the wrong format', () => {
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
