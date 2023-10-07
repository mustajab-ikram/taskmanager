function validateTask(req, res, next) {
  const { title, description, completed } = req.body;

  const errors = [];

  if (!title) {
    errors.push({
      field: 'title',
      message: 'Title cannot be empty',
    });
  }

  if (!description) {
    errors.push({
      field: 'description',
      message: 'Description cannot be empty',
    });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    errors.push({
      field: 'completed',
      message: 'Completed should be a boolean',
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation Failed',
      errors,
    });
  }

  next();
}

module.exports = { validateTask };
