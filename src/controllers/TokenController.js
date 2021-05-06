import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email = '', password } = req.body;

    if (!email || !password) { return res.status(400).json({ errors: ['Credenciais inválidas!'] }); }

    const user = await User.findOne({ where: { email } });

    if (!user) { return res.status(404).json({ errors: ['Usuário inexistente '] }); }

    if (!(await user.passwordIsValid(password))) { return res.status(400).json({ errors: ['Senha inválida'] }); }

    const { id } = user;

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: '1h',
    });

    return res.json(token);
  }
}

export default new TokenController();
