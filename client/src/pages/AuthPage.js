import React, { useContext }from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../context/AuthContext";
import * as md5 from "md5";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    function authenticate(e) {
        e.preventDefault();

        const form = Array.from(new FormData(e.target).entries());
        const data = { };
        form.forEach((item) => { data[item[0]] = item[1] });
        data["password"] = md5(data["password"]);

        auth.login(data);
    }

    return (
        <>
            <Helmet title="Авторизация < Название сайта"/>
            <div className="row animation">
                <div className="card col s10 offset-s1 m8 offset-m2 l6 offset-l3">
                    <form onSubmit={ authenticate }>
                        <div className="input-field">
                            <i className="material-icons prefix">account_box</i>
                            <input name="login" id="login" type="text" placeholder="Логин" required/>
                        </div>
                        <div className="input-field">
                            <i className="material-icons prefix">vpn_key</i>
                            <input name="password" id="password" type="password" placeholder="Пароль" required/>
                        </div>
                        <button className="btn" type="submit">
                            <i className="material-icons left">send</i> Войти
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
