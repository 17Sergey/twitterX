import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";

import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import Sidebar from "./components/common/Sidebar/Sidebar";
import RightPanel from "./components/common/RightPanel/RightPanel";
import Notifications from "./pages/notifications/Notifications";
import ProfilePage from "./pages/profile/ProfilePage";
import ToasterModified from "./components/common/ToasterModified";

function App() {
    return (
        <div className="max-w-6xl mx-auto px-4 flex items-start">
            <Sidebar />
            <main className="border-x border-neutral w-full">
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
                        path="/profile/:username?"
                        element={<ProfilePage />}
                    />
                    <Route
                        path="/signup"
                        element={<SignupPage />}
                    />
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                </Routes>
            </main>
            <RightPanel />
            {/* For messages on screen */}
            <ToasterModified />
        </div>
    );
}

export default App;
