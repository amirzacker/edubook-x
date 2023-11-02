import './App.css';
import { Header, Footer } from "./components/organisms";
import { CardBook } from "./components/atoms";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <CardBook />
        <Footer />
      </header>
    </div>
  );
}

export default App;
