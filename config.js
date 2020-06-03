module.exports = {
   PORT  : process.env.PORT || 3001,
   MORGAN: process.env.MORGAN || 'dev',
   DATABASE_URL : process.env.MONGO || 'mongodb://localhost:27017/testSurvey'
 };
