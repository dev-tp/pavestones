import express from 'express';
import fs from 'fs';
import https from 'https';

import { handler } from './build/handler.js';

const router = express();

router.get('/healthcheck', (_, response) => response.end('ok'));
router.use(handler);

https
	.createServer(
		{
			cert: fs.readFileSync('server.crt'),
			key: fs.readFileSync('server.key')
		},
		router
	)
	.listen(443);
