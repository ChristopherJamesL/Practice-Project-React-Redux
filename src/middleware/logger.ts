import { AnyAction, Middleware } from "redux";
import { RootAction, RootState } from "../store/store";

// export const loggerMiddleware: Middleware<{}, RootState> =
//   (store) => (next) => (action) => {
//     if (!action.type) return next(action);

//     console.log("type: ", action.type);
//     console.log("payload: ", action.payload);
//     console.log("currentState: ", store.getState());

//     next(action);

//     console.log("nextState: ", store.getState());
//   };

export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    // Narrow unknown → object
    if (typeof action === "object" && action !== null && "type" in action) {
      console.log("type:", action.type);

      // payload might not exist, so cast only here
      console.log("payload:", (action as any).payload);
    }

    console.log("currentState:", store.getState());

    next(action);

    console.log("nextState:", store.getState());
  };
