import { IconButton, Stack, Typography } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export const Header = () => {
  const { user, logout } = useAuth();
    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };


  return (
    <Stack
      direction={"row"}
      style={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <IconButton onClick={handleLogout}>
          <ExitToAppIcon style={{ fontSize: "35px", color: "red" }} />
        </IconButton>
        <IconButton>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Avatar"
              style={{ width: "35px", height: "35px", borderRadius: "50%" }}
            />
          ) : (
            <AccountCircleRoundedIcon style={{ fontSize: "35px" }} />
          )}
        </IconButton>
      </Stack>
      <Typography variant="h6">
        مرحبا : <strong>{user?.displayName}</strong>
      </Typography>
    </Stack>
  );
};
