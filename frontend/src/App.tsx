import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';

import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import Test from './pages/Test';

function App() {
    return (
        <div className="flex max-w-6xl mx-auto">
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
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
