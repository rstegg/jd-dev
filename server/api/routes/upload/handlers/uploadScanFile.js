const { Order } = requireDb

module.exports = (req, res) => res.status(200).json({ files: req.files })
