import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    // utilizado Yup para fazer validações de entrada de dados
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    // validacao Yup
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations Fails.' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // caso queira retornar todos os campos, usar o codigo comentado abaixo
    // const user = await User.create(req.body);
    const { id, name, email, provider } = await User.create(req.body);

    // caso queira retornar todos os campos, usar o codigo comentado abaixo
    // return res.json(user);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    // utilizado Yup para fazer validações de entrada de dados
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
    });

    // validacao Yup
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations Fails.' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }
    // verifica se a senha antiga esta preenchida, se tiver é que quer trocar a senha
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
