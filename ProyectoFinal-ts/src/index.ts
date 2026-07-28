import "dotenv/config";
import { server } from "./server";

const PORT = Number(process.env.PORT) || 3000;

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
