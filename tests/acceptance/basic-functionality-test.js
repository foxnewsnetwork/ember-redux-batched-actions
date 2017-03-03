import behead from 'dummy/actions/beheading';
import { batchActions, enableBatching } from 'redux-batched-actions';
import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance | basic functionality', function() {
  let application;

  before(function() {
    application = startApp();
  });

  after(function() {
    destroyApp(application);
  });

  it('should have been properly shimmed into ember', () => {
    expect(batchActions).to.be.a('function');
  });
  it('should also have included the middleware', () => {
    expect(enableBatching).to.be.a('function');
  });

  describe('batching', function() {
    let redux, state;
    before(() => {
      redux = application.__container__.lookup('service:redux');
      const batchedAction = batchActions([behead('louis'), behead('marie')]);
      redux.dispatch(batchedAction);
      state = redux.getState().revolution;
    });

    it('should have two people in the dead section', () => {
      expect(state.dead).to.be.an('array');
      expect(state.dead).to.have.lengthOf(2);
    });
    it('should contain the correct two people', () => {
      expect(state.dead).to.contain('louis');
      expect(state.dead).to.contain('marie');
    });
    describe('not-batching', function() {
      let state;
      before(() => {
        redux.dispatch(behead('robbie'));
        state = redux.getState().revolution;
      });
      it('should now have 3 people in the deads', () => {
        expect(state.dead).to.have.lengthOf(3);
      });
      it('should still work with unbatched actions', () => {
        expect(state.dead).to.contain('robbie');
      });
    });
  });
});
