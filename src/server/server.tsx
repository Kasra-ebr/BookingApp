import axios from "axios";
import { IBookmark } from "../Type/Type";

// Create axios instance for API requests
const client = axios.create({
  baseURL: "http://localhost:3001",  // Ensure the base URL is correct
});

const geoClient = axios.create({
  baseURL: "https://api.bigdatacloud.net/data/reverse-geocode-client",
});

// Fetch hotels based on query
export async function getHotels(query: string) {
  const { data } = await client.get(`/hotels?${query}`);
  return data;
}

// Fetch a single hotel by ID
export async function getHotel(id: string) {
  const { data } = await client.get(`/hotels/${id}`);
  return data;
}

// Get location data based on latitude and longitude
export async function getLocationData(lat: number, lng: number) {
  const { data } = await geoClient.get(`/?latitude=${lat}&longitude=${lng}`);
  return data;
}

// Fetch a specific bookmark by ID
export async function getBookmarks(id: string) {
  const { data } = await client.get(`/bookmarks/${id}`);
  return data;
}

// Fetch all bookmarks
export async function getBookmark() {
  const { data } = await client.get(`/bookmarks`);
  return data;
}

// Create a new bookmark
export async function postCreateBookmark(newBookmark: IBookmark) {
  const { data } = await client.post(`/bookmarks`, newBookmark);
  return data;
}

// Delete a bookmark by ID
export async function deleteBookmarkByIds(id: string) {
  return await client.delete(`/bookmarks/${id}`);
}
