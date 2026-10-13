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
      server.middlewares.use('/api/save', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        try {
          const chunks: Buffer[] = [];

          for await (const chunk of req) {
            chunks.push(Buffer.from(chunk));
          }

          const receivedData = JSON.parse(
            Buffer.concat(chunks).toString('utf8')
          );

          const currentData = JSON.parse(
            await readFile(ignoreIdsFilePath, 'utf-8')
          );

          const updatedData = JSON.stringify(
            [...new Set(currentData.concat(receivedData))].sort(),
            null,
            0
          );

          await writeFile(ignoreIdsFilePath, updatedData, 'utf8');

          const response = JSON.stringify({
            ids: updatedData,
          });

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(response);
        } catch {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Failed to save file' }));
        }
      });
    },
  };
}
