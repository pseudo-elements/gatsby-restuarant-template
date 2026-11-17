class ShopWorker {
  parseShopProducts(shopProducts) {
    const products = {};
    shopProducts.forEach((item) => {
      products[item.category] = products[item.category] || [];
      products[item.category].push(item);
    });
    return products;
  }
}

export default ShopWorker;
