const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    databaseOptions: {
        host: 'localhost',
        user: 'user',
        password: '1234',
        database: 'homework',
    }
};