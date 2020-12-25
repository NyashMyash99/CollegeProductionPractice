import React, { useState, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useAPI } from "../hooks/APIHook";
import { useToast } from "../hooks/ToastHook";
import { useHistory } from "react-router-dom";

export const ProductsPage = () => {
    const { request, error, clearError } = useAPI();
    const toast = useToast();

    const [categories, setCategories] = useState([]);
    const addCategories = useCallback(async () => {
        const data = await request(`api/category/get`);
        if(!data) return;
        setCategories(data);
    }, [request]);

    const [products, setProducts] = useState([]);
    const addProducts = useCallback(async (skip, category) => {
        const data = await request(`api/product/get?category=${ category }&count=5&skip=${ skip }`);
        if(!data) return;
        setProducts(p => [...p, ...data]);
    }, [request]);

    const [category, setCategory] = useState("");
    const changeCategory = useCallback((category) => {
        const elements = document.querySelectorAll(".animation");
        elements.forEach((elem) => elem.classList.add("animation-out"));

        setTimeout(() => {
            setCategory(category);
            setProducts([]);
            addProducts(0, category);

            elements.forEach((elem) => elem.classList.remove("animation-out"));
        }, elements.length > 0 ? 1000 : 0);
    }, [addProducts]);

    const history = useHistory();
    function lazyOpen(to) {
        const elements = document.querySelectorAll(".animation");
        elements.forEach((elem) => elem.classList.add("animation-out"));

        setTimeout(() => history.push(`/${ to }`), elements.length > 0 ? 1000 : 0);
    }

    useEffect(() => {
        addCategories();
        addProducts(0, "");
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        toast(error); clearError();
    }, [error, toast, clearError]);

    return (
        <>
            <Helmet title="Все товары < Интернет магазин"/>
            <div className="products">
                { products.map((item) =>
                    <div className="product animation" onClick={ () => { lazyOpen(item._id) } } style={{ backgroundImage: `url(${ item.image })` }} key={ item._id }>
                        <div className="price">
                            { item.price }₽
                        </div>
                        <div className="title">
                            { item.title }
                        </div>
                    </div>
                ) }
                <div className="product animation more" onClick={ () => { addProducts(products.length, category) } }>
                    <i className="material-icons large">redo</i>
                </div>
            </div>
            <div className="fixed-action-btn animation">
                <div className="btn-floating btn-large" onMouseEnter={ () => {
                    const elements = document.querySelectorAll(".category");
                    elements.forEach((elem) => elem.classList.add("animation"));

                    document.getElementsByClassName("fixed-action-btn")[0].classList.add("active");

                    setTimeout(() => {
                        elements.forEach((elem) => elem.classList.remove("animation"));
                    }, elements.length > 0 ? 1000 : 0);
                }}>
                    <i className="large material-icons">search</i>
                </div>
                <ul id="categories" onMouseLeave={ () => {
                    const elements = document.querySelectorAll(".category");
                    elements.forEach((elem) => elem.classList.add("animation-out"));

                    setTimeout(() => {
                        document.getElementsByClassName("fixed-action-btn")[0].classList.remove("active");
                        elements.forEach((elem) => elem.classList.remove("animation-out"));
                    }, elements.length > 0 ? 1000 : 0);
                }}>
                    <li onClick={ () => changeCategory("") }>
                        <div className="category">Все</div>
                    </li>
                    { categories.map((item) =>
                        <li key={ item._id } onClick={ () => changeCategory(item._id) }>
                            <div className="category">{ item._id }</div>
                        </li>
                    ) }
                </ul>
            </div>
        </>
    );
};
