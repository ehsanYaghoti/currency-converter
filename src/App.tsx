import "./App.css";
import ConverterCard from "./components/converterCard";
import Header from "./components/header";

function App() {
  return (
    <div className=" flex flex-col w-full  font-inter ">
      <Header />
      <main className="flex flex-col px-4 md:px-10 lg:px-36 py-10 gap-10 bg-background min-h-[calc(100vh-72px)]">

        <div className="flex flex-col items-start gap-3 text-white">
            <h2 className="text-[clamp(.5rem,10vw,2.25rem)]  font-normal leading-10 ">Exchange currency rates widget</h2>
            <p className="text-sm font-light">Check live foreign currency exchange rates</p>
        </div>
        <ConverterCard />
      </main>
    </div>
  );
}

export default App;
