import Flag from "../Flag";
import styles from "./CountryItem.module.css";

interface CountryItemProps {
  country: string;
  countryIsoCode: string;
}

function CountryItem({ country, countryIsoCode }: CountryItemProps) {
  return (
    <li className={styles.countryItem} role='listitem'>
      <Flag country={country} countryIsoCode={countryIsoCode} size='28' />
      <p>{country}</p>
    </li>
  );
}

export default CountryItem;
