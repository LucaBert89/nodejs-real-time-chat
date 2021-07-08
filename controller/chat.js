const path = require('path');

exports.getChatPage = (req, res) => {
    const filePath = __dirname;
    res.sendFile(path.join(filePath, '../', 'views','chat.html'));
};