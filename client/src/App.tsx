import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import useAuthStore from "./stores/auth.store";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Auth from "./pages/Auth";
import Feed from "./pages/Feed";
import Property from "./pages/Property";
import Favorites from "./pages/Favorites";
import MyProperties from "./pages/MyProperties";
import New from "./pages/New";
import Settings from "./pages/Settings";
import ChangeEmail from "./pages/ChangeEmail";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";
import Layout from "./pages/Layout";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
    const authorized = useAuthStore((state) => state.authorized);

    return (
        <div className="bg-slate-100 min-h-screen">
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                        path="/login"
                        element={
                            authorized ? (
                                <Navigate to="/" />
                            ) : (
                                <Auth page="login" />
                            )
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            authorized ? (
                                <Navigate to="/" />
                            ) : (
                                <Auth page="signup" />
                            )
                        }
                    />

                    <Route path="/" element={<Layout />}>
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/privacy-policy"
                            element={<PrivacyPolicy />}
                        />
                        <Route path="/find" element={<Feed />} />
                        <Route path="/property/:id" element={<Property />} />
                        <Route
                            path="/favorites"
                            element={
                                authorized ? (
                                    <Favorites />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/my-properties"
                            element={
                                authorized ? (
                                    <MyProperties />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/new"
                            element={
                                authorized ? <New /> : <Navigate to="/login" />
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                authorized ? (
                                    <Settings />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/change-email"
                            element={
                                authorized ? (
                                    <ChangeEmail />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/change-password"
                            element={
                                authorized ? (
                                    <ChangePassword />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
