"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _StudentController = require('../controllers/StudentController'); var _StudentController2 = _interopRequireDefault(_StudentController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = _express.Router.call(void 0, );

router.get('/', _loginRequired2.default, _StudentController2.default.index);
router.post('/', _loginRequired2.default, _StudentController2.default.create);

router.get('/:id', _loginRequired2.default, _StudentController2.default.show);

router.put('/:id', _loginRequired2.default, _StudentController2.default.update);
router.delete('/:id', _loginRequired2.default, _StudentController2.default.delete);

exports. default = router;
