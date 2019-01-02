let appConfig = {};

appConfig.port = 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri: 'mongodb://127.0.0.1:27017/todoDB'
}

appConfig.apiVersion = '/api/v1';

module.exports = {
    port : appConfig.port,
    allowedCorsOrigin : appConfig.allowedCorsOrigin,
    db : appConfig.db,
    apiVersion : appConfig.apiVersion
};