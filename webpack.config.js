var path = require('path');

module.exports = {
  entry: './app/scripts/App.js',
  output: {
    path: path.join(__dirname,'./app/temp/scripts'),
    filename: 'App.js'
  }
}
module.exports = {
  entry: './app/scripts/nesApp.js',
  output: {
    path: path.join(__dirname,'./app/temp/scripts'),
    filename: 'nesApp.js'
  }
}

module.exports = {
  entry: './app/scripts/newscApp.js',
  output: {
    path: path.join(__dirname,'./app/temp/scripts'),
    filename: 'newscApp.js'
  }
}
