/**
 * Client → Server Events
 *
 * join_user: Join a personal room for direct events.
 * join_content: Join a specific content room.
 * join_course: Join a course-level room.
 *
 * @typedef {Object} ClientToServerEvents
 * @property {(userId: string) => void} join_user
 * @property {(contentId: string) => void} join_content
 * @property {(courseId: string) => void} join_course
 */

/**
 * Server → Client Events
 *
 * Add real-time events here, for example:
 * ai_response, enrollment_created, etc.
 *
 * @typedef {Object} ServerToClientEvents
 */

/**
 * @typedef {Object} InterServerEvents
 * (Used only if scaling with multiple servers)
 */

/**
 * Socket Data stored per connection
 *
 * @typedef {Object} SocketData
 * @property {string=} userId
 */

// Export nothing (only used for documentation / clarity)
export {};
