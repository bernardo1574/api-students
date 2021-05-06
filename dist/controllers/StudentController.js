"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _deletePhtos = require('../services/deletePhtos'); var _deletePhtos2 = _interopRequireDefault(_deletePhtos);

const upload = _multer2.default.call(void 0, _multer4.default).single('wallpaper');

class StudentController {
  async index(req, res) {
    const students = await _Student2.default.findAll({
      attributes: { exclude: ['created_at', 'updatedAt'] },
      order: [['id', 'DESC']],
      include: {
        model: _Photo2.default,
        attributes: ['url', 'originalname', 'filename'],
      },
    });
    return res.json(students);
  }

  create(req, res) {
    try {
      return upload(req, res, async (error) => {
        if (error) {
          return res.status(400).json({ errors: [error.code] });
        }
        if (!req.body) {
          return res.status(400).json({ errors: ['Preencha todos os campos'] });
        }

        const data = {
          name: req.body.name,
          email: req.body.email,
          age: req.body.age,
          weight: req.body.weight,
          height: req.body.height,
        };

        const student = await _Student2.default.findOne({ where: { email: data.email } });

        if (student) {
          if (req.file) { _deletePhtos2.default.call(void 0, req.file.path); }
          return res.status(400).json({ errors: ['Student exists'] });
        }

        const insertStudent = await _Student2.default.create(data);
        if (req.file) {
          const insertPhoto = {
            originalname: req.file.originalname,
            filename: req.file.filename,
            student_id: insertStudent.id,
          };

          await _Photo2.default.create(insertPhoto);
        }

        return res.json({ success: 'Dados inseridos com sucesso' });
      });
    } catch (e) {
      return res.status(400).json({
        errors: e,
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID is required'],
        });
      }
      const student = await _Student2.default.findByPk(id, {
        attributes: { exclude: ['created_at', 'updatedAt'] },
        order: [['id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'originalname', 'filename'],
        },
      });

      if (!student) {
        return res.status(400).json({ errors: ['Student is not found'] });
      }

      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID is required'],
        });
      }
      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return res.status(400).json({ errors: ['Student is not found'] });
      }

      await student.update(req.body, { where: { id } });

      const newStudent = {
        id: student.id,
        name: student.name,
        email: student.email,
        age: student.age,
        weight: student.weight,
        height: student.height,
      };

      return res.json(newStudent);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID is required'],
        });
      }
      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return res.status(400).json({ errors: ['Student is not found'] });
      }
      await _Student2.default.destroy({ where: { id: req.params.id } });

      return res.json({ success: true });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new StudentController();
