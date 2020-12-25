import { Router } from "express";
import * as md5 from "md5";

const router = Router();

const users = {
    "admin": md5("password")
};

router.post("/check", async (req, res) => {
    if(!req.body || !req.body.login || !req.body.password) return res.status(406).json({ message: `Данные не отправлены.` });
    if(!users[req.body.login]) return res.status(404).json({ message: `Аккаунт с логином ${ req.body.login } не найден.` });
    if(users[req.body.login] != req.body.password) return res.status(404).json({ message: `Пароль указан неверно.` });
    return res.send({ login: req.body.login, password: users[req.body.login] });
});

export const AccountRouter = router;