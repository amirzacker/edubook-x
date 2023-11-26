import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { updatePublication } from "../../redux/apiCalls";
import "./publication.css";
import { userRequest } from "../../toolkit/requestMethods";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Card = styled.div`
  width: 1000px;
   min-height: 200px;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BoxCart = styled.div`
  width: 480px;
  height: 10%; 
  border-radius: 10px; 
  display: flex;
  flex-direction: column;
  align-items: center;  
`;

const BoxImage = styled.div`
  width: 500px;
  height: 100%;  
  border-radius: 10px; 
  display: flex;
  flex-direction: column; 
  margin:5px
`;

const BoxContainer = styled.div`
  width: 500px;
  height: 100%;  
  border-radius: 10px; 
  display: flex;
  flex-direction: column;
  align-items: center;
   margin:5px
`;


const BoxDiscription = styled.div`
  width: 430px;
  height: 50%;  
  border-radius: 10px; 
  display: flex;
  flex-direction: column;
  align-items: center; 
  padding: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
  border-radius: 10px;
`;
const Comment = styled.p`
  margin: 10px 0;
`;

const Price = styled.span`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Title = styled.span`
  font-weight: 900;
  font-size:30px;
  margin-bottom: 10px;
`;

const Description = styled.span` 
  font-size:17px;
  margin-bottom: 10px;
`;


// Importer les actions Redux si nécessaire

const DetailPublication = () => {
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

  // Charger les données de la publication 
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
        <h1 className="publicationTitle">Détail votre annonce</h1>
        <Link to="/dashboard/publications">
          <button className="publicationAddButton">Mes annonces</button>
        </Link>
      </div>
      <Link onClick={() => navigate(-1)}>
        <button className="publicationBackButton">Retour</button>
      </Link>
     <Container>
       
          <Card>
        <BoxImage>
            <Image src={formData.image} alt="Couverture" />
            
              <BoxCart>   
                 <Price>{`${formData.price} €`}</Price>
            </BoxCart>
            <BoxCart>   
                 <Link >
                     <button className="publicationAddButton">Ajoute Au Panier</button>
                 </Link> 
            </BoxCart>
        </BoxImage> 
            <BoxContainer>
                 <Title>{formData.title}</Title>
                <BoxDiscription><Description>{formData.description}</Description> </BoxDiscription> 
                
            </BoxContainer>
       
          </Card>
        
      </Container>
     
    </div>
  );
};

export default DetailPublication;
