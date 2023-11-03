import './App.css';
import { Header, Footer } from "./components/organisms";
import { CardBook } from "./components/atoms";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <div className="main-content">
            <div className="card-container">
                <CardBook />
                <CardBook />
                <CardBook />
                <CardBook />
                <CardBook />
                <CardBook />

            </div>
        </div>
        <Footer />
      </header>
    </div>
  );
}

export default App;
