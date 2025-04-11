import axios from "axios";



const client = axios.create({
    baseURL:"http://localhost:3000",
})


export async function getHotels(){
    const {data} = await client("/hotels")
    return data
}
