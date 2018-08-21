const validateParams = (validator, error = "Invalid Params") => (req, res, next) =>
   !validator(req.params) ? res.status(400).json({error})
   : next()

module.exports = validateParams
