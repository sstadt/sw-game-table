
var http = require('../../../lib/util.http.js');

var passwordResetComponent = require('./passwordResetComponent.js');

Vue.config.silent = true;

describe('The passwordReset component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(passwordResetComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    it('should be an object', function () {
      expect(component.props).toEqual(jasmine.any(Object));
    });

    describe('token', function () {
      it('should be a string', function () {
        expect(component.props.token.type).toEqual(String);
      });

      it('should default to an empty string', function () {
        expect(component.props.token.defaultsTo).toEqual('');
      });
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);

      componentInstance.$refs = {
        resetAlert: {
          error: jasmine.createSpy('alert'),
          success: jasmine.createSpy('success')
        },
        resetDialog: {
          open: jasmine.createSpy('open')
        }
      };
    });

    describe('#setView', function () {
      beforeEach(function () {
        spyOn(componentInstance, '$emit');
        componentInstance.setView('foo');
      });

      it('should emit a set-view event', function () {
        expect(componentInstance.$emit).toHaveBeenCalledWith('set-view', 'foo');
      });
    });

    describe('#requestReset', function () {
      beforeEach(function () {
        componentInstance.requestForm.fields.email.value = 'bob@bob.com';
      });

      describe('on success', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.authService, 'requestReset').and.callFake(function () {
            return q.resolve();
          });

          componentInstance.requestReset().done(function () { done(); });
        });

        it('should show a success message', function () {
          expect(componentInstance.$refs.resetAlert.success).toHaveBeenCalledWith(jasmine.any(String));
        });
      });

      describe('on success', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.authService, 'requestReset').and.callFake(function () {
            return q.reject({ err: 'foo' });
          });

          componentInstance.requestReset().done(function () { done(); });
        });

        it('should show an error message', function () {
          expect(componentInstance.$refs.resetAlert.error).toHaveBeenCalledWith('foo');
        });
      });
    });

    describe('#submitReset', function () {
      beforeEach(function () {
        componentInstance.resetForm.fields.password.value = '12345';
        componentInstance.resetForm.fields.confirm.value = '12345';
      });

      describe('on success', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.authService, 'resetPassword').and.callFake(function () {
            return q.resolve();
          });

          componentInstance.submitReset().done(function () { done(); });
        });

        it('should show a success message', function () {
          expect(componentInstance.$refs.resetDialog.open).toHaveBeenCalled();
        });
      });

      describe('on success', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.authService, 'resetPassword').and.callFake(function () {
            return q.reject({ err: 'foo' });
          });

          componentInstance.submitReset().done(function () { done(); });
        });

        it('should show an error message', function () {
          expect(componentInstance.$refs.resetAlert.error).toHaveBeenCalledWith('foo');
        });
      });
    });

    describe('#redirect', function () {
      beforeEach(function () {
        spyOn(http, 'setLocation');
        componentInstance.redirect();
      });

      it('should redirect to the home page', function () {
        expect(http.setLocation).toHaveBeenCalledWith('/home');
      });
    });
  });

});
