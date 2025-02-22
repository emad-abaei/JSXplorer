import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
import Flag from "../Flag";
import { CityType } from "../../types";
import { formatDate } from "../../utils/helper";
import { IoClose } from "react-icons/io5";
import styles from "./CityItem.module.css";

interface CityItemProps {
  city: CityType;
}

function CityItem({ city }: CityItemProps) {
  const { cityName, country, countryIsoCode, date, id } = city;

  const { currentCity, deleteCity } = useCities();

  function handleClick(e: MouseEvent): void {
    e.preventDefault();
    if (window.confirm("Are you sure?")) deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${city.position.lat}&lng=${city.position.lng}`}>
        <Flag country={country} countryIsoCode={countryIsoCode} />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={handleClick}
          aria-label={`Delete ${cityName}`}>
          <IoClose size={14} />
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
