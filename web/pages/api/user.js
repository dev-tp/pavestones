import { withIronSessionApiRoute } from 'iron-session/next';

import { ironSessionConfig } from '../../config';

function handler(request, response) {
  switch (request.method) {
    case 'GET':
      return response.json({ user: request.session.user || null });
    default:
      response.status(404).send({ error: 'Page not found.' });
  }
}

export default withIronSessionApiRoute(handler, ironSessionConfig);
