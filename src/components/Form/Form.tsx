import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { DatePickerProps } from "react-datepicker";
import { useCities } from "../../contexts/CitiesContext";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { GEOCODING_URL } from "../../utils/constants";
import Button from "../Button";
import ButtonBack from "../ButtonBack";
import Flag from "../Flag";
import Spinner from "../Spinner";
import Message from "../Message";
import styles from "./Form.module.css";

function Form() {
  const [lat, lng] = useUrlPosition();
  const { addCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState<string>("");
  const [countryName, setCountryName] = useState<string>("");
  const [countryIsoCode, setCountryIsoCode] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());

  const [notes, setNotes] = useState<string>("");
  const [errorGeocoding, setErrorGeocoding] = useState<string>("");

  function handleCityName(e: ChangeEvent<HTMLInputElement>): void {
    setCityName(e.target.value);
  }

  function handleDate(date: Date | null): void {
    if (date) {
      setDate(date);
    }
  }

  function handleNotes(e: ChangeEvent<HTMLTextAreaElement>): void {
    setNotes(e.target.value);
  }

  useEffect(() => {
    if (lat == null || lng == null) return;

    async function fetchCityData(lat: number, lng: number) {
      try {
        setIsLoadingGeocoding(true);
        setErrorGeocoding("");

        const res = await fetch(
          `${GEOCODING_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        );

        if (!res.ok) throw new Error("Bad Request");

        const data = await res.json();

        if (!data.countryCode)
          throw new Error("Please click somewhere on a city.");

        setCityName(data.city || data.locality || "");
        setCountryName(data.countryName || "");
        setCountryIsoCode(data.countryCode || "");
      } catch (err) {
        setErrorGeocoding((err as Error).message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchCityData(lat, lng);
  }, [lat, lng]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country: countryName,
      countryIsoCode,
      date,
      notes,
      position: { lat, lng },
      id: Date.now() + Math.floor(Math.random() * 100).toString()
    };

    addCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (errorGeocoding) return <Message message={errorGeocoding} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => handleCityName(e)}
          value={cityName}
          aria-label='Enter the city name'
        />
        <Flag
          country={countryName}
          countryIsoCode={countryIsoCode}
          className={styles.flag}
        />
      </div>

      <div className={styles.row}>
        <label id='date-label' htmlFor='date'>
          When did you go to {cityName}?
        </label>
        {/* --- Workaround for TypeScript type incompatibility with react-datepicker.
        --- The props are temporarily cast to unknown and then to DatePickerProps to satisfy both TypeScript and ESLint. 
        --- This ensures type safety while avoiding explicit use of "any". */}
        <DatePicker
          {...({
            id: "date",
            selected: date,
            onChange: (date: Date | null) => handleDate(date),
            dateFormat: "MM/dd/yyyy",
            "aria-labelledby": "date-label"
          } as unknown as DatePickerProps)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => handleNotes(e)}
          value={notes}
          aria-label='Enter notes about your trip'
        />
      </div>

      <div className={styles.buttons}>
        <Button>Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
