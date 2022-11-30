const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const p = path.join(rootDir, "data", "products.json");
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, data) => {
    let products = [];
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log("Error ", err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
