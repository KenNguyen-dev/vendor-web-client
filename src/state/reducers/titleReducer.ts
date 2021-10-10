import { TitleAction } from "../interfaces/titlesInterface";
import { TitleTypes } from "../types/titleTypes";

const initialState = "";

const titleReducer = (state = initialState, action: TitleAction) => {
  switch (action.type) {
    case TitleTypes.SHOPINFO:
      return "Shop Information";
    case TitleTypes.PRODUCTS:
      return "Products";
    case TitleTypes.ORDERS:
      return "Orders";
    case TitleTypes.REVIEWS:
      return "Reviews";
    case TitleTypes.ANALYTICS:
      return "Analytics";
    default:
      return state;
  }
};

export default titleReducer;
