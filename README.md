# ember-redux-batched-actions

[![CircleCI](https://circleci.com/gh/foxnewsnetwork/ember-redux-batched-actions.svg?style=svg)](https://circleci.com/gh/foxnewsnetwork/ember-redux-batched-actions)

Ember CLI shim for redux-batched-actions https://github.com/tshelburne/redux-batched-actions

## Usage
Import and use!

Be sure that your action is an FSA-compliant action (consider using this addon https://github.com/foxnewsnetwork/ember-redux-actions)
`app/components/french-guillotine.js`
```javascript
import { behead } from 'dummy/actions/beheading';
import { batchActions } from 'redux-batched-actions';

function actionsToDispatch(dispatch) {
  return {
    releaseBlade(louis, marie, robbie) {
      const killAll = [
        behead(louis),
        behead(marie),
        behead(robbie)
      ];
      dispatch(killAll);
    }
  };
}
```

And don't forget to declare what actions are batch-enabled in `app/reducers/index.js`:

```javascript
import napoleonReducer from 'app/reducers/napoleon';
import louis14Reducer from 'app/reducers/louis-14';
import beheadingReducer from 'app/reducers/beheading';
import { enableBatching } from 'redux-batched-actions';

export default {
  empire: napoleonReducer,
  monarch: louis14Reducer,
  revolution: enableBatching(beheadingReducer)
}
```

## Q&A
Q: Why do I need redux-batched-actions when I already have redux-thunk?
A: redux-batched-actions have the advantage that, at the end of the day, only 1 action is being thrown into the redux system, therefore, there is only 1 subscribe update cycle that gets run. While this isn't a big deal if your thunks are small, you're on glimmer, and you're on a multi-core system that can leverage concurrency, but if you're on a single-core system without glimmer your entire UI thread will hang for a good minute if you're processing large amounts of data and populating your redux store with it. Batched-actions resolve this problem handily. If you're not doing async work, it's better to batch then thunk!

## Installation

* `git clone <repository-url>` this repository
* `cd ember-redux-batched-actions`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
