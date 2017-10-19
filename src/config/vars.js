module.exports = {
  port: 8081,
  mongo: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/htm-project'
};
