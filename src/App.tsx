import "./App.css";
import Header from "./Component/Header/Header";
import LocationList from "./Component/LocationnList/LocationList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <LocationList />
    </QueryClientProvider>
  );
}

export default App;
