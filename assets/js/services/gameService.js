
var constants = require('../config/constants.js');

module.exports = {
  getMyGames: function () {
    var deferred = q.defer();

    io.socket.get(constants.endpoints.game.ownedIndex, function (response) {
      if (response.err) {
        console.error(response.err);
        deferred.reject('There was an error retrieving your games');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  get: function (id) {
    var deferred = q.defer();

    io.socket.get(constants.endpoints.game.get, { id: id }, function (response) {
      if (response.err) {
        console.error(response.err);
        deferred.reject('The requested game could not be found');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  search: function (filter) {
    var deferred = q.defer();

    io.socket.get(constants.endpoints.game.search, { filter: filter }, function (response) {
      if (response.err) {
        console.error(response.err);
        deferred.reject('There was an error looking for games');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  create: function (title) {
    var deferred = q.defer();

    io.socket.post(constants.endpoints.game.create, { title: title }, function (response) {
      if (response.err) {
        console.error(response.err);
        deferred.reject('There was an error creating the game');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  updateConfig: function (id, config) {
    var deferred = q.defer();

    io.socket.post(constants.endpoints.game.updateConfig, { id: id, config: config }, function (response) {
      if (response && response.err) {
        console.log(response.err);
        deferred.reject('There was an error updating the game config');
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  },
  addCrawl: function (crawl) {
    var deferred = q.defer();

    io.socket.post(constants.endpoints.game.addCrawl, { crawl: crawl }, function (response) {
      if (response.err) {
        console.log(response.err);
        deferred.reject('There was an error adding the crawl');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  }
};
