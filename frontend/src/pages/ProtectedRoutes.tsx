import { Navigate, Outlet } from "react-router-dom";
import { UserType } from "../utils/dataTypes";

import MainWrapper from "../components/common/Layout/MainWrapper";

export default function ProtectedRoutes({ userAuth }: { userAuth: UserType | null | undefined }) {
    return userAuth ? (
        <MainWrapper>
            <Outlet />
        </MainWrapper>
    ) : (
        <Navigate to="/login" />
    );
}
