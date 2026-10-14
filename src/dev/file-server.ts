import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ignoreIdsFilePath = path.join(__dirname, '..', 'data', 'ignoreIDs.json');

export function fileServer(): Plugin {
  return {
    name: 'local-file-server',
    apply: 'serve',

    configureServer(server) {
      server.middlewares.use('/api/ignored-ids', async (req, res) => {
        if (req.method && !['GET', 'POST'].includes(req.method)) {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        if (req.method === 'GET') {
          try {
            const currentData = JSON.parse(
              await readFile(ignoreIdsFilePath, 'utf-8')
            );

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                ids: currentData,
              })
            );
          } catch (error) {
            console.error('[File-Server] [GET] Error:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to read file' }));
          }
        } else if (req.method === 'POST') {
          try {
            const chunks: Buffer[] = [];

            for await (const chunk of req) {
              chunks.push(Buffer.from(chunk));
            }

            const receivedData = JSON.parse(
              Buffer.concat(chunks).toString('utf8')
            );

            await writeFile(
              ignoreIdsFilePath,
              JSON.stringify([...new Set(receivedData)].sort()),
              'utf8'
            );

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
              })
            );
          } catch (error) {
            console.error('[File-Server] [POST] Error:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to save file' }));
          }
        }
      });
    },
  };
}
