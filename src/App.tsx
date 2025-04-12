import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header/Header";
import LocationList from "./Component/LocationnList/LocationList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./Component/AppLayout/AppLayout";
import Hotels from "./Component/Hotels/Hotels";


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />}/>
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels/>}/>
          <Route path="id" element={<div> single div</div>}/>
        
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
