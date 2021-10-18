import mongoose from 'mongoose';

export const connect = ({ db_user, db_name, db_password }) =>
  mongoose.connect(`mongodb://localhost:27017`, {
    user: db_user,
    pass: db_password,
    dbName: db_name,
  });
