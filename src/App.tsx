import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { PropertyList } from "./components/PropertyList";

function App() {
  return (
    <main className="flex flex-col min-h-dvh">
      <Header />
      <PropertyList />
      <Footer />
    </main>
  );
}

export default App;
