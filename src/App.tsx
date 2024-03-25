import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { PropertyList } from "./components/PropertyList";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <main className="flex flex-col min-h-dvh">
      <Header />
      <PropertyList />
      <Footer />
      <Toaster richColors />
    </main>
  );
}

export default App;
