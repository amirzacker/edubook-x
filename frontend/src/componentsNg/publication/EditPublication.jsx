import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { updatePublication } from "../../redux/apiCalls";
import "./publication.css";
import { userRequest } from "../../toolkit/requestMethods";
// Importer les actions Redux si nécessaire

const EditPublication = () => {
  // States pour les champs du formulaire
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: 0,
    bookState: "",
    comment: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { publicationId } = useParams(); // Récupérer l'ID de la publication depuis l'URL
  const dispatch = useDispatch();

  // Charger les données de la publication pour la mise à jour
  useEffect(() => {
    const fetchPublicationData = async () => {
      try {
        setLoading(true);
        const response = await userRequest.get(
          `/publications/${publicationId}`
        );
        const publication = response.data;
        setFormData({
          title: publication.book.title,
          author: publication.book.author,
          price: publication.price,
          bookState: publication.book_state,
          comment: publication.comment,
          description: publication.book.description,
          image: publication.book.image,
        });
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement de la publication:", error);
        setErrorMessage("Impossible de charger les données de la publication.");
        setLoading(false);
      }
    };
    fetchPublicationData();
  }, [publicationId, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "price" ? parseInt(value) || 0 : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Effectuer la requête de mise à jour
      // await userRequest.put(`/publications/${publicationId}`, formData);
      updatePublication(publicationId, formData, dispatch);
      console.log(formData);
      alert("Publication mise à jour avec succès !");
      navigate("/dashboard/publications"); // Rediriger vers la liste des publications
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la publication:", error);
      setErrorMessage("Erreur lors de la mise à jour de la publication.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // Cela ramènera l'utilisateur à la page précédente
  };

  return (
    <div className="publication">
      <div className="publicationTitleContainer">
        <h1 className="publicationTitle">Éditer votre annonce</h1>
        <Link to="/dashboard/publications">
          <button className="publicationAddButton">Mes annonces</button>
        </Link>
      </div>
      <Link onClick={() => navigate(-1)}>
        <button className="publicationBackButton">Retour</button>
      </Link>

      <div className="publicationBottom">
        <form className="publicationForm" id="editform" onSubmit={handleSubmit}>
          <div className="publicationFormLeft">
            {errorMessage && <p className="error">{errorMessage}</p>}
            <label>Titre du Livre</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />

            <label>Auteur</label>
            <input
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
            />

            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />

            <label>Commentaire</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              required
            />

            <label>Prix</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              required
            />

            <label>État du Livre</label>
            <select
              name="bookState"
              value={formData.bookState}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionner l'état</option>
              <option value="Neuf">Neuf</option>
              <option value="Usé">Usé</option>
              <option value="Très usé">Très usé</option>
            </select>

            {formData.image && (
              <div className="publicationUpload">
                <img
                  src={formData.image}
                  alt="Couverture du livre"
                  className="publicationUploadImg"
                />
                <label htmlFor="file">
                  <Publish />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
            )}
          </div>

          <div className="publicationFormRight">
            <button
              className="publicationButton"
              type="submit"
              disabled={loading}
            >
              {loading ? "Mise à jour en cours..." : "Mettre à jour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPublication;
