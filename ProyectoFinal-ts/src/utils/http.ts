import { IncomingMessage, ServerResponse } from "http";

export function leerBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", chunk => (body += chunk));
        req.on("end", () => {
            if (!body) return resolve({});
            try {
                resolve(JSON.parse(body));
            } catch {
                reject(new Error("JSON invalido"));
            }
        });
        req.on("error", reject);
    });
}

export function enviarJSON(res: ServerResponse, status: number, data: unknown): void {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}

export function enviarError(res: ServerResponse, status: number, mensaje: string): void {
    enviarJSON(res, status, { error: mensaje });
}
