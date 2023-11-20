// App.js

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header, Footer } from "./components/organisms";
import { CardBook } from "./components/atoms";
import booksData from './booksData';
import Home from './pages/Home/Home';
import APropos from './pages/APropos/APropos';
import Livres from './pages/Livres/Livres';
import Contact from './pages/Contact/Contact';

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<Header />
					<Routes>
						<Route path="/" element={<Home books={booksData} />} />
						<Route path="/a-propos" element={<APropos />} />
						<Route path="/livres" element={<Livres books={booksData} />} />
						<Route path="/contact" element={<Contact />} />
					</Routes>
					<Footer />
				</header>
			</div>
		</Router>
	);
}

export default App;
