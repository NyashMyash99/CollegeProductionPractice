import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ProductsPage } from "./pages/ProductsPage";
import { AuthPage } from "./pages/AuthPage";
import { ProductPage } from "./pages/ProductPage";
import { AdminPage } from "./pages/AdminPage";
import { CreatePage } from "./pages/CreatePage";

export const useRoutes = (account) => {
    if(!account.login)
        return (
            <Switch>
                <Route path="/" component={ ProductsPage } exact/>
                <Route path="/admin" component={ AuthPage } exact/>
                <Route path="/:id" component={ ProductPage } exact/>
                <Redirect to="/"/>
            </Switch>
        );

    return (
        <Switch>
            <Route path="/" component={ ProductsPage } exact/>
            <Route path="/admin" component={ AdminPage } exact/>
            <Route path="/admin/create" component={ CreatePage } exact/>
            <Route path="/:id" component={ ProductPage } exact/>
            <Redirect to="/"/>
        </Switch>
    );
};
