import { combineReducers } from "redux";
import characterLikedReducer from "./CharacterLikedReducers";

const rootReducer = combineReducers({
  characterLikedReducer,
});

export default rootReducer;
