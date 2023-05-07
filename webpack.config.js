const path = require("path");

module.exports = {
  mode : 'development',
  entry: {
    adminApp : './adminPage/admin-app.js',
    loginApp : './LoginPage/app.js',
    mainApp : './main-page/main-app.js',
    signApp : './SignUpPage/app.js',
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: '[name].js',
  },
};