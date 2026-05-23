import "./App.css";
import { Route, Routes } from "react-router-dom";

import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DataContextProvider } from "./contexts/DataContext";
import { TransactionsPage } from "./components/TransactionsPage";

function App() {
  return (
    <AuthProvider>
      <DataContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </DataContextProvider>
    </AuthProvider>
  );
}

export default App;
