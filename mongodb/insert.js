const mongoose = require('mongoose');
const User = require('./model');

function upsertUser(userObj) {
// mongoose.connect('mongodb://root:206320xl@124.222.211.33:27017/demo');
  const DB_URL = 'mongodb://root:206320xl@124.222.211.33:27017/demo';
  if (mongoose.connection.readyState == 0) {
    mongoose.connect(DB_URL);
  }

  // if this email exists, update the entry, don't insert
  // 如果邮箱存在，就更新实例，不新增
  const conditions = {
    email: userObj.email
  };
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  User.findOneAndUpdate(conditions, userObj, options, (err, result) => {
    if (err) {
      throw err;
    }
  });
}

upsertUser({
    username: username,
    email: email,
    dateCrawled: new Date()
  });