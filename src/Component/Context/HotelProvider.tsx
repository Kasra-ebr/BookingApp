import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
import { IHotel } from "../../Type/Type";
import { useSearchParams } from "react-router-dom";
import { getHotel } from "../../Server/server";

interface IPorvider {
    children: React.ReactNode,
}
interface IContext {
    hotels:  IHotel[]| null,
    error:string | null,
    isLoading:boolean,
    currentHotel:IHotel | null,
    setCurrentHotel: React.Dispatch<React.SetStateAction<IHotel | null>>,
}

const HotelContext = createContext<IContext>({
    hotels: null,
    error: null,
    isLoading: true,
    currentHotel: null,
    setCurrentHotel: () => {},
})

export const useHotelsContext = () => {
    return useContext(HotelContext)
}

export function HotelContextProvider ({children}:IPorvider)  {
    const [searchParams] = useSearchParams();
    const destination = searchParams.get("destination") || "";
    const optionsParam = searchParams.get("options");
    const room: number = optionsParam ? JSON.parse(optionsParam).room : 1;
    const {  data: hotels,  error, isLoading,  } = useFetch<IHotel[]>(`q=${destination}&accommodates_gte=${room}`);


    const [currentHotel, setCurrentHotel] = useState<IHotel | null>(null)



    return(
            <HotelContext.Provider value={{hotels, isLoading,error,setCurrentHotel,currentHotel}}>
                {children}
            </HotelContext.Provider>
    )
}