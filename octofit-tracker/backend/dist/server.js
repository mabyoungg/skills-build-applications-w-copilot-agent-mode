import 'dotenv/config';
import { app } from './app.js';
import { connectDatabase } from './config/database.js';
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
async function startServer() {
    await connectDatabase();
    app.listen(port, () => {
        console.log(`OctoFit Tracker API listening on ${baseUrl}`);
    });
}
startServer().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
});
