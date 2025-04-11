import { useRef, useState } from "react";
import "./../../App.css";
import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import useOutsideClick from "../Hooks/useOutsideClick";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import Input from "../ComponentProps/Input";
import Button from "../ComponentProps/Button";

function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="header-Icon locationIcon" />
          <span className="seprator"></span>
          <Input
            name="destination"
            placeholder="where to go"
            type="text"
            id="destination"
            value={destination}
            className="headerSearchInput"
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <span className="seprator"></span>
        <div className="headerSearchItem">
          <HiCalendar className="date-icon header-Icon" />
          <div onClick={() => setOpenDate(!openDate)}>
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )} `}
          </div>
          {openDate && (
            <DateRange
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              className="date"
              moveRangeOnFirstSelection={true}
            />
          )}
        </div>
        <span className="seprator"></span>
        <div
          id="optionDropDown"
          onClick={() => setOpenOptions(true)}
          className="headerSearchItem"
        >
          <span>
            {options.children} children &bull; {options.adult} adult &bull;
            {options.room} room
          </span>
          {openOptions && (
            <GuestOptionList
              options={options}
              setOpenOptions={setOpenOptions}
              handleOptions={handleOptions}
            />
          )}
        </div>
        <span className="seprator"></span>
        <div className="headerSearchItem">
          <Button className="headerSearchBtn">
            <HiSearch className="search-icon header-Icon" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({ options, setOpenOptions, handleOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false)); // Close dropdown when clicking outside

  const OptionItems = [
    { type: "adult", minLimit: 1 },
    { type: "children", minLimit: 0 },
    { type: "room", minLimit: 1 },
  ];

  return (
    <div className="guestOptions" ref={optionsRef}>
      {OptionItems.map((item) => (
        <OptionItem
          key={item.type}
          handleOptions={handleOptions}
          type={item.type}
          options={options}
          minLimit={item.minLimit}
        />
      ))}
    </div>
  );
}
function OptionItem({ options, minLimit, type, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>

      <div className="optionCounter">
        <Button
          onClick={() => handleOptions(type, "dec")}
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </Button>
        <span className="optionCounterNumber">{options[type]}</span>
        <Button
          onClick={() => handleOptions(type, "inc")}
          className="optionCounterBtn"
        >
          <HiPlus className="icon" />
        </Button>
      </div>
    </div>
  );
}
