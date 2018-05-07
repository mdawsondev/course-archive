/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(1);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _app2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    this.tasks = [];
    this.init();
  }

  _createClass(App, [{
    key: "init",
    value: function init() {
      this.addTask();
      this.completeTask();
      this.removeTask();
      this.toggleAdd();
    }
  }, {
    key: "addTask",
    value: function addTask() {
      var _this = this;

      $("input[type='text']").keypress(function (e) {
        if (e.which === 13) {
          _this.tasks.push(e.currentTarget.value);
          _this.queueTask(_this.tasks[_this.tasks.length - 1]);
          e.currentTarget.value = '';
        }
      });
    }
  }, {
    key: "queueTask",
    value: function queueTask() {
      var queued = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "new task!";

      $('ul').append('<li class="tasks__task"><span class="tasks__remove"><i class="fa fa-trash" aria-hidden="true"></i></span> ' + queued + '</li>');
    }
  }, {
    key: "completeTask",
    value: function completeTask() {
      $('.tasks').on('click', '.tasks__task', function (e) {
        $(e.currentTarget).toggleClass('tasks--complete');
      });
    }
  }, {
    key: "removeTask",
    value: function removeTask() {
      $('.tasks').on('click', '.tasks__remove', function (e) {
        var task = $(e.currentTarget).parent();
        task.fadeOut(500, function () {
          return task.remove();
        });
        e.stopPropagation();
      });
    }
  }, {
    key: "toggleAdd",
    value: function toggleAdd() {
      $('.todo__icon').click(function () {
        $("input[type='text']").fadeToggle();
      });
    }
  }]);

  return App;
}();

exports.default = App;

/***/ })
/******/ ]);