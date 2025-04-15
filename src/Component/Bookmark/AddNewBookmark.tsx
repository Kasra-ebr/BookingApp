import React, { useEffect, useState } from 'react'
import Input from '../ComponentProps/Input'
import FormInput from '../ComponentProps/Form'
import Button from '../ComponentProps/Button'
import useUrlLocation from '../Hooks/useUrlLocation'
import { useNavigate } from 'react-router-dom'
import { getLocationData } from '../../Server/server'
import ReactCountryFlag from 'react-country-flag'

function AddNewBookmark() {
  const [lat, lng] = useUrlLocation()
  const navigate = useNavigate()
  const [cityName, setCityName] = useState<string>("")
  const [country, setCountry] = useState<string>('')
  const [countryCode, setCountryCode] = useState<string>("")
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState<boolean>(false)
  const [geoCodingError, setGeoCodingError] = useState<boolean |null>(null)

  useEffect(() => {
    if (!lat || !lng) return
    setIsLoadingGeoCoding(true)
    setGeoCodingError(null)

    getLocationData(lat, lng)
      .then((data) => {
        if (!data.countryCode) {
          throw new Error("This location is not a city! Please click somewhere else.")
        }
        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setCountryCode(data.countryCode) 
      })
      .catch((err) => {
        console.error("GeoCoding Error:", err)
        setGeoCodingError(err.message || "Something went wrong with geocoding.")
      })
      .finally(() => {
        setIsLoadingGeoCoding(false)
      })
  }, [lat, lng])

  const HandleSubmit = (e) => {
    e.preventDefault()
    if (!cityName && !country ) return
    const newBookmark= {
        cityName,
        country,
        countryCode,
        latitude: lat,
        longitude:lng,
        host_location: cityName+ " " +  country,

    }
  }

  if (isLoadingGeoCoding) return <div> laoding</div>;
  if (geoCodingError) return <div>{geoCodingError}</div>;
  return (
    <div>
      <h2> Bookmark New Location </h2>
      <FormInput className="form" onSubmit={HandleSubmit}>
        <div className='form_control'>
          <label> City Name</label>
          <Input
            type="text"
            name="cityname"
            id="cityname"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className='form_control'>
          <label> Country </label>
          <Input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        <div className='buttons'>
          <Button type="submit"> Add </Button>
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              navigate(-1)
            }}
          >
            Back
          </Button>
        </div>
      </FormInput>
    </div>
  )
}

export default AddNewBookmark
