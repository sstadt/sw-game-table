/**
* Roll.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    overallResults: {
      type: 'json',
      required: true
    },
    results: {
      type: 'json',
      required: true
    },
    description: {
      type: 'string',
      defaultsTo: ''
    }
  }
};

