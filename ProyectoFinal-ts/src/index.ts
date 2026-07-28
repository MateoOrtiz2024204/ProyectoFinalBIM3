import "dotenv/config";
import { server } from "./server";

const PORT = Number(process.env.PORT) || 3000;

server.listen(PORT, () => {
    console.log('===================================');
    console.log('Servidor iniciado');
    console.log(`http://localhost:${PORT}`); 
    console.log('===================================');
});
