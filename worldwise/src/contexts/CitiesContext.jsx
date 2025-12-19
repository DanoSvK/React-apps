import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [currentCity, setCurrentCity] = useState({});
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/cities/${id}`);

      if (!res.ok) {
        throw new Error(`City ${id} not found`);
      }

      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
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
