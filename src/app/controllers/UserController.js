import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // caso queira retornar todos os campos, usar o codigo comentado abaixo
    // const user = await User.create(req.body);
    const { id, name, email, provider, password_hash } = await User.create(
      req.body
    );

    // caso queira retornar todos os campos, usar o codigo comentado abaixo
    // return res.json(user);
    return res.json({
      id,
      name,
      email,
      provider,
      password_hash,
    });
  }
}

export default new UserController();
