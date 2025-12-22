import { createContext, useContext, useEffect, useReducer } from "react";
const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "loadCities":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "getCity":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "addCity":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "deleteCity":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  // const [currentCity, setCurrentCity] = useState({});
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function loadCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "loadCities", payload: data });
      } catch (err) {
        console.error(err);
      } finally {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data",
        });
      }
    }

    loadCities();
  }, []);

  async function getCity(id) {
    // if city we wanna load is the current city (no need to load)
    // id is string, currentCity.id is a number
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);

      if (!res.ok) {
        throw new Error(`City ${id} not found`);
      }

      const data = await res.json();
      dispatch({ type: "getCity", payload: data });
    } catch (err) {
      console.error(err.message);
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      dispatch({ type: "addCity", payload: data });
    } catch {
      alert("There was an error adding a city");
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "deleteCity", payload: id });
    } catch {
      alert("There was an error deleting a city");
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");

  return context;
}

/* eslint-disable react-refresh/only-export-components */
export { CitiesProvider, useCities };
