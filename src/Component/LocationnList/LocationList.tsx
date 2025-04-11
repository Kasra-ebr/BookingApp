import useFetch from "../Hooks/useFetch";

function LocationList() {
  const { error, location } = useFetch();

  return (
    <div className="nearbyLocation">
      <h2>Nearby Lcoation</h2>
      {error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div className="locationList">
          {location?.map((loc) => (
            <div className="locationItem" key={loc.id}>
              <img src={loc?.xl_picture_url} alt={loc?.name} />
              <div className="locationItemDesc">
                <p className="location">{loc.smart_location}</p>
                <span className="name">{loc?.name}</span>
                <p className="price">
                  €{loc?.price}
                  <span>/night </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationList;
