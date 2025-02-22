import { CityType } from ".";

export enum ActionType {
  FETCH_CITIES_REQUEST = "FETCH_CITIES_REQUEST",
  FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS",

  ACTIVATE_LOADING = "ACTIVATE_LOADING",
  DEACTIVATE_LOADING = "DEACTIVATE_LOADING",

  FETCH_CITY_SUCCESS = "FETCH_CITY_SUCCESS",

  ADD_CITY_SUCCESS = "ADD_CITY_SUCCESS",
  DELETE_CITY_SUCCESS = "DELETE_CITY_SUCCESS",

  REQUEST_FAILURE = "REQUEST_FAILURE"
}

export type State = {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType | null;
  error: string;
};

export type FetchCitiesRequestAction = {
  type: ActionType.FETCH_CITIES_REQUEST;
};

export type FetchCitiesSuccessAction = {
  type: ActionType.FETCH_CITIES_SUCCESS;
  payload: CityType[];
};

export type ActiveLoadingAction = {
  type: ActionType.ACTIVATE_LOADING;
};

export type DeactiveLoadingAction = {
  type: ActionType.DEACTIVATE_LOADING;
};

export type FetchCitySuccessAction = {
  type: ActionType.FETCH_CITY_SUCCESS;
  payload: CityType;
};

export type AddCitySuccessAction = {
  type: ActionType.ADD_CITY_SUCCESS;
  payload: CityType;
};

export type DeleteCitySuccessAction = {
  type: ActionType.DELETE_CITY_SUCCESS;
  payload: string;
};

export type RequestFailureAction = {
  type: ActionType.REQUEST_FAILURE;
  payload: string;
};

export type Action =
  | FetchCitiesRequestAction
  | FetchCitiesSuccessAction
  | RequestFailureAction
  | ActiveLoadingAction
  | DeactiveLoadingAction
  | FetchCitySuccessAction
  | AddCitySuccessAction
  | DeleteCitySuccessAction;

export interface CitiesContextType {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType | null;
  error: string;
  getCity: (id: string) => Promise<void>;
  addCity: (newCity: Omit<CityType, "id">) => void;
  deleteCity: (id: string) => void;
}
