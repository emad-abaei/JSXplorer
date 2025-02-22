export type NavLinkType = {
  path: string;
  label: string;
  className?: string;
};

export type LatLngType = {
  lat: number;
  lng: number;
};

export type CityType = {
  cityName: string;
  country: string;
  countryIsoCode: string;
  date: Date;
  notes?: string;
  position: LatLngType;
  id: string;
};

export type UserType = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type PositionType = [lat: number, lng: number];
