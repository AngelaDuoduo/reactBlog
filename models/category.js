var mongodb = require('./db');

function Category(category) {
	this.categoryId = category.categoryId;
	this.name = category.name;
	this.parentId = category.parentId;
	this.taskNum = category.taskNum;
	this.isDefault = category.isDefault;
	this.createTime = category.createTime;
}

module.exports = Category;

Category.prototype.save = function(callback) {
	var category = {
		categoryId: this.categoryId,
		name: this.name,
		parentId: this.parentId,
		taskNum: this.taskNum,
		isDefault: this.isDefault,
		createTime: this.createTime
	};

	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		//读取集合.第一个参数值应该是什么？
		db.collection('categories', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.insert(category, {
				safe: true
			}, function(err, category) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, category[0]);
			});
		});
	});
};

Category.getSingleDoc = function(options, callback) {
	options = options || {};
	mongodb.open(function(err, db) {
		if (err) {
			mongodb.close();
			return callback(err);
		}
		db.collection('categories', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.findOne(options, function(err, category) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, category);
			});
		});
	});
};

Category.getMultiDoc = function(options, callback) {
	options = options || {};
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('categories', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.find(options, function(err, category) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, category);
			});
		});
	});
}