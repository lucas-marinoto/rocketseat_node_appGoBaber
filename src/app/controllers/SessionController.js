import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      // erro 401 acesso não autorizado
      res.status(401).json({ error: 'User not found.' });
    }
    // validação se senha digitada bateu com a do banco. Foi criado um método na classe do User.js
    // para fazer esta validação com o compare, o qual retorna true se bateu. No caso abaixo é negado
    // para saber se não bateu mostrar o erro
    if (!(await user.checkPassword(password))) {
      res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id, name, email }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
