module.exports = {
    PORT: process.env.PORT || 8080,
    // other stuff
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL ||
      "https://weekly-words-api.herokuapp.com/ww/api"
  };