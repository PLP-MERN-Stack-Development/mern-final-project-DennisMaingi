/**
 * @typedef {Object} IUser
 * @property {string} _id
 * @property {string} [name]
 * @property {string} [email]
 * @property {string} [role]
 */

/**
 * @typedef {import('express').Request & { user?: IUser }} AuthRequest
 */

/**
 * Example usage in JS routes:
 * 
 * @param {AuthRequest} req
 * @param {import('express').Response} res
 */
function exampleRoute(req, res) {
  const userId = req.user?._id; // safe access to user ID
  res.json({ message: `Hello user ${userId}` });
}

module.exports = { exampleRoute };
