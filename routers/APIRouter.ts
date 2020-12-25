import { Router } from "express";
import { ProductRouter } from "./ProductRouter";
import { CategoryRouter } from "./CategoryRouter";
import { AccountRouter } from "./AccountRouter";

const router = Router();

router.use("/product", ProductRouter);
router.use("/category", CategoryRouter);
router.use("/account", AccountRouter)

export const APIRouter = router;