import "./App.css";
import { Route, Routes } from "react-router-dom";

import {ThemeProvider, createTheme} from "@mui/material/styles";

import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DataContextProvider } from "./contexts/DataContext";
import { TransactionsPage } from "./components/TransactionsPage";
import { ReportsPage } from "./components/ReportsPage";

const theme = createTheme({
  typography: {
    fontFamily: ["ReadexPro"],
  },
});

function App() {
  return (
    <AuthProvider>
      <DataContextProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <TransactionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </DataContextProvider>
    </AuthProvider>
  );
}

export default App;
