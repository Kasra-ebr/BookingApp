import { useRef, useState } from "react";
import "./../../App.css";
import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import useOutsideClick from "../Hooks/useOutsideClick";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import Input from "../ComponentProps/Input";
import Button from "../ComponentProps/Button";
import { IoHomeSharp } from "react-icons/io5";
import {
  createSearchParams,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

// ---------------- Interfaces ----------------
interface IOptions {
  adult: number;
  children: number;
  room: number;
}

interface IDate {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface GuestOptionListProps {
  options: IOptions;
  setOpenOptions: (open: boolean) => void;
  handleOptions: (name: keyof IOptions, operation: "inc" | "dec") => void;
}

interface IOptionItem {
  type: keyof IOptions;
  minLimit: number;
}

interface IOptionItems {
  options: IOptions;
  minLimit: number;
  type: keyof IOptions;
  handleOptions: (name: keyof IOptions, operation: "inc" | "dec") => void;
}

// ---------------- Header Component ----------------
function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState<string>(
    searchParams.get("destination") || ""
  );
  console.log(destination, "des");
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [options, setOptions] = useState<IOptions>({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState<IDate[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  const searchHandler = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    setSearchParams(encodedParams);
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  const handleOptions = (name: keyof IOptions, operation: "inc" | "dec") => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "inc" ? prev[name] + 1 : prev[name] - 1,
    }));
  };

  return (
    <div className="header">
      <NavLink
        to="/bookmark"
        className={'bookmarks active'
        }
      >
        Bookmarks
      </NavLink>
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
            )}`}
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

        {/* Guest Options */}
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
          <Button className="headerSearchBtn" onClick={searchHandler}>
            <HiSearch className="search-icon header-Icon" />
          </Button>
        </div>
        <Button className="btn btn--primary" onClick={() => navigate("/")}>
            <IoHomeSharp size={18}/>
        </Button>
      </div>
    </div>
  );
}

export default Header;

// ---------------- GuestOptionList ----------------
function GuestOptionList({
  options,
  setOpenOptions,
  handleOptions,
}: GuestOptionListProps) {
  const optionsRef = useRef<HTMLDivElement>(null);
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));

  const OptionItems: IOptionItem[] = [
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

function OptionItem({ options, minLimit, type, handleOptions }: IOptionItems) {
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
