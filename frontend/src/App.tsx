import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";

import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import Sidebar from "./components/common/Sidebar/Sidebar";
import RightPanel from "./components/common/RightPanel/RightPanel";
import Notifications from "./pages/notifications/Notifications";
import ProfilePage from "./pages/profile/ProfilePage";
import ToasterModified from "./components/common/ToasterModified";
import { useQuery } from "@tanstack/react-query";
import { authAPI } from "./api/authAPI";

import LoadingSpinner from "./components/common/LoadingSpinner";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import { UserType } from "./utils/dataTypes";
import { QUERY_KEYS } from "./utils/queryKeys";

function App() {
    const { data, isLoading, isError } = useQuery<UserType>({
        queryKey: [QUERY_KEYS.USER_AUTH],
        queryFn: authAPI.getMe,
        retry: false,
    });

    // If we log out and invalidate the query, then the retrieved data is an empty object {} and it still is a thuthy value.
    // So this trick with null helps us.
    const userAuth = isError ? null : data;

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner className="loading-lg" />
            </div>
        );

    return (
        <div className="max-w-6xl mx-auto px-4 flex items-start">
            {userAuth && <Sidebar />}
            <main className="w-full">
                <Routes>
                    <Route element={<ProtectedRoutes userAuth={userAuth} />}>
                        <Route
                            path="/"
                            element={<HomePage />}
                        />
                        <Route
                            path="/notifications"
                            element={<Notifications />}
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
            </main>
            {userAuth && <RightPanel />}
            {/* For messages on screen */}
            <ToasterModified />
        </div>
    );
}

export default App;
