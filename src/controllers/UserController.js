import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create(req.body);
      return res.json(newUser);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const data = await User.findAll();
      const users = data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }));

      return res.json(users);
    } catch (error) {
      return res.status(500).json(null);
    }
  }

  async show(req, res) {
    try {
      const data = await User.findByPk(req.userId);
      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
      };
      return res.json(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    try {
      if (!req.userId) {
        return res.status(400).json({ errors: ['Usuário inexistente'] });
      }
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ errors: ['Usuário inexistente'] });
      }

      await user.update(req.body, { where: { id: req.userId } });

      return res.json({ success: 'Dados atualizados com sucesso!' });
    } catch (error) {
      return res.json(error);
    }
  }

  async delete(req, res) {
    try {
      return res.json({ success: 'Delete não ativado' });
    //   if (!req.params.id) {
    //     return res.status(400).json({ errors: ['Usuário inexistente'] });
    //   }
    //   await User.destroy({ where: { id: req.params.id } });
    //   return res.json({ success: true });
    } catch (error) {
      return res.status(400).json({ success: true });
    }
  }
}

export default new UserController();
