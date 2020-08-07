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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/js/admin/category_list.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/admin/category_list.js":
/*!*********************************************!*\
  !*** ./resources/js/admin/category_list.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const app = new Vue({\n  el: '#app',\n\n  data: {\n    categories: categories,\n    meta: meta,\n\n    // UI Data\n    currentPageNo: 1\n  },\n\n  methods: {\n    getCategories (pageNo) {\n      axios.get('/api/v1/category', {\n        params: { pageNo }\n      })\n        .then(result => {\n          this.categories = result.data.categories\n          this.meta = result.data.meta\n        })\n    },\n\n    destroy (id) {\n      console.log(id)\n      Swal.fire({\n        title: 'Are you sure?',\n        text: \"You won't be able to revert this!\",\n        icon: 'warning',\n        showCancelButton: true,\n        confirmButtonColor: '#3085d6',\n        cancelButtonColor: '#d33',\n        confirmButtonText: 'Yes, delete it!'\n      }).then((result) => {\n        if (result.value) {\n          axios.delete(`/api/v1/category/${id}`)\n            .then(result => {\n              console.log('Output:', result.data)\n              Swal.fire(\n                'Deleted!',\n                'Your category has been deleted.',\n                'success'\n              )\n              this.getCategories(this.meta.pageNo)\n            })\n        }\n      })\n    },\n\n    getSerial (number) {\n      return ((this.meta.pageNo - 1) * this.meta.pageSize) + number + 1\n    }\n  },\n\n  computed: {\n    pagination: function () {\n      return {\n        totalPages: Math.ceil(this.meta.total / this.meta.pageSize),\n        currentPage: this.meta.pageNo\n      }\n    }\n  }\n})\n\n\n//# sourceURL=webpack:///./resources/js/admin/category_list.js?");

/***/ })

/******/ });