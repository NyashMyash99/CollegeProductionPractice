import { Router } from "express";
import { Product } from "../models/Product";

const router = Router();

router.get("/get", async (req, res) => {
    try {
        res.send(await Product.aggregate([{ $group : { _id : "$category" } }]));
    } catch (e) {
        await res.status(500).json({ message: "Ошибка при получении категорий." });
        console.log("[!] Ошибка при получении категорий: ", e.message);
    }
});

export const CategoryRouter = router;