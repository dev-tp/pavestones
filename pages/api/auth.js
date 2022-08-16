import { withIronSessionApiRoute } from 'iron-session/next';

import { connection } from '../../lib/mongodb';
import { ironSessionConfig } from '../../config';

async function handler(request, response) {
  switch (request.method) {
    case 'DELETE':
      await request.session.destroy();
      return response.json({ user: null });
    case 'POST':
      const { database } = await connection();
      const { password, username } = request.body;

      const result = await database
        .collection('user')
        .find({ password, username })
        .toArray();

      if (Object.keys(result).length === 0) {
        return response
          .status(403)
          .send({ error: 'Incorrect username or password.' });
      }

      request.session.user = result[0];
      await request.session.save();

      return response.send({ user: result[0] });
    default:
      response.status(404).send({ error: 'Page not found.' });
  }
}

export default withIronSessionApiRoute(handler, ironSessionConfig);
