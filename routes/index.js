var express = require('express');
var router = express.Router();
var settings = require('../settings');

var Category = require('../models/category.js');

/* GET home page. */
module.exports = function(app) {

	app.get('/', function(req, res, next) {
  		res.sendFile('index.html');
	});

	app.post('/xhr/upsertCategory', function(req, res) {
		var category = req.body.category;
		Category.getSingleDoc({	
			name: category.name
		}, function(err, category) {
			if (err) {
				return res.json({code: 400, errorMsg: '操作失败'});
			} 
			if (category) {
				return res.json({code: 400, errorMsg: '该分类已存在'});
			}

			category.save(function(err, category) {
				if (err) {
					return res.json({code: 400, errorMsg: '操作失败'});
				}
				return res.json({code: 200});
			})
		})
	});

	app.get('/xhr/getCategoryById', function(req, res) {
		var categoryId = req.categoryId;
		Category.getSingleDoc({
			categoryId: categoryId
		}, function(err, category) {
			if (err) {
				res.json({code: 400, errorMsg: '操作失败'});
			}
			return res.json({code: 200, data: category});
		});
	});
}

