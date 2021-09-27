const INFO = 'how to retreive & cancel booking'
const DB = {}

module.exports = {
	db: DB,
	get: id => DB[id],
	create: _ => ({
		id: 0,
		info: INFO,
	}),
}

