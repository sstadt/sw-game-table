
var markdownComponent = require('./markdownComponent.js');

Vue.config.silent = true;

describe('The markdown component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(markdownComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

});