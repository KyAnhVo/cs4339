import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import {
  Typography,
  ImageList,
  ImageListItem,
  ListItem,
  ListItemText,
  ButtonBase,
  Paper,
  Divider,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import api from "../../lib/api";
import { List } from "@mui/material";

function UserPhoto({ photo }) {
  return (
    <>
      <ListItem>
        <List>
          <ListItem>
            <img
              src={`../../images/${photo.file_name}`}
              style={{
                maxHeight: 400,
                objectFit: "contain",
              }}
              loading="lazy"
            />
          </ListItem>
          {(photo.comments || []).map((comment) => (
            <>
              <Divider />
              <ListItem key={`photo-${photo._id}-comment-${comment._id}`}>
                <ListItemText
                  primary={
                    <Link to={`/users/${comment.user._id}`}>
                      {comment.user.first_name + " " + comment.user.last_name}
                    </Link>
                  }
                  secondary={comment.comment}
                />
              </ListItem>
            </>
          ))}
        </List>
      </ListItem>
      <Divider />
    </>
  );
}

function UserPhotos() {
  const params = useParams();
  const [photos, setPhotos] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/photosOfUser/${params.userId}`)
      .then((response) => {
        setPhotos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        navigate("/");
      });
  }, [params]);

  return (
    <Box sx={{ maxHeight: "100%", overflowY: "auto" }}>
      <List>
        {photos.map((photo) => (
          <UserPhoto key={`photo-${photo._id}`} photo={photo} />
        ))}
      </List>
    </Box>
  );
}

UserPhotos.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPhotos;
