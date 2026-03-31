import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import "./styles.css";
import api from "../../lib/api";

function TopBar() {
  const location = useLocation();
  const params = useParams();
  const [user, setUser] = useState({ first_name: "", last_name: "" });
  const [displayMode, setDisplayMode] = useState("Home");
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.userId) {
      setDisplayMode("Home");
      return;
    }
    api
      .get(`/user/${params.userId}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        if (location.pathname === `/users/${params.userId}`) {
          setDisplayMode("Details");
        } else if (location.pathname === `/users/${params.userId}/photos`) {
          setDisplayMode("Photos");
        }
      })
      .catch((error) => {
        console.error(error);
        navigate("/");
      });
  }, [location, params]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
          {displayMode === "Home"
            ? "Home"
            : `${user.first_name} ${user.last_name} ${displayMode}`}
        </Typography>
        <Button component={Link} to="/" color="inherit">
          Home page
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
