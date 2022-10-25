"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _blogController = require("../controllers/blog-controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var blogRouter = _express["default"].Router();

blogRouter.get("/", _blogController.getAllBlogs);
blogRouter.post("/add", _blogController.addBlog);
blogRouter.put("/update/:id", _blogController.updateBlog);
blogRouter.get("/:id", _blogController.getById);
blogRouter["delete"]("/:id", _blogController.deleteBlog);
blogRouter.get("/user/:id", _blogController.getByUserId);
var _default = blogRouter;
exports["default"] = _default;