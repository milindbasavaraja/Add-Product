const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = path.join(rootDir, "data", "products.json");
    fs.readFile(p, (err, data) => {
      let products = [];
      if (!err) {
        products = JSON.parse(data);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log("Error ", err);
      });
    });
    //products.push(this);
  }

  static fetchAll(cb) {
    const p = path.join(rootDir, "data", "products.json");
    fs.readFile(p, (err, data) => {
      let products = [];
      if (err) {
        cb([]);
      }
      cb(JSON.parse(data));
    });
  }
};
