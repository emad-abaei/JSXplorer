import { useCities } from "../../contexts/CitiesContext";
import CountryItem from "../CountryItem";
import Spinner from "../Spinner";
import Message from "../Message";
import styles from "./CountryList.module.css";

interface UniqueCountry {
  country: string;
  countryIsoCode: string;
}

function CountryList() {
  const { cities, isLoading } = useCities();

  const uniqueCountries = cities.reduce<UniqueCountry[]>((acc, city) => {
    const { country, countryIsoCode } = city;

    // Avoid duplicates
    if (!acc.some((item) => item.countryIsoCode === countryIsoCode)) {
      acc.push({ country, countryIsoCode });
    }
    return acc;
  }, []);

  if (isLoading) return <Spinner />;

  if (!uniqueCountries.length)
    return <Message message='Add your first city by clicking on the map.' />;

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country) => (
        <CountryItem
          country={country.country}
          countryIsoCode={country.countryIsoCode}
          key={country.countryIsoCode}
        />
      ))}
    </ul>
  );
}

export default CountryList;
