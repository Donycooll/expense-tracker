import { useAuth } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"


export const ProtectedRoute = ({children}) => {
    const {user} = useAuth()
    if(user) {return children} else {return <Navigate to="/login" />}
}
