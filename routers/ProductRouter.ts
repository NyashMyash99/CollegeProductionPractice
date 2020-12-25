import { Router } from "express";
import { Product } from "../models/Product";

const router = Router();

router.get("/get", async (req, res) => {
    try {
        if(req.query["id"]) return res.send(await Product.findOne({ _id: req.query["id"] }).select("-__v"));

        res.send(await Product.find({ category: req.query["category"] || /.*/ })
            .select("-description -__v")
            .sort("-_id")
            .limit(parseInt(req.query["count"]) || 0)
            .skip(parseInt(req.query["skip"]) || 0)
        );
    } catch (e) {
        await res.status(500).json({ message: "Ошибка при получении товара." });
        console.log("[!] Ошибка при получении товара: ", e.message);
    }
});

router.post("/add", async (req, res) => {
    if(!req.body) return res.status(400).json({ message: "Данные не отправлены." });
    if(!req.body.title) return res.status(406).json({ message: "Название товара не отправлено." });
    if(!req.body.desc) return res.status(406).json({ message: "Описание товара не отправлено." });

    if(!req.body.price) return res.status(406).json({ message: "Цена товара не отправлена." });

    const price = parseInt(req.body.price);
    if(!price) return res.status(406).json({ message: "Цена должна быть числом." });
    if(price <= 0) return res.status(406).json({ message: "Цена должна быть положительной." });

    if(!req.body.category) return res.status(406).json({ message: "Категория товара не отправлена." });
    if(!req.body.image) return res.status(406).json({ message: "Ссылка на фотографию не отправлена." });

    try {
        await new Product({
            _id: Date.now(),
            title: req.body.title,
            description: req.body.desc,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image
        }).save();
        await res.status(201).json({ message: "Товар успешно добавлен." });
    } catch (e) {
        await res.status(500).json({ message: "Ошибка при добавлении товара." });
        console.log("[!] Ошибка при добавлении товара: ", e.message);
    }
});

router.post("/delete", async (req, res) => {
    if(!req.body) return res.status(400).json({ message: "Данные не отправлены." });
    if(!req.body.id) return res.status(406).json({ message: "ID товара не отправлено." });

    try {
        const product = await Product.findByIdAndDelete(parseInt(req.body.id));
        if(!product) return res.status(404).json({ message: `Товар с ID ${ req.body.id } не найден.` });
        await res.status(200).json({ message: "Товар успешно удалён." });
    } catch (e) {
        await res.status(500).json({ message: "Ошибка при удалении товара." });
        console.log("[!] Ошибка при добавлении товара: ", e.message);
    }
});

export const ProductRouter = router;