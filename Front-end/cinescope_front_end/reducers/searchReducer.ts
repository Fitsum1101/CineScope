import { DEFAULT_SEARCH_OPTIONS } from "@/constants/search";

export type SearchState = typeof DEFAULT_SEARCH_OPTIONS;

export type SearchAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_PAGE"; payload: number }
  | { type: "TOGGLE_ADULT" }
  | { type: "RESET" };

export const initialSearchState: SearchState = DEFAULT_SEARCH_OPTIONS;

export function searchReducer(
  state: SearchState,
  action: SearchAction
): SearchState {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "TOGGLE_ADULT":
      return { ...state, include_adult: !state.include_adult };
    case "RESET":
      return initialSearchState;
    default:
      return state;
  }
}
