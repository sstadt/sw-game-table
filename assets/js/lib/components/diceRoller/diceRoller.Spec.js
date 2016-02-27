
define([
  'q',
  'vue.min',
  'service/rollService',
  'component/diceRoller/diceRollerComponent'
], function (q, Vue, rollService, diceRollerComponent) {

  describe('The diceRoller component', function () {
    var component;

    beforeEach(function () {
      component = _.clone(diceRollerComponent);
    });

    it('to be an object', function () {
      expect(component).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      expect(component.template).toEqual(jasmine.any(String));
    });

    describe('props', function () {
      describe('chatHandle', function () {
        it('should exist', function () {
          expect(component.props.chatHandle).toEqual(jasmine.any(Object));
        });

        it('should be a string', function () {
          expect(component.props.chatHandle.type).toEqual(String);
        });

        it('should be required', function () {
          expect(component.props.chatHandle.required).toEqual(true);
        });
      });
    });

    describe('data', function () {
      var data;

      beforeEach(function () {
        data = component.data();
      });

      it('should have a description attribute with an empty string value', function () {
        expect(data.description).toEqual('');
      });

      it('should have an ability attribute with a value of 0', function () {
        expect(data.ability).toEqual(0);
      });

      it('should have a proficiency attribute with a value of 0', function () {
        expect(data.proficiency).toEqual(0);
      });

      it('should have a difficulty attribute with a value of 0', function () {
        expect(data.difficulty).toEqual(0);
      });

      it('should have a challenge attribute with a value of 0', function () {
        expect(data.challenge).toEqual(0);
      });

      it('should have a boost attribute with a value of 0', function () {
        expect(data.boost).toEqual(0);
      });

      it('should have a setback attribute with a value of 0', function () {
        expect(data.setback).toEqual(0);
      });

      it('should have a force attribute with a value of 0', function () {
        expect(data.force).toEqual(0);
      });

      it('should have a channel attribute that is an object with a label attribute', function () {
        expect(data.channel).toEqual(jasmine.any(Object));
        expect(data.channel.label).toEqual(jasmine.any(String));
      });

      it('should have a localRolls attribute that is an empty array', function () {
        expect(data.localRolls).toEqual([]);
      });

      it('should have a channelRolls attribute that is an empty array', function () {
        expect(data.channelRolls).toEqual([]);
      });
    });

    describe('methods', function () {
      var componentInstance;

      beforeEach(function () {
        componentInstance = new Vue(component);
      });

      describe('#roll', function () {
        var done;

        beforeEach(function () {
          done = false;
        });

        it('should be a function', function () {
          expect(typeof componentInstance.roll).toBe('function');
        });

        it('should add a new roll on success', function () {
          spyOn(rollService, 'roll').and.callFake(function () {
            var deferred = q.defer();
            deferred.resolve({});
            return deferred.promise;
          });

          componentInstance.roll().then(function () {
            expect(componentInstance.localRolls.length).toEqual(1);
          });
        });
      });
    });

  });

});
