import http from "http";
import { router } from "./routes/router";
import { enviarError } from "./utils/http";

export const server = http.createServer((req, res) => {
    router(req, res).catch(() => enviarError(res, 500, "Error interno del servidor"));
});
