import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import UsersPage from "./pages/users/UsersPage";
import ProtectedRoutes from "./pages/ProtectedRoutes";

import Sidebar from "./components/common/Sidebar/Sidebar";
import RightPanel from "./components/common/RightPanel/RightPanel";
import ToasterModified from "./components/common/ToasterModified";
import LoadingSpinner from "./components/common/LoadingSpinner";

import { UserType } from "./utils/dataTypes";
import { QUERY_KEYS } from "./utils/queryKeys";
import { authAPI } from "./api/authAPI";

function App() {
    const { data, isLoading, isSuccess } = useQuery<UserType>({
        queryKey: [QUERY_KEYS.USER_AUTH],
        queryFn: authAPI.getMe,
        retry: false,
    });

    // If we log out and invalidate the query, then the retrieved data is an empty object {} and it still is a thuthy value.
    // So this trick with null helps us.
    const userAuth = isSuccess ? data : null;

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner className="loading-lg" />
            </div>
        );

    return (
        <div className="max-w-6xl mx-auto flex flex-start">
            {userAuth && <Sidebar />}
            <Routes>
                <Route element={<ProtectedRoutes userAuth={userAuth} />}>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/users"
                        element={<UsersPage />}
                    />
                    <Route
                        path="/notifications"
                        element={<NotificationsPage />}
                    />
                    <Route
                        path="/profile/:username?"
                        element={<ProfilePage />}
                    />
                </Route>
                <Route
                    path="/signup"
                    element={userAuth ? <Navigate to="/" /> : <SignupPage />}
                />
                <Route
                    path="/login"
                    element={userAuth ? <Navigate to="/" /> : <LoginPage />}
                />
            </Routes>
            {userAuth && <RightPanel />}
            {/* For messages(like "Created successfully" etc.) on screen */}
            <ToasterModified />
        </div>
    );
}

export default App;
