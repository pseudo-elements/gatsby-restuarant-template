import menu from "../../lib/data/menu.json";
import products from "../../lib/data/products.json";

class SearchWorker {
  async searchMenu(category, limit) {
    const simulateApiRequest = () => {
      return new Promise((resolve) => {
        const fetchingTimeOut = setTimeout(() => {
          let result = menu.filter((item) => {
            return item.categories.includes(category);
          });
          if (limit) {
            result = result.slice(0, limit);
          }
          resolve(result);
          clearTimeout(fetchingTimeOut);
        }, 2000);
      });
    };
    const data = await simulateApiRequest();
    return data;
  }

  async searchProducts(category, limit) {
    const simulateApiRequest = () => {
      return new Promise((resolve) => {
        const fetchingTimeOut = setTimeout(() => {
          let result = products.filter((product) => {
            return product.category === category;
          });
          if (limit) {
            result = result.slice(0, limit);
          }
          resolve(result);
          clearTimeout(fetchingTimeOut);
        }, 2000);
      });
    };
    const data = await simulateApiRequest();
    return data;
  }
}

export default SearchWorker;