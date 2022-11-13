module.exports = async (err, _req, res, _next) => 
  // const { message } = err;

  // return res.status().json({ message });
  res.status(err.code || 500).json({ message: err.message || 'Internal server error' });
