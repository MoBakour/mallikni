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
import NotFound from "./pages/NotFound";
import Layout from "./pages/Layout";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
    const { authorized, auth } = useAuthStore((state) => ({
        authorized: state.authorized,
        auth: state.auth,
    }));

    return (
        <div className="bg-slate-100 min-h-screen">
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                        path="/login"
                        element={
                            auth && authorized ? (
                                <Navigate to="/" />
                            ) : auth ? (
                                <Navigate to="/verify" />
                            ) : (
                                <Auth page="login" />
                            )
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            auth && authorized ? (
                                <Navigate to="/" />
                            ) : auth ? (
                                <Navigate to="/verify" />
                            ) : (
                                <Auth page="signup" />
                            )
                        }
                    />
                    <Route
                        path="/verify"
                        element={
                            !auth || authorized ? (
                                <Navigate to="/login" />
                            ) : (
                                <Auth page="login" />
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
                                    <Navigate to="/login" replace />
                                )
                            }
                        />
                        <Route
                            path="/my-properties"
                            element={
                                authorized ? (
                                    <MyProperties />
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            }
                        />
                        <Route
                            path="/new"
                            element={
                                authorized ? (
                                    <New />
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            }
                        />
                        <Route
                            path="/edit/:id"
                            element={
                                authorized ? (
                                    <New edit={true} />
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                authorized ? (
                                    <Settings />
                                ) : (
                                    <Navigate to="/login" replace />
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
