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

};

Category.getSingleDoc = function(options, callback) {
	options = options || {};
};

Category.getMultiDoc = function(options, callback) {
	options = options || {};
}