import { Button, Stack, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import { useAuth } from "../contexts/AuthContext";

import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { signWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signWithGoogle();
      navigate("/", { replace: "true" });
    } catch {
      alert("فشل تسجيل الدخول");
    }
  };

  return (
    <div
      style={{
        direction: "rtl",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          تسجيل الدخول / إنشاء حساب
        </Typography>
        <Button
          variant="contained"
          style={{ background: "gray", marginTop: "20px" }}
          onClick={handleSignIn}
        >
          <GoogleIcon style={{ marginLeft: "20px" }} />
          <Typography variant="h5"> استخدام حساب جوجل</Typography>
        </Button>
      </Stack>
    </div>
  );
};
