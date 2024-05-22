import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Body />
        <Footer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
