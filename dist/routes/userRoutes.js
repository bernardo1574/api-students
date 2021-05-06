"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = _express.Router.call(void 0, );

router.post('/', _UserController2.default.create);

// router.get('/', loginRequired, userController.index);

router.get('/details/', _loginRequired2.default, _UserController2.default.show);
router.put('/', _loginRequired2.default, _UserController2.default.update);

// router.delete('/:id', loginRequired, userController.delete); // não é necessário

exports. default = router;
