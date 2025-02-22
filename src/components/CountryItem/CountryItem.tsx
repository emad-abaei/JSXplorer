import Flag from "../Flag";
import styles from "./CountryItem.module.css";

interface CountryItemProps {
  country: string;
  countryIsoCode: string;
}

function CountryItem({ country, countryIsoCode }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <Flag country={country} countryIsoCode={countryIsoCode} size='28' />
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
