/**
 * Extend Express Request object to include a `user` field.
 *
 * This provides IntelliSense in JavaScript projects,
 * even though we are not using TypeScript.
 *
 * @typedef {Object} AuthenticatedUser
 * @property {*} id
 * @property {string} _id
 */

/**
 * @typedef {import('express').Request & { user?: AuthenticatedUser }} AuthRequest
 */

export {};
