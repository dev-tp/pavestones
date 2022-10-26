const ref = db.getSiblingDB('paver');

ref.createCollection('user');

ref.user.insertOne({
  username: 'admin',
  hash: '$2b$10$DF7HTrkUD8At9r6zT8xUIu.XMMtIoLQ2yePc.HNEsxo/UyX7fTYDG',
});
