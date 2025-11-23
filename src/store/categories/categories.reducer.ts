import { AnyAction } from "redux";
import { Category } from "./categories.types";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: Boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = INITIAL_STATE,
  action = {} as AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) return { ...state, isLoading: true };

  if (fetchCategoriesSuccess.match(action))
    return { ...state, isLoading: false, categories: action.payload };

  if (fetchCategoriesFailed.match(action))
    return { ...state, isLoading: false, error: action.payload };

  return state;
};
