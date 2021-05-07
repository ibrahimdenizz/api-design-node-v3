export const getOne = model => async (req, res) => {
  if (req.user._id) {
    const item = await model.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    })

    if (item) return res.status(200).json({ data: item })
    else return res.status(404).end()
  } else res.status(401).end()
}

export const getMany = model => async (req, res) => {
  if (req.user._id) {
    const items = await model.find({ createdBy: req.user._id })
    return res.status(200).json({ data: items })
  }
}

export const createOne = model => async (req, res) => {
  if (req.user._id) {
    req.body.createdBy = req.user._id
    const item = await model.create(req.body)
    return res.status(201).json({ data: item })
  }
}

export const updateOne = model => async (req, res) => {
  if (req.user._id) {
    const newItem = await model.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    )
    if (newItem) return res.status(200).json({ data: newItem })
    return res.status(400).end()
  }
}

export const removeOne = model => async (req, res) => {
  if (req.user._id) {
    const removedItem = await model
      .findOneAndRemove({
        _id: req.params.id,
        createdBy: req.user._id
      })
      .exec()
    if (removedItem) return res.status(200).json({ data: removedItem })

    return res.status(400).end()
  }
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
