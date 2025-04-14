import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000",
});

export async function getHotels(query: string) {
  const { data } = await client.get(`/hotels?${query}`);
  return data;
}