const Pool = require('pg').Pool
const pool = new Pool({
  user: 'chat_app_user',
  host: 'localhost',
  database: 'chat_app_db',
  password: 'chatapp',
  port: 5432,
});

const getMessages = (request, response) => {
  pool.query('SELECT * FROM (SELECT * FROM messages ORDER BY created_on DESC LIMIT 50) AS last_fifty ORDER BY created_on ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createMessage = (request) => {
  const message = JSON.parse(request);
  pool.query('INSERT INTO messages (user_id, message) VALUES ($1, $2)', [message.user, message.content], (error, result) => {
    if (error) {
      throw error
    }
  })
}

const updateMessage = (request, response) => {
  const id = parseInt(request.params.messageId)
  const { message } = request.body

  pool.query(
    'UPDATE messages SET message = $1 WHERE id = $2',
    [message, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Message modified with ID: ${id}`)
    }
  )
}

const deleteMessage = (request, response) => {
  const id = parseInt(request.params.messageId)

  pool.query('DELETE FROM messages WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Message deleted with ID: ${id}`)
  })
}

module.exports = {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
}