const Categories = require("../models/categories.models");

class CategoriesServices {
  static async getAllCategories() {
    try {
      const result = await Categories.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CategoriesServices;
