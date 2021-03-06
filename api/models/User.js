/**
* User.js
*
* @description :: Site users
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt-nodejs');

module.exports = {

  schema: true,
  attributes: {

    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },
    chatHandle: {
      type: 'string',
      required: true,
      unique: true
    },
    confirmed: {
      type: 'boolean',
      defaultsTo: false
    },
    encryptedPassword: {
      type: 'string'
    },
    config: {
      type: 'json',
      defaultsTo: {}
    },

    gameMaster: {
      collection: 'game',
      via: 'gameMaster'
    },
    player: {
      collection: 'game',
      via: 'players'
    },
    invitedGames: {
      collection: 'game',
      via: 'invitedPlayers'
    },
    requestedGames: {
      collection: 'game',
      via: 'requestingPlayers'
    },

    toJSON: function () {
      var obj = this.toObject();

      delete obj.password;
      delete obj.confirmed;
      delete obj.createdAt;
      delete obj.updatedAt;
      delete obj.encryptedPassword;
      delete obj._csrf;

      return obj;
    }

  },

  beforeCreate: function (values, next) {
    if (!values.password || values.password !== values.confirmation) {
      return next({
        err: [ sails.config.notifications.Password.security.error.misMatch ]
      });
    }

    PasswordService.hashPassword(values.password)
      .then(function (encryptedPassword) {
        delete values.password;
        delete values.confirmation;
        values.encryptedPassword = encryptedPassword;
        next();
      })
      .fail(function (err) {
        next(err);
      });
  }
};
