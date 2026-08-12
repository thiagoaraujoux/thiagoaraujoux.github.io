import { cpSync, mkdirSync } from 'node:fs';

mkdirSync('dist/client', { recursive: true });
cpSync('dist/index.html', 'dist/client/index.html');
cpSync('dist/assets', 'dist/client/assets', { recursive: true });
cpSync('dist/og-v2.png', 'dist/client/og-v2.png');
cpSync('dist/og-sunset.png', 'dist/client/og-sunset.png');
cpSync('dist/abstract-flow.mp4', 'dist/client/abstract-flow.mp4');
cpSync('dist/favicon.png', 'dist/client/favicon.png');

mkdirSync('dist/server', { recursive: true });
cpSync('sites/worker.js', 'dist/server/index.js');
