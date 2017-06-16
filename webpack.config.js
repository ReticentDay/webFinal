var path = require('path');

module.exports = {
  entry: './app/scripts/App.js',
  output: {
    path: path.join(__dirname,'./app/temp/scripts'),
    filename: 'App.js'
  }
}
