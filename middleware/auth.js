const config = require('config')
const jsonwebtoken = require('jsonwebtoken')

module.exports = (req, res, next) => {
	try {
		const token = req.header('auth_token_dc')
		if (!token) {
			return res
				.status(400)
				.json({ msg: 'no token, authorization denied.' })
		}
		req.userId = jsonwebtoken.verify(token, config.get('jwtSecret')).user.id
		next()
	} catch (err) {
		return res.status(401).json({ errors: [{ msg: 'Token is not valid' }] })
	}
}
