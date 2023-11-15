import { Link, useLocation } from "react-router-dom";
import "./publication.css";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

const Publication = () => {
  const location = useLocation();
  const publicationId = location.pathname.split("/")[3];



  const publication = useSelector((state) =>
    state.publication.publications.find(
      (publication) => publication.id.toString() === publicationId
    )
  );

 

  return (
    <div className="publication">
    <div className="publicationTitleContainer">
      <h1 className="publicationTitle">Editer vore publication</h1>
      <Link to="/newpublication">
        <button className="publicationAddButton">Create</button>
      </Link>
    </div>

    <div className="publicationBottom">
      <form className="publicationForm">
        <div className="publicationFormLeft">
          <label className="publicationFormLabel">Publication Name</label>
          <input className="publicationFormInput" type="text" placeholder={publication.book.title} />
          
          <label className="publicationFormLabel">Publication Description</label>
          <textarea className="publicationFormTextarea" value={publication.comment}></textarea>
          
          <label className="publicationFormLabel">Price</label>
          <input className="publicationFormInput" type="text" placeholder={publication.price} />
          
          <label className="publicationFormLabel">Type</label>
          <select className="publicationFormSelect" name="inStock" id="idStock">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="publicationFormRight">
          <div className="publicationUpload">
            <img src={publication.img} alt="" className="publicationUploadImg" />
            <label htmlFor="file">
              <Publish />
            </label>
            <input type="file" id="file" style={{ display: "none" }} />
          </div>
          <button className="publicationButton">Update</button>
        </div>
      </form>
    </div>
  </div>
);
};

export default Publication;
