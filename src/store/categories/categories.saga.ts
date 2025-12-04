import {
  all,
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import { CATEGORIES_ACTION_TYPES, Category } from "./categories.types";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
  FetchCategoriesSuccess,
  FetchCategoriesFailed,
} from "./categories.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export function* fetchCategoriesAsync(): Generator<
  | CallEffect<Category[]>
  | PutEffect<FetchCategoriesSuccess | FetchCategoriesFailed>,
  void,
  Category[]
> {
  try {
    const categoriesArray: Category[] = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error as Error));
  }
}

export function* onfetchCategories(): Generator {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga(): Generator {
  yield all([call(onfetchCategories)]);
}
