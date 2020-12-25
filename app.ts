import * as ex from "express";
import * as DB from "mongoose";
import { APIRouter } from "./routers/APIRouter";
import { port, dbHost, dbPort, dbUser, dbPassword, dbName } from "./config";

const app = ex();
app.use(ex.json({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
app.use("/api", APIRouter);

app.listen(port, async () => {
    try {
        DB.set("useFindAndModify", false);

        await DB.connect(`mongodb://${ dbUser }:${ dbPassword }@${ dbHost }:${ dbPort }/${ dbName }`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (e) {
        console.log(`[!] Ошибка при подключении к базе данных: ${ e.message }.`);
        process.exit(1);
    }
    console.log(`[!] API сайта успешно запущено на порту ${ port }.`);
});
 
