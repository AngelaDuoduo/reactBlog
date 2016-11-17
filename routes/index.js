var express = require('express');

var Category = require('../models/category.js');

var categoryId = 2,
	blogId = 2;

var categoryList = [{
	id: 1,
    parentId: -1,
    name: '默认分类',
    blogNum: 1,
    isDefault: true,
    createTime: 1472006259800,
    isActive: true,
    isEditing: false
}];

var blogList = [];

/* GET home page. */
module.exports = function(app) {
	app.get('/', function(req, res, next) {
  		res.sendFile('index.html');
	});

	app.post('/xhr/getCategoryList', function(req, res) {
		return res.json({code: 200, data: categoryList});
	});

	app.post('/xhr/upsertCategory', function(req, res) {
		var category = req.body;
		if (category.id == 0) {
			category.id = categoryId++;
			categoryList.push(category);
		} else {
			categoryList.forEach(function(item, index) {
				if (item.id == category.id) {
					item.name = category.name;
				}
			});
		}
		
		return res.json({code: 200, data: category});
	});

	app.post('/xhr/deleteCategory', function(req, res) {
		categoryList = categoryList.filter(function(category){
			return category.id != req.body.id;
		});
		return res.json({code: 200, data: req.body});
	});

	app.post('/xhr/getBlogList', function(req, res) {
		return res.json({code: 200, data: blogList});
	});

	app.post('/xhr/upsertBlog', function(req, res) {
		var blog = req.body;
		if (blog.id == 0) {
			blog.id = blogId++;
			blogList.push(blog);
		} else {
			blogList.forEach(function(item, index) {
				if (item.id == blog.id) {
					item.name = blog.name;
					item.content = blog.content;
				}
			});
		}
		
		return res.json({code: 200, data: blog});
	});

	app.post('/xhr/deleteBlog', function(req, res) {
		blogList = blogList.filter(function(blog) {
			return blog.id != req.body.id;
		});
		return res.json({code: 200, data: req.body});
	});

	app.post('/xhr/deletBlogsByCategoryId', function(req, res) {
		console.log(req.body);
		blogList = blogList.filter(function(blog) {
			return blog.categoryId != req.body.categoryId;
		});
		return res.json({code: 200});
	});
}

