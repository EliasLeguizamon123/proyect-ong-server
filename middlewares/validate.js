exports.validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(
      {
        body: req.body,
        query: req.query,
        params: req.params
      },
      { abortEarly: false }
    ) // abortEarly: false so it will show the entire list of errors
    return next()
  } catch (err) {
    return res.status(400).json({ type: err.name, message: err.message, errors: err.errors })
  }
}
