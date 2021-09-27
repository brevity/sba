const moment = require('moment')

const DB = {}

module.exports = {
	schedule: [],
	info: 'how to retreive & cancel booking',
	db: DB,
	delete(id) {
		if (this.db[id] === undefined) {
			throw new Error('booking not found')
		} else {
			this.db[id] = undefined
		}
	},
	get(id) {
		return this.db[id]
	},
	create(data) {
		const {checkIn, checkOut} = data
		if (this.scheduleConflict(data)) {
			throw new Error('422 schedule conflict')
		}

		this.addToSchedule(checkIn, checkOut)
		return {
			id: 0,
			info: this.info,
		}
	},
	addToSchedule(checkIn, checkOut) {
		const nights = calculateNights(checkIn, checkOut)
		this.schedule.concat(nights)
	},
	scheduleConflict(data) {
		const nights = calculateNights(data.checkIn, data.checkOut)

		return nights.reduce((ok, night) => ok && this.schedule.includes(night) === -1, true)
	},
}
function calculateNights(checkIn_, checkOut_) {
	const checkIn = moment(checkIn_)
	const checkOut = moment(checkOut_)
	const nights = [checkIn]

	let next = checkIn.add(1, 'days')
	// is this working as expected?
	while (next < checkOut) {
		nights.push(next)
		next = next.add(1, 'days')
	}

	nights.push(checkOut)
	return nights
}
