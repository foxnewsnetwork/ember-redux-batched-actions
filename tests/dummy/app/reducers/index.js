import napoleonReducer from 'dummy/reducers/napoleon';
import louis14Reducer from 'dummy/reducers/louis-14';
import beheadingReducer from 'dummy/reducers/beheading';
import { enableBatching } from 'redux-batched-actions';

export default {
  empire: napoleonReducer,
  monarch: louis14Reducer,
  revolution: enableBatching(beheadingReducer)
}
