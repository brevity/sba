const request = require('supertest')
const api = require('../src/api.js')
const bookings = require('../src/bookings.js')

const goodPostBody = {
	firstName: 'Someone\'s',
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

	// And this is where the clock runs down.
	describe.skip('Should return statusCode 422', () => {
		describe('if there is a scheduling conflict', () => {
			bookings.addToSchedule('2022-02-05', '2022-02-08')
			const overlappingBooking = {
				checkIn: '2022-02-07',
				checkOut: '2022-02-09',
				firstName: 'Moonunit',
				lastName: 'Zappa',
				guests: 2,
			}
			test('such as a previously booked date', () =>
				request(api)
					.post('/booking')
					.set('Accept', 'application/json')
					.send(overlappingBooking)
					.then(resp => {
						expect(resp.statusCode).toBe(422)
					}),
			)
		})
	})
})

describe('GET /booking/:id', () => {
	bookings.db[23] = {
		id: 23,
		firstName: 'Albert',
		lastName: 'Aurelius',
		checkIn: '2042-02-01',
		checkOut: '2042-03-03',
		guests: 2,
	}
	describe('Should return statusCode 200', () => {
		test('if on the happy path', () => request(api)
			.get('/booking/23')
			.set('Accept', 'application/json')
			.send()
			.then(resp => {
				expect(resp.statusCode).toBe(200)
				expect(resp.body).toEqual(bookings.db[23])
			}))
	})
	describe.skip('Should return statusCode 404', () => {
		test('if no valid id is given', () => Promise.reject('nope'))
	})
})

describe('DEL /booking/:id', () => {
	describe('Should return statusCode 202', () => {
		bookings.db[26] = Object.assign({},
			goodPostBody,
			{id: 26},
		)
		test('if on the happy path', () => request(api)
			.delete('/booking/26')
			.set('Accept', 'application/json')
			.send()
			.then(resp => {
				expect(resp.statusCode).toBe(202)
			}))
	})
	describe('Should return statusCode 404', () => {
		test('if no booking to delete is found', () => request(api)
			.delete('/booking/27')
			.set('Accept', 'application/json')
			.send()
			.then(resp => {
				expect(resp.statusCode).toBe(404)
			}))
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
