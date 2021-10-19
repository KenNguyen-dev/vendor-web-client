import { combineReducers } from "redux";
import titleReducer from "./titleReducer";
import orderDialogReducer from "./orderDialogReducer";

const reducers = combineReducers({
  dialog: orderDialogReducer,
  title: titleReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
