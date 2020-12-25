import React from "react";
import { AuthContext } from "./context/AuthContext";
import { Helmet } from "react-helmet";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/AuthHook";
import { useRoutes } from "./routes";

export const App = () => {
    const { login, logout, account } = useAuth();
    const routes = useRoutes(account);

    return (
        <AuthContext.Provider value={{ login, logout, account }}>
            <Helmet title="Все товары < Интернет магазин"/>
            <BrowserRouter>
                <div className="app">
                    <nav>
                        <div className="container">
                            <div className="menu">
                                Название компании
                            </div>
                        </div>
                    </nav>
                    <div className="container">
                        { routes }
                    </div>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};