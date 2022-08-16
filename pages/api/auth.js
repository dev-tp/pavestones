import { withIronSessionApiRoute } from 'iron-session/next';
import bcrypt from 'bcrypt';

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

      const user = await database.collection('user').findOne({ username });

      if (!user) {
        return response
          .status(403)
          .send({ error: 'Incorrect username or password.' });
      }

      const match = await bcrypt.compare(password, user.hash);

      if (match) {
        request.session.user = user;
        await request.session.save();

        return response.send({ user });
      }

    default:
      response.status(404).send({ error: 'Page not found.' });
  }
}

export default withIronSessionApiRoute(handler, ironSessionConfig);
