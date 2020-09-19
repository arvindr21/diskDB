const fs = require('fs');
const BSON = require('bson');
const Long = BSON.Long;

// Serialize a document
const doc = { long: Long.fromNumber(100) };
const data = BSON.serialize(doc);
console.log('data:', data);
fs.writeFileSync(__dirname + '/f', data);


// Deserialize the resulting Buffer
const doc_2 = BSON.deserialize(data);
console.log('doc_2:', doc_2);