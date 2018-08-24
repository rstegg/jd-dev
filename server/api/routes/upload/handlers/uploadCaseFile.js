const { Order } = requireDb

module.exports = (req, res) => {
  console.log(req.body)
  console.log(Object.keys(req))
  console.log(req.files)
    res.status(200).json({ files: req.files })
}
  // Order.update(
  //   { image: req.file.location },
  //   { where: { id: req.params.id, userId: req.params.profileId, userId: req.user.id },
  //     returning: true,
  //     plain: true
  //  })
  // .then(shop => res.status(200).json({ image: req.file.location }))
  // .catch(error => res.status(400).json({ error }))
