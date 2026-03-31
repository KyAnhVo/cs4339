import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import PersonIcon from "@mui/icons-material/Person";

import "./styles.css";
import api from "../../lib/api";

function UserItem({ user }) {
  return (
    <ListItem>
      {/* name */}
      <ListItemText
        primary={user.first_name + " " + user.last_name}
        sx={{ flexGrow: 1 }}
      />

      {/* images */}
      <ListItemButton
        sx={{ flexGrow: 0 }}
        component="a"
        href={`/users/${user._id}/photos`}
      >
        <ListItemIcon>
          <ImageIcon />
        </ListItemIcon>
      </ListItemButton>

      {/* profile */}
      <ListItemButton
        sx={{ flexGrow: 0 }}
        component="a"
        href={`/users/${user._id}`}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/user/list").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div>
      <Typography variant="h2" sx={{ flexGrow: 1, textAlign: "center" }}>
        Users
      </Typography>
      <Divider />
      <Divider />
      <List component="nav">
        {users.map((user) => (
          <>
            <UserItem user={user} />
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
}

export default UserList;
