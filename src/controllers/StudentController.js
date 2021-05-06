import multer from 'multer';
import Student from '../models/Student';
import Photo from '../models/Photo';
import multerConfig from '../config/multer';
import deleteFile from '../services/deletePhtos';

const upload = multer(multerConfig).single('wallpaper');

class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      attributes: { exclude: ['created_at', 'updatedAt'] },
      order: [['id', 'DESC']],
      include: {
        model: Photo,
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

        const student = await Student.findOne({ where: { email: data.email } });

        if (student) {
          if (req.file) { deleteFile(req.file.path); }
          return res.status(400).json({ errors: ['Student exists'] });
        }

        const insertStudent = await Student.create(data);
        if (req.file) {
          const insertPhoto = {
            originalname: req.file.originalname,
            filename: req.file.filename,
            student_id: insertStudent.id,
          };

          await Photo.create(insertPhoto);
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
      const student = await Student.findByPk(id, {
        attributes: { exclude: ['created_at', 'updatedAt'] },
        order: [['id', 'DESC']],
        include: {
          model: Photo,
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
      const student = await Student.findByPk(id);

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
      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(400).json({ errors: ['Student is not found'] });
      }
      await Student.destroy({ where: { id: req.params.id } });

      return res.json({ success: true });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new StudentController();
