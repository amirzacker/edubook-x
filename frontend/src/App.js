import './App.css';
import { Header, Footer } from "./components/organisms";
import { CardBook } from "./components/atoms";
import booksData from './booksData';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Header />
				<div className="main-content">
					<div className="card-container">
						{booksData.map((book, index) => (
							<CardBook key={index} title={book.title} price={book.price} image={book.image} />
						))}
					</div>
				</div>
				<Footer />
			</header>
		</div>
	);
}

export default App;
