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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/js/admin/category_create.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/admin/category_create.js":
/*!***********************************************!*\
  !*** ./resources/js/admin/category_create.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const app = new Vue({\n  el: '#app',\n\n  data: {\n    rawCategories: categories,\n    inputTypeOptions: [{\n      label: 'Fractional Number',\n      value: 'fractionalNumber'\n    },\n    {\n      label: 'Complete Number',\n      value: 'completeNumber'\n    },\n    {\n      label: 'Text (One Line)',\n      value: 'textOneline'\n    },\n    {\n      label: 'Text (Multiline Line)',\n      value: 'textMultiline'\n    },\n    {\n      label: 'Select (One)',\n      value: 'selectOne'\n    },\n    {\n      label: 'Select (Multiple)',\n      value: 'selectMultiple'\n    }],\n\n    filterTypes: [{\n      label: 'Less Then or Equals',\n      value: 'lte'\n    }, {\n      label: 'Less Then',\n      value: 'lt'\n    }, {\n      label: 'Equals',\n      value: 'eq'\n    }, {\n      label: 'Greater Then',\n      value: 'gt'\n    }, {\n      label: 'Greater Then or Equals',\n      value: 'gte'\n    }],\n\n    // Category object which will be sent to the backend\n    category: {\n      categoryId: '',\n      name: '',\n      description: '',\n      seoDescription: '',\n      isLeaf: false,\n      properties: []\n    },\n\n    categoryDev: {\n      categoryId: '',\n      name: 'Mobile',\n      description: 'Category description goes here',\n      seoDescription: 'Subcategory description goes here',\n      isLeaf: true,\n      properties: [{\n        name: 'Storage',\n        required: true,\n        filterable: true,\n        hasUnits: true,\n        units: [{\n          label: 'MB',\n          printLabel: 'MB',\n          threshold: 1024,\n          nextLabel: 'GB'\n        }, {\n          label: 'GB',\n          printLabel: 'GB',\n          threshold: 1024,\n          nextLabel: 'TB'\n        }, {\n          label: 'TB',\n          printLabel: 'TB',\n          threshold: 1024,\n          nextLabel: 'PB'\n        }, {\n          label: 'PB',\n          printLabel: 'PB'\n        }],\n        filterChoices: [{\n          label: '1 GB',\n          value: '1 GB',\n          type: 'eq'\n        }],\n        input: {\n          type: 'fractionalNumber',\n          propertyChoices: []\n        }\n      }, {\n        name: 'RAM',\n        required: true,\n        filterable: false,\n        hasUnits: false,\n        input: {\n          type: 'fractionalNumber',\n          propertyChoices: []\n        },\n        units: [],\n        filterChoices: []\n      }, {\n        name: 'OS',\n        required: true,\n        filterable: true,\n        hasUnits: false,\n        units: [],\n        filterChoices: [],\n        input: {\n          type: 'selectOne',\n          propertyChoices: [{\n            label: 'Android',\n            value: 'android'\n          }, {\n            label: 'iOS',\n            value: 'ios'\n          }, {\n            label: 'Windows',\n            value: 'windows'\n          }]\n        }\n      }]\n    }\n  },\n\n  methods: {\n    saveCategory: function () {\n      console.log(JSON.stringify(this.category))\n      axios.post('/api/v1/category', this.category)\n        .then(result => {\n          console.log(result)\n          console.log(result.data)\n        })\n    },\n\n    // Property methods\n    addNewProperty: function () {\n      const categoryObject = {\n        name: '',\n        required: true,\n        hasUnits: false,\n        filterable: false,\n        filterChoices: [],\n        units: [],\n        input: {\n          type: 'fractionalNumber',\n          propertyChoices: []\n        }\n      }\n      this.category.properties.push(categoryObject)\n    },\n\n    removeProperty: function (index) {\n      this.category.properties.splice(index, 1)\n    },\n\n    // Input Choices methods\n    addNewChoice: function (property) {\n      const choiceObject = {\n        name: '',\n        value: ''\n      }\n\n      property.input.propertyChoices.push(choiceObject)\n    },\n\n    removeChoice: function (index, property) {\n      property.input.propertyChoices.splice(index, 1)\n    },\n\n    // Units\n    addUnit: function (property) {\n      const unitObject = {\n        label: '',\n        printLabel: '',\n        threshold: 10,\n        nextLabel: ''\n      }\n\n      property.units.push(unitObject)\n    },\n\n    removeUnit: function (index, units) {\n      units.splice(index, 1)\n    },\n\n    // Filters\n    addFilter: function (property) {\n      const filterObject = {\n        label: '',\n        printLabel: '',\n        type: ''\n      }\n      property.filterChoices.push(filterObject)\n    },\n\n    removeFilter: function (index, property) {\n      property.filterChoices.splice(index, 1)\n    }\n  },\n\n  computed: {\n    categories: function () {\n      const prefixParentName = (category) => {\n        if (!category.processed && category.categoryId) {\n          const parentCategory = this.rawCategories.find(c => c._id === category.categoryId)\n          if (parentCategory.categoryId && !parentCategory.processed) {\n            prefixParentName(parentCategory)\n          }\n          category.name = parentCategory.name + ' > ' + category.name\n          category.processed = true\n        }\n      }\n\n      return this.rawCategories.map(category => {\n        prefixParentName(category)\n        return category\n      })\n    }\n  }\n})\n\n\n//# sourceURL=webpack:///./resources/js/admin/category_create.js?");

/***/ })

/******/ });