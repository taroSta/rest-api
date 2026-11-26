/* jshint esversion: 6 */

module.exports = function (file) {
  const Database = require('better-sqlite3')

  this.db = new Database(file, {
    //  verbose: console.log
  })
  
  this.getMessages = function() {
    return this.db.prepare("SELECT * FROM message;").all();
  }

  this.connect = function (file) {
    this.db = new Database(file, {
      verbose: console.log
    })
  }

  this.sampleData = function () {
    const insert = this.db.prepare('INSERT INTO message (name, message) VALUES (@name, @message)')
    const insertMany = this.db.transaction((messages) => {
      for (const message of messages) insert.run(message)
    })
    insertMany([
      { name: 'Admin', message: 'Hallo Node.js!' },
      { name: 'Pablo', message: 'Ola Node.js!' },
      { name: 'Paolo', message: 'Ciao Node.js!' }
    ])
  }

  this.sampleQuery = function (id) {
    return this.db.prepare("SELECT * FROM message WHERE id = ? ORDER BY ID;").get(id)
  }
  this.addMessage = function (name, message) {
    this.db.prepare('INSERT INTO message (name, message) VALUES (@name, @message)').run({ name: name, message: message })
  }
  this.getMessage = function (id) {
    return this.db.prepare("SELECT * FROM message WHERE id = ? ORDER BY ID;").get(id);
  }

  this.close = function () {
    this.db.close((error) => {
      if (error) {
        return console.error(error.message)
      }
      console.log('Close the database connection.')
    })
  }
}