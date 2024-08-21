import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";

import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import Sidebar from "./components/common/Sidebar/Sidebar";
import RightPanel from "./components/common/RightPanel/RightPanel";
import Test from "./pages/Test";
import Notifications from "./pages/notifications/Notifications";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
    return (
        <div className="max-w-6xl mx-auto px-4">
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route
                    path="/notifications"
                    element={<Notifications />}
                />
                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />
                <Route
                    path="/sidebar"
                    element={<Sidebar />}
                />
                <Route
                    path="/right"
                    element={<RightPanel />}
                />
                <Route
                    path="/signup"
                    element={<SignupPage />}
                />
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/test"
                    element={<Test />}
                />
            </Routes>
        </div>
    );
}

export default App;
