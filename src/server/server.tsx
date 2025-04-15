import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000",
});

const geoClient = axios.create({
  baseURL: "https://api.bigdatacloud.net/data/reverse-geocode-client",
});
export async function getHotels(query: string) {
  const { data } = await client(`/hotels?${query}`);
  return data;
}
export async function getHotel(id: string) {
  const { data } = await client(`/hotels/${id}`);
  return data;
}

export async function getBookmarks(id: string) {
  const { data } = await client(`/bookmarks/${id}`);
  return data;
}

export async function getLocationData(lat: number, lng: number) {
  const { data } = await geoClient.get(`/?latitude=${lat}&longitude=${lng}`);
  return data;
}
