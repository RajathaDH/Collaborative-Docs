const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
    documentId: String,
    data: Object
});

const Document = mongoose.model('Document', DocumentSchema);

module.exports = Document;