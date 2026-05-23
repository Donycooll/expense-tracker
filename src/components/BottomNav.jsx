import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Paper,
} from "@mui/material";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import AddIcon from "@mui/icons-material/Add";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import { useNavigate } from "react-router-dom";

export const BottomNav = ({ nav, setNav, setOpenAdd }) => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        width: "100%",
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        margin: "10px auto",
        zIndex: "1000",
        padding: "10px 5px",
      }}
    >
      <BottomNavigation
        value={nav}
        onChange={(event, newValue) => {
          setNav(newValue);
          if (newValue === "home") {
            navigate("/");
          } else if (newValue === "reports") {
            navigate("/reports");
          }
        }}
      >
        <Fab
          color="primary"
          style={{
            position: "absolute",
            top: -20,
            zIndex: 1,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <AddIcon onClick={() => setOpenAdd(true)} />
        </Fab>
        <BottomNavigationAction
          value={"reports"}
          label="التقارير"
          icon={<AssessmentRoundedIcon />}
        />
        <BottomNavigationAction
          value={"home"}
          label="الرئيسية"
          icon={<HomeRoundedIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};
