const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, 
{
  foreignKey: 'category_id',
  onDelete: 'cascade', 
  hooks: true 
});

Category.hasMany(Product,
{
  foreignKey: 'category_id',
  onDelete: 'cascade', 
  hooks: true 
});

Product.belongsToMany(Tag, 
  {
  through: ProductTag,
  foreignKey: 'product_id',
  onDelete: 'cascade', 
  hooks: true 
});
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
  onDelete: 'cascade', 
  hooks: true 
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};