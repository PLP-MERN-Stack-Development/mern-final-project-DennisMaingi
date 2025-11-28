/**
 * This file extends the Express Request object for JavaScript projects.
 *
 * It adds a `user` field so that controllers and middleware can access:
 *    req.user._id
 *    req.user.id
 *
 * This replaces TypeScript's `declare global` syntax.
 *
 * @typedef {Object} AuthUser
 * @property {*} id
 * @property {string} _id
 * @property {string} [email]
 * @property {string} [role]
 */

/**
 * Extended Request type for Express.
 *
 * @typedef {import("express").Request & { user?: AuthUser }} AuthRequest
 */

export {};
