"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getByUserId = exports.deleteBlog = exports.getById = exports.updateBlog = exports.addBlog = exports.getAllBlogs = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Blog = _interopRequireDefault(require("../model/Blog"));

var _User = _interopRequireDefault(require("../model/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllBlogs = function getAllBlogs(req, res, next) {
  var blogs;
  return regeneratorRuntime.async(function getAllBlogs$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Blog["default"].find().populate("user"));

        case 3:
          blogs = _context.sent;
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", console.log(_context.t0));

        case 9:
          if (blogs) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: "No Blogs Found"
          }));

        case 11:
          return _context.abrupt("return", res.status(200).json({
            blogs: blogs
          }));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.getAllBlogs = getAllBlogs;

var addBlog = function addBlog(req, res, next) {
  var _req$body, title, description, image, user, existingUser, blog, session;

  return regeneratorRuntime.async(function addBlog$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, description = _req$body.description, image = _req$body.image, user = _req$body.user;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_User["default"].findById(user));

        case 4:
          existingUser = _context2.sent;
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](1);
          return _context2.abrupt("return", console.log(_context2.t0));

        case 10:
          if (existingUser) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Unable TO FInd User By This ID"
          }));

        case 12:
          blog = new _Blog["default"]({
            title: title,
            description: description,
            image: image,
            user: user
          });
          _context2.prev = 13;
          _context2.next = 16;
          return regeneratorRuntime.awrap(_mongoose["default"].startSession());

        case 16:
          session = _context2.sent;
          session.startTransaction();
          _context2.next = 20;
          return regeneratorRuntime.awrap(blog.save({
            session: session
          }));

        case 20:
          existingUser.blogs.push(blog);
          _context2.next = 23;
          return regeneratorRuntime.awrap(existingUser.save({
            session: session
          }));

        case 23:
          _context2.next = 25;
          return regeneratorRuntime.awrap(session.commitTransaction());

        case 25:
          _context2.next = 31;
          break;

        case 27:
          _context2.prev = 27;
          _context2.t1 = _context2["catch"](13);
          console.log(_context2.t1);
          return _context2.abrupt("return", res.status(500).json({
            message: _context2.t1
          }));

        case 31:
          return _context2.abrupt("return", res.status(200).json({
            blog: blog
          }));

        case 32:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 7], [13, 27]]);
};

exports.addBlog = addBlog;

var updateBlog = function updateBlog(req, res, next) {
  var _req$body2, title, description, blogId, blog;

  return regeneratorRuntime.async(function updateBlog$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
          blogId = req.params.id;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(_Blog["default"].findByIdAndUpdate(blogId, {
            title: title,
            description: description
          }));

        case 5:
          blog = _context3.sent;
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](2);
          return _context3.abrupt("return", console.log(_context3.t0));

        case 11:
          if (blog) {
            _context3.next = 13;
            break;
          }

          return _context3.abrupt("return", res.status(500).json({
            message: "Unable To Update The Blog"
          }));

        case 13:
          return _context3.abrupt("return", res.status(200).json({
            blog: blog
          }));

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 8]]);
};

exports.updateBlog = updateBlog;

var getById = function getById(req, res, next) {
  var id, blog;
  return regeneratorRuntime.async(function getById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_Blog["default"].findById(id));

        case 4:
          blog = _context4.sent;
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](1);
          return _context4.abrupt("return", console.log(_context4.t0));

        case 10:
          if (blog) {
            _context4.next = 12;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "No Blog Found"
          }));

        case 12:
          return _context4.abrupt("return", res.status(200).json({
            blog: blog
          }));

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

exports.getById = getById;

var deleteBlog = function deleteBlog(req, res, next) {
  var id, blog;
  return regeneratorRuntime.async(function deleteBlog$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_Blog["default"].findByIdAndRemove(id).populate("user"));

        case 4:
          blog = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(blog.user.blogs.pull(blog));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(blog.user.save());

        case 9:
          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](1);
          console.log(_context5.t0);

        case 14:
          if (blog) {
            _context5.next = 16;
            break;
          }

          return _context5.abrupt("return", res.status(500).json({
            message: "Unable To Delete"
          }));

        case 16:
          return _context5.abrupt("return", res.status(200).json({
            message: "Successfully Delete"
          }));

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 11]]);
};

exports.deleteBlog = deleteBlog;

var getByUserId = function getByUserId(req, res, next) {
  var userId, userBlogs;
  return regeneratorRuntime.async(function getByUserId$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          userId = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(_User["default"].findById(userId).populate("blogs"));

        case 4:
          userBlogs = _context6.sent;
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](1);
          return _context6.abrupt("return", console.log(_context6.t0));

        case 10:
          if (userBlogs) {
            _context6.next = 12;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: "No Blog Found"
          }));

        case 12:
          return _context6.abrupt("return", res.status(200).json({
            user: userBlogs
          }));

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

exports.getByUserId = getByUserId;