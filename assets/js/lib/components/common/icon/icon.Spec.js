
define([
  'component/common/icon/iconComponent'
], function (component) {

  describe('The icon component', function () {
    it('to be an object', function () {
      expect(component).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      expect(component.template).toEqual(jasmine.any(String));
    });

    it('should have a name property', function () {
      expect(component.props[0]).toEqual('name');
    });
  });

});
