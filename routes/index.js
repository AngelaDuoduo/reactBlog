var express = require('express');

var Category = require('../models/category.js');

/* GET home page. */
module.exports = function(app) {
	app.get('/', function(req, res, next) {
  		res.sendFile('index.html');
	});

	app.post('/xhr/upsertCategory', function(req, res) {
		return res.json({code: 200, data: req.body});
	});

	app.post('/xhr/deleteCategory', function(req, res) {
		return res.json({code: 200, data: req.body});
	});

	app.post('/xhr/upsertBlog', function(req, res) {
		return res.json({code: 200, data: req.body});
	});

	app.post('/xhr/deleteBlog', function(req, res) {
		return res.json({code: 200, data: req.body});
	});
}

