import { Link, useLocation } from "react-router-dom";
import "./publication.css";
import { Publish, Book } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import { userRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { addPublication } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const NewPublication = () => {
  const [books, setBooks] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const [price, setPrice] = useState("");
  const [bookState, setBookState] = useState("");
  const [publicationType, setPublicationType] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire
    setLoading(true);

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}&langRestrict=fr`
    );
    const data = await response.json();

    setLoading(false);
    setBooks(data.items || []);
    setSearchPerformed(true);
  };

  const handleBookSelect = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    if (book) {
      setSelectedBook(book.volumeInfo);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(true);

    try {
      // Recherche ou Création de la Catégorie
      const categoryName = selectedBook?.categories[0] ?? "Général"; // Assurez-vous qu'une catégorie est toujours définie
      let categoryId = await checkOrCreateCategory(categoryName);

      if (
        !selectedBook?.title ||
        !selectedBook?.authors ||
        !categoryId ||
        !bookState ||
        !publicationType
      ) {
        setErrorMessage("Tous les champs obligatoires doivent être remplis.");
        return;
      }
      setErrorMessage("");
      // Création du Livre
      const bookData = {
        // Vérifiez que toutes les données nécessaires sont présentes
        title: selectedBook?.title || "Titre inconnu",
        author: selectedBook?.authors?.join(", ") || "Auteur inconnu",
        description: selectedBook?.description || "",
        categoryId: categoryId,
        image: selectedBook?.imageLinks?.thumbnail || "",
      };
      const bookResponse = await userRequest.post("books", bookData);
      const bookId = bookResponse.data.id;

      // Création de la Publication
      const publicationData = {
        bookId: bookId,
        userId: user?.user?.id,
        comment: comment,
        price: price,
        bookState: bookState,
      };

      addPublication(publicationData, dispatch);

      alert("Publication créée avec succès !");
      navigate("/dashboard/publications"); // Redirection
    } catch (error) {
      alert("Erreur lors de la création de la publication.");
      console.error("Erreur lors de la création de la publication:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour vérifier ou créer une catégorie
  const checkOrCreateCategory = async (categoryName) => {
    try {
      // Rechercher la catégorie par son nom
      const searchResponse = await userRequest.get(
        `categories/search/${categoryName}`
      );
      if (searchResponse && searchResponse.data && searchResponse.data.id) {
        return searchResponse.data.id; // Retourner l'ID de la catégorie existante
      }
    } catch (error) {
      // Catégorie non trouvée, la créer
      if (error.response && error.response.status === 404) {
        const createResponse = await userRequest.post("categories", {
          name: categoryName,
        });
        return createResponse.data.id; // Retourner l'ID de la nouvelle catégorie
      } else {
        console.error(
          "Erreur lors de la recherche/création de la catégorie:",
          error
        );
      }
    }
  };

  return (
    <div className="publication">
      <div className="publicationTitleContainer">
        <h1 className="publicationTitle">Créer votre annonce</h1>
        <Link to="/newpublication">
          <button className="publicationAddButton">Mes annonces</button>
        </Link>
      </div>
      <div className="publicationTop">
        <div className="publicationTopRight">
          <form className="publicationForm" onSubmit={handleSearch}>
            <div className="publicationFormLeft">
              <div className="text-success">
                <label className="publicationFormLabel">
                  Rechercher simplifé de votre livre via l'API de GOOGLE
                </label>

                {searchPerformed && (
                  <div className="searchResultsIndicator">
                    Sélectionnez un livre dans les résultats de recherche :
                  </div>
                )}
              </div>
              <div className="searchContainer">
                <input
                  required
                  className="publicationFormInput"
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="Entrez le titre du livre"
                />
                {searchPerformed && (
                  <select
                    className="publicationFormSelect"
                    onChange={(e) => handleBookSelect(e.target.value)}
                  >
                    <option value="">Livres Recherchés</option>
                    {books.map((book) => (
                      <option key={book.id} value={book.id}>
                        {book.volumeInfo.title}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  type="submit"
                  className="searchButton"
                  disabled={!bookTitle.trim()}
                >
                  {loading ? <div className="loader"></div> : "Rechercher"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="publicationBottom">
        <form className="publicationForm" onSubmit={handleSubmit}>
          <div className="publicationFormLeft">
            <label className="publicationFormLabel">Créer votre annonce</label>
            <div className="searchContainer">
              <input
                className={`publicationFormInput ${
                  submitted && !selectedBook?.title ? "error" : ""
                }`}
                type="text"
                placeholder="Titre du Livre"
                value={selectedBook?.title}
              />
              <input
                className={`publicationFormInput ${
                  submitted &&
                  (!selectedBook?.authors || !selectedBook?.authors?.join(", "))
                    ? "error"
                    : ""
                }`}
                type="text"
                placeholder="Auteur"
                value={
                  selectedBook?.authors ? selectedBook?.authors?.join(", ") : ""
                }
              />
            </div>

            <div className="searchContainer">
              <input
                className={`publicationFormInput ${
                  submitted &&
                  (!selectedBook?.categories ||
                    !selectedBook?.categories.join(", "))
                    ? "error"
                    : ""
                }`}
                type="text"
                placeholder="Catégorie"
                value={
                  selectedBook?.categories
                    ? selectedBook?.categories.join(", ")
                    : "catégorie Non spécifiée"
                }
              />
              <select
                name="PublicationType"
                className={`publicationFormInput ${
                  submitted && !publicationType ? "error" : ""
                }`}
                value={publicationType}
                onChange={(e) => setPublicationType(e.target.value)}
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
                type="number"
                name="price"
                placeholder="prix en €"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <select
                className={`publicationFormInput ${
                  submitted && !bookState ? "error" : ""
                }`}
                name="bookState"
                id="bookState"
                value={bookState}
                onChange={(e) => setBookState(e.target.value)}
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
                value={selectedBook?.description}
                placeholder="Description du livre..."
              ></textarea>
              <textarea
                className="publicationFormTextarea"
                placeholder="Votre commentaire..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>

            <div className="publicationUpload">
              <img
                src={
                  selectedBook?.imageLinks
                    ? selectedBook?.imageLinks?.thumbnail
                    : ""
                }
                alt=""
                className="publicationUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </div>
          </div>

          <div className="publicationFormRight">
            <button className="publicationButton">
              {" "}
              {loading ? <div className="loader"></div> : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewPublication;
