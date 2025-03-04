import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from "react";
import { BASE_URL } from "../utils/constants";
import { CityType } from "../types";
import {
  CitiesContextType,
  State,
  Action,
  ActionType
} from "../types/citiesContextTypes";
import { fetchData } from "../utils/helper";

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

interface CitiesProviderProps {
  children: ReactNode;
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: ""
};

const reducer: React.Reducer<State, Action> = (state, action): State => {
  switch (action.type) {
    case ActionType.FETCH_CITIES_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case ActionType.FETCH_CITIES_SUCCESS:
      return { ...state, isLoading: false, cities: [...action.payload] };

    case ActionType.ACTIVATE_LOADING:
      return { ...state, isLoading: true };

    case ActionType.DEACTIVATE_LOADING:
      return { ...state, isLoading: false };

    case ActionType.FETCH_CITY_SUCCESS:
      return { ...state, currentCity: action.payload };

    case ActionType.ADD_CITY_SUCCESS:
      return { ...state, cities: [...state.cities, action.payload] };

    case ActionType.DELETE_CITY_SUCCESS:
      return {
        ...state,
        cities: [...state.cities.filter((c) => c.id !== action.payload)]
      };

    case ActionType.REQUEST_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
};

function CitiesProvider({ children }: CitiesProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, isLoading, currentCity, error } = state;

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: ActionType.FETCH_CITIES_REQUEST });

        const data = await fetchData<CityType[]>(`${BASE_URL}/cities`);

        dispatch({ type: ActionType.FETCH_CITIES_SUCCESS, payload: data });
      } catch (err: unknown) {
        if (err instanceof Error) {
          dispatch({
            type: ActionType.REQUEST_FAILURE,
            payload: err.message
          });

          console.log("Could not fetch data.", err.message);
        }
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function (id: string) {
      if (id === currentCity?.id) return;

      try {
        dispatch({ type: ActionType.ACTIVATE_LOADING });

        const data = await fetchData<CityType>(`${BASE_URL}/cities/${id}`);

        dispatch({ type: ActionType.FETCH_CITY_SUCCESS, payload: data });
      } catch (err: unknown) {
        if (err instanceof Error) {
          dispatch({
            type: ActionType.REQUEST_FAILURE,
            payload: err.message
          });

          console.log("Could not fetch the city.", err.message);
        }
      } finally {
        dispatch({ type: ActionType.DEACTIVATE_LOADING });
      }
    },
    [currentCity?.id]
  );

  const addCity = async function (newCity: Omit<CityType, "id">) {
    try {
      dispatch({ type: ActionType.ACTIVATE_LOADING });

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCity)
      });

      const savedNewCity = await res.json();

      dispatch({ type: ActionType.ADD_CITY_SUCCESS, payload: savedNewCity });
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.REQUEST_FAILURE,
          payload: err.message
        });

        console.log("Could not add the city.", err.message);
      }
    } finally {
      dispatch({ type: ActionType.DEACTIVATE_LOADING });
    }
  };

  const deleteCity = async function (id: string) {
    try {
      dispatch({ type: ActionType.ACTIVATE_LOADING });

      await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });

      dispatch({ type: ActionType.DELETE_CITY_SUCCESS, payload: id });
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.REQUEST_FAILURE,
          payload: err.message
        });

        console.log("Could not delete the city.", err.message);
      }
    } finally {
      dispatch({ type: ActionType.DEACTIVATE_LOADING });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        addCity,
        deleteCity
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const ctx = useContext(CitiesContext);

  if (ctx === undefined)
    throw new Error("useCities must be used within a CitiesProvider.");

  return ctx;
}

export { CitiesProvider, useCities };
