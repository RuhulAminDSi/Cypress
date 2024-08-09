const fs = require('fs');

// Adjust the file path if the file is inside the cypress/fixtures folder
const htTeachers = JSON.parse(fs.readFileSync('./cypress/fixtures/db_data.json', 'utf8'))
  .map(item => item.MOBILE_NUMBER);

module.exports = htTeachers;
