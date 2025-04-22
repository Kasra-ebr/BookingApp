import {  useNavigate } from "react-router-dom";
import useUrlLocation from "../Hooks/useUrlLocation";
import { useEffect, useState } from "react";
import './../../App.css';
import axios from "axios";

import { BiLoader } from "react-icons/bi";
import Input from "../ComponentProps/Input";
import ReactCountryFlag from "react-country-flag";
import Button from "../ComponentProps/Button";
import { useBookmark } from "../Context/BookmarkProvider";
import FormInput from "../ComponentProps/Form";



const BASE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState<boolean>(false);
  const [geoCodingError, setGeoCodingError] = useState<string | null>(null);
  const { createBookmark } = useBookmark()

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);

      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );

        if (!data.countryCode) throw new Error("This location is not a city! Please click somewhere else.");

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error: any) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    fetchLocationData();
  }, [lat, lng]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityName.trim() || !country.trim()) {
      alert("Please enter both city and country.");
      return;
    }

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark");
  };

  if (isLoadingGeoCoding) return <BiLoader />;
  if (geoCodingError) return <strong>{geoCodingError}</strong>;

  return (
    <div>
      <h2>Bookmark New Location</h2>
      <FormInput className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="cityName">City Name</label>
          <Input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityName"
            id="cityName"
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <Input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="country"
            id="country"
          />
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>
        <div className="buttons">
          <Button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
           Back
          </Button>
          <Button className="btn btn--primary">Add</Button>
        </div>
      </FormInput>
    </div>
  );
}

export default AddNewBookmark;
