import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useAPI } from "../hooks/APIHook";
import { useToast } from "../hooks/ToastHook";
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
    const { request, error, clearError } = useAPI();
    const toast = useToast();

    const history = useHistory();
    async function createProduct(e) {
        e.preventDefault();

        const form = Array.from(new FormData(e.target).entries());
        const data = { };
        form.forEach((item) => { data[item[0]] = item[1] });

        const ans = await request("api/product/add", "POST", data);
        if(!ans) return;

        const elements = document.querySelectorAll(".animation");
        elements.forEach((elem) => elem.classList.add("animation-out"));

        setTimeout(() => history.push(`/admin`), elements.length > 0 ? 1000 : 0);
    }

    useEffect(() => {
        toast(error); clearError();
    }, [error, toast, clearError]);

    return (
        <>
            <Helmet title="Добавить товар < Название сайта"/>
            <div className="row animation">
                <div className="card col s10 offset-s1 m8 offset-m2 l6 offset-l3">
                    <form onSubmit={ createProduct }>
                        <div className="input-field">
                            <input name="title" type="text" placeholder="Название" required/>
                        </div>
                        <div className="input-field">
                            <input name="price" type="text" placeholder="Цена" required/>
                        </div>
                        <div className="input-field">
                            <input name="category" type="text" placeholder="Категория" required/>
                        </div>
                        <div className="input-field">
                            <input name="image" type="text" placeholder="Ссылка на изображение" required/>
                        </div>
                        <div className="input-field">
                            <textarea name="desc" placeholder="Описание" required/>
                        </div>
                        <button className="btn" type="submit">
                            Создать
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
