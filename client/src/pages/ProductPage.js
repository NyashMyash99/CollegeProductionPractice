import React, { useState, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useAPI } from "../hooks/APIHook";
import { useToast } from "../hooks/ToastHook";
import { useHistory } from "react-router-dom";

export const ProductPage = () => {
    const [product, setProduct] = useState({ });
    const { request, error, clearError } = useAPI();
    const toast = useToast();

    const history = useHistory();
    const addProduct = useCallback(async () => {
        const data = await request(`api/product/get?id=${ history.location.pathname.substring(1) }`);
        if(!data) return;
        setProduct(data);
    }, [request, history.location.pathname]);

    useEffect(() => {
        addProduct();
    }, [addProduct]);

    useEffect(() => {
        toast(error); clearError();
    }, [error, toast, clearError]);

    return (
        <>
            <Helmet title={ `${ product.title } < Интернет магазин` }/>
            <div className="card product animation">
                <div className="title">
                    { product.title } <span className="small">(#{ product._id })</span>
                </div>
                <hr/>
                <div className="content">
                    <div className="information">
                        <img className="photo materialboxed" src={ product.image } alt="Фотография товара"/>
                        <div className="contact btn tooltipped" data-position="bottom" data-tooltip="Нажмите, чтобы связаться с продавцом" onClick={ () => { window.open("https://vk.me/nyashmyash99") } }>
                            { product.price }₽
                        </div>
                    </div>
                    <div className="desc">
                        { product.description }
                    </div>
                </div>
            </div>
        </>
    );
};