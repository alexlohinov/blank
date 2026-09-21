import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFile, stat } from 'node:fs/promises';
import { getPage, notFoundPage, replaceMetadata } from './src/site.ts';

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), {
    name: 'static-pages',
    transformIndexHtml(html, context) {
      return replaceMetadata(html, getPage(new URL(context.originalUrl ?? context.path, 'http://localhost').pathname));
    },
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const path = new URL(request.url ?? '/', 'http://localhost').pathname;
        if (/\.[^/]+$/.test(path) && !path.endsWith('.html')) return next();
        const page = getPage(path);
        if (!['GET', 'HEAD'].includes(request.method ?? '') || (page === notFoundPage && !request.headers.accept?.includes('text/html'))) return next();
        try {
          const template = await readFile(new URL('./index.html', import.meta.url), 'utf8');
          const html = await server.transformIndexHtml(path, template);
          response.statusCode = page === notFoundPage ? 404 : 200;
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end(request.method === 'HEAD' ? undefined : html);
        } catch (error) { next(error); }
      });
    },
    configurePreviewServer(server) {
      // Run after static-file resolution, preserving a real 404 status.
      return () => server.middlewares.use(async (request, response, next) => {
        if (!['GET', 'HEAD'].includes(request.method ?? '')) return next();
        try {
          const path = new URL(request.url ?? '/', 'http://localhost').pathname;
          const existingFile = await stat(new URL(`./dist${path}`, import.meta.url)).catch(() => null);
          if (existingFile?.isFile()) return next();
          const html = await readFile(new URL('./dist/404.html', import.meta.url), 'utf8');
          response.statusCode = 404;
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end(request.method === 'HEAD' ? undefined : html);
        } catch (error) { next(error); }
      });
    },
  }],
});
