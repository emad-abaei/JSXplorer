export const formatDate = (date: Date, type = "") => {
  const options: Intl.DateTimeFormatOptions =
    type === "long"
      ? {
          day: "numeric",
          month: "long",
          year: "numeric",
          weekday: "long"
        }
      : {
          day: "numeric",
          month: "short",
          year: "numeric"
        };

  return new Intl.DateTimeFormat("en", options).format(new Date(date));
};

export async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data.");
  const data = await res.json();
  return data;
}
