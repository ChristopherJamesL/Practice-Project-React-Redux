import { CATEGORIES_ACTION_TYPES, Category } from "./categories.types";
import { CategoryAction } from "./categories.action";

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
  action = {} as CategoryAction
): CategoriesState => {
  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categories: action.payload };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
