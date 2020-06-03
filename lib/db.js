const mongoose = require('mongoose');

const userSchema = require('../schemas/user');
const surveySchema = require('../schemas/survey');

mongoose.Promise = global.Promise;

class DB {
  constructor() {
    this.mongoose = mongoose;
    this._setupSchemas();
  }

  connect(done) {
    this.mongoose.connect(process.env.DATABASE_URL, {
      useMongoClient: true,
      /* other options */
    });
  }

  disconnect(done) {
    this.mongoose.disconnect((err) => {
      if (err) { return done(err); }
      console.log('Disconnected from DB...');
      done(null);
    });
  }

  _setupSchemas() {
    this.mongoose.model('User', userSchema);
    this.mongoose.model('Survey', surveySchema);
  }
}

module.exports = new DB();
