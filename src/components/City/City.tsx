import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
import Spinner from "../Spinner";
import ButtonBack from "../ButtonBack";
import Flag from "../Flag";
import { formatDate } from "../../utils/helper";
import styles from "./City.module.css";

function City() {
  const { id } = useParams();
  const { isLoading, getCity, currentCity } = useCities();

  useEffect(
    function () {
      if (id) getCity(id);
    },
    [id, getCity]
  );

  if (isLoading || !currentCity) return <Spinner />;

  const { cityName, country, countryIsoCode, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <Flag country={country} countryIsoCode={countryIsoCode} size='40' />{" "}
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date, "long")}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`Learn more about ${cityName} on Wikipedia (opens in a new tab)`}>
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
