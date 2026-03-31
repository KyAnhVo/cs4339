import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import api from "../../lib/api";
import {} from "@mui/material";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    api.get(`/user/${userId}`).then((res) => {
      setUser(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <Typography variant="h2">
        {user.first_name + " " + user.last_name}
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary={"Location"} secondary={user.location} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={"Description"} secondary={user.description} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={"Occupation"} secondary={user.occupation} />
        </ListItem>
      </List>
    </>
  );
}

export default UserDetail;
