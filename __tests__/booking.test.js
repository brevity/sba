const bookings = require('../src/bookings.js')

describe('Bookings.create()', () => {
	describe('should return a new booking', () => {
		const bookingData = {
			firstName: 'John',
			lastName: 'Doe',
			checkIn: '2022-01-01',
			checkOut: '2022-01-03',
			guests: 2,
		}
		const booking = bookings.create(bookingData)
		test('with a booking.id', () => {
			expect(booking.id).toBeDefined()
		})
	})
	describe.skip('should throw an error', () => {
		describe('if given dates which conflict with a previouc booking', () => {
			test('like so', () => Promise.reject(new Error('nope')))
		})
	})
})
