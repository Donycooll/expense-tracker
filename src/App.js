import "./App.css";
import { Route, Routes } from "react-router-dom";

import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DataContextProvider } from "./contexts/DataContext";
import { TransactionsPage } from "./components/TransactionsPage";
import { ReportsPage } from "./components/ReportsPage";

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
      </DataContextProvider>
    </AuthProvider>
  );
}

export default App;
