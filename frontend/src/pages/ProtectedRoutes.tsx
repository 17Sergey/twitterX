import { Navigate, Outlet } from "react-router-dom";
import { UserType } from "../utils/dataTypes";

export default function ProtectedRoutes({ userAuth }: { userAuth: UserType | null | undefined }) {
    return userAuth ? <Outlet /> : <Navigate to="/login" />;
}
