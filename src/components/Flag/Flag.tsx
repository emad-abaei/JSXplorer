import { FLAG_URL } from "../../utils/constants";
import styles from "./Flag.module.css";

interface FlagProps {
  country: string;
  countryIsoCode?: string;
  size?: string;
  className?: string;
}

function Flag({
  country,
  countryIsoCode,
  size = "24",
  className = ""
}: FlagProps) {
  if (!countryIsoCode) return null;

  const flagSrc = `${FLAG_URL}/w160/${countryIsoCode?.toLowerCase()}.png`;
  const fallbackSrc = `${FLAG_URL}/w160/un.png`; // United Nations flag as fallback

  return (
    <img
      src={flagSrc}
      onError={(e) => (e.currentTarget.src = fallbackSrc)}
      className={`${styles.img} ${className}`}
      style={{ maxWidth: `${size}px`, height: `${Number(size) * 0.75}px` }}
      alt={country ? `${country} flag` : ""}
      aria-hidden={!country}
    />
  );
}

export default Flag;
