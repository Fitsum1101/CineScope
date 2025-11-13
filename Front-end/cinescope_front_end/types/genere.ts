import { SearchAction, SearchState } from "@/reducers/searchReducer";

export type genere = {
  id: number;
  name: string;
};

export type DiscoveryFiltersProps = {
  state: SearchState;
  dispatch: React.Dispatch<SearchAction>;
  genere: genere;
  handleGenere: React.Dispatch<React.SetStateAction<genere>>;
};
