import "./publicationList.css";
import { DataGrid } from "@material-ui/data-grid";

import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePublication, getPublications } from "../../redux/apiCalls";

const PublicationList = () => {
  const dispatch = useDispatch();
  const publications = useSelector((state) => state.publication.publications);

  useEffect(() => {
    getPublications(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deletePublication(id, dispatch);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "comment",
      headerName: "Commentaire",
      flex: 1,
      renderCell: (params) => (
        <div className="publicationListItem">
          {/* Utilisez params.row pour accéder aux données de la ligne */}
          <img
            className="publicationListImg"
            src={params.row.book.image}
            alt=""
          />
          {params.row.comment}
        </div>
      ),
    },
    { field: "book_state", headerName: "État du Livre", flex: 1 },
    {
      field: "price",
      headerName: "Prix",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/dashboard/publications/" + params.row.id}>
              <button className="publicationListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="publicationListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="publicationTitleContainer">
        <h1 className="publicationTitle">Mes Annonces</h1>
        <Link to="/dashboard/publications/new">
          <button className="publicationAddButton">Nouvelle annonce</button>
        </Link>
      </div>
      <div className="publicationList">
        <DataGrid
          rows={publications}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={10}
          rowsPerPageOptions={[8, 10, 20, 50, 100]}
          checkboxSelection
          autoHeight
        />
      </div>
    </>
  );
};

export default PublicationList;
