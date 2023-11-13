import { Link, useLocation } from "react-router-dom";
import "./publication.css";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

const NewPublication = () => {
  const [books, setBooks] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [bookInfo, setBookInfo] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}`
    );
    const data = await response.json();
    setLoading(false);
    if (data.items && data.items.length > 0) {
      const book = data.items[0].volumeInfo;
      setBookInfo({
        title: book.title,
        description: book.description,
        image: book.imageLinks?.thumbnail,
      });
    } else {
      console.log("Aucun livre trouvé");
    }
  };

  const handleSubmit = () => {};

  useEffect(() => {
    const getApiBooks = async () => {
      try {
      } catch (err) {
        console.log(err);
      }
    };
    getApiBooks();
  }, []);

  return (
    <div className="publication">
      <div className="publicationTitleContainer">
        <h1 className="publicationTitle">Créer votre annonce</h1>
        <Link to="/newpublication">
          <button className="publicationAddButton">Mes annonces</button>
        </Link>
      </div>

      <div className="publicationBottom">
        <form className="publicationForm" onSubmit={handleSubmit}>
          <div className="publicationFormLeft">
            <label className="publicationFormLabel">Rechercher un Livre</label>
            <div className="searchContainer">
              <input
                className="publicationFormInput"
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Entrez le titre du livre"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="searchButton"
              >
                {loading ? <div className="loader"></div> : "Rechercher"}
              </button>
            </div>
            <div className="searchContainer">
              <input
                className="publicationFormInput"
                type="text"
                placeholder="Titre du Livre"
                value={bookInfo.title}
                readOnly
              />
              <input
                className="publicationFormInput"
                type="text"
                placeholder="Auteur"
                value={bookInfo.title}
                readOnly
              />
            </div>

            <div className="searchContainer">
              <select
                className="publicationFormSelect"
                name="inStock"
                id="idStock"
              >
                <option value="">categorie</option>
        
              </select>
              <select
                className="publicationFormSelect"
                name="inStock"
                id="idStock"
              >
                <option value="">Type d'annonce</option>
                <option value="exchange">Echange</option>
                <option value="donation">Don</option>
                <option value="sell">Vente</option>
              </select>
            </div>

            <div className="searchContainer">
              <input
                className="publicationFormInput"
                type="text"
                placeholder="Prix"
                value={bookInfo.title}
                readOnly
              />
              <select
                className="publicationFormSelect"
                name="inStock"
                id="idStock"
              >
                <option value="">Etat du livre</option>
                <option value="exchange">Neuf</option>
                <option value="sell">Usé</option>
                <option value="sell">Très usé</option>
              </select>
            </div>

            <div className="searchContainer">
              <textarea
                className="publicationFormTextarea"
                value={bookInfo.description}
                placeholder="Description du livre..."
                readOnly
              ></textarea>
              <textarea
                className="publicationFormTextarea"
                placeholder="Votre commentaire..."
                value={bookInfo.description}
                readOnly
              ></textarea>
            </div>

            <div className="publicationUpload">
              <img
                src={bookInfo.image}
                alt=""
                className="publicationUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
          </div>

          <div className="publicationFormRight">
            <button className="publicationButton">Créer</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewPublication;
