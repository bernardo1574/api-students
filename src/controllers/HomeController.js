class HomeController {
  async index(req, res) {
    res.json('Index inicial');
  }
}

export default new HomeController();
