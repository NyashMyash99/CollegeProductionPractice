import React, { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Helmet } from "react-helmet";
import { useAPI } from "../hooks/APIHook";
import { useToast } from "../hooks/ToastHook";
import { useHistory } from "react-router-dom";

export const AdminPage = () => {
    const auth = useContext(AuthContext);
    const { request, error, clearError } = useAPI();
    const toast = useToast();

    const [products, setProducts] = useState([]);
    const addProducts = useCallback(async () => {
        const data = await request(`api/product/get`);
        if(!data) return;
        setProducts(p => [...p, ...data]);
    }, [request]);
    const removeProduct = useCallback(async (id) => {
        await request(`api/product/delete`, "POST", { id });

        const elements = document.querySelectorAll("table");
        elements.forEach((elem) => elem.classList.add("animation-out"));

        setTimeout(async () => {
            setProducts([]);
            await addProducts();

            elements.forEach((elem) => elem.classList.remove("animation-out"));
            elements.forEach((elem) => elem.classList.add("animation"));
            setTimeout(async () => {
                elements.forEach((elem) => elem.classList.remove("animation"));
            }, elements.length > 0 ? 1000 : 0);
        }, elements.length > 0 ? 1000 : 0);
    }, [request, addProducts]);
    function search(e) {
        const search = e.target.value.toLowerCase();
        const trs = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

        let find = false;
        for(const tr of trs) {
            tr.classList.add("hide");
            const tds = tr.getElementsByTagName("td");
            for(const td of tds)
                if(td.innerText.toLowerCase().includes(search)) {
                    tr.classList.remove("hide"); find = true;
                }
        }

        if(!find) document.getElementsByClassName("empty")[0].classList.remove("hide");
        else document.getElementsByClassName("empty")[0].classList.add("hide");
    }

    useEffect(() => {
        toast(error); clearError();
    }, [error, toast, clearError]);

    useEffect(() => {
        addProducts();
    }, [addProducts]);

    const history = useHistory();
    function lazyOpen(to) {
        const elements = document.querySelectorAll(".animation");
        elements.forEach((elem) => elem.classList.add("animation-out"));

        setTimeout(() => history.push(`/${ to }`), elements.length > 0 ? 1000 : 0);
    }

    return (
        <>
            <Helmet title="Панель администратора < Интернет магазин"/>
            <div className="card animation">
                <button className="btn" onClick={ () => lazyOpen("admin/create") }>
                    Добавить товар
                </button>
                <button className="btn" onClick={ () => auth.logout() }>
                    Выйти
                </button>
                <input type="text" className="search form-control" placeholder="Поиск" onKeyUp={ search }/>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Категория</th>
                        <th>Удалить</th>
                    </tr>
                    <tr className="empty hide">
                        <td colSpan="4">
                            <i className="fa fa-warning"/>Ничего не найдено
                        </td>
                    </tr>
                    </thead>

                    <tbody>
                        { products.map((item) =>
                            <tr key={ item._id }>
                                <td>{ item._id }</td>
                                <td>{ item.title }</td>
                                <td>{ item.price }₽</td>
                                <td>{ item.category }</td>
                                <td onClick={ () => { removeProduct(item._id) } }><i className="material-icons delete">backspace</i></td>
                            </tr>
                        ) }
                    </tbody>
                </table>
            </div>
        </>
    );
};
