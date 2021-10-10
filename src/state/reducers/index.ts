import { combineReducers } from "redux";
import titleReducer from "./titleReducer";

const reducers = combineReducers({
  title: titleReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
