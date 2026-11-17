import menu from "../../lib/data/menu.json";
import highlights from "../../lib/data/highlights.json";
import offers from "../../lib/data/offers.json";
import products from "../../lib/data/products.json";

class FetchWorker {
  async fetchShopHighlights() {
    const simulateApiRequest = () => {
      return new Promise((resolve) => {
        const fetchingTimeOut = setTimeout(() => {
          resolve(highlights.shop);
          clearTimeout(fetchingTimeOut);
        }, 1000);
      });
    };
    const data = await simulateApiRequest();
    return data;
  }

  async fetchProduct(id) {
    const simulateApiRequest = () => {
      return new Promise((resolve) => {
        const fetchingTimeOut = setTimeout(() => {
          const product = products.find((product) => product.id === id);
          resolve(product);
          clearTimeout(fetchingTimeOut);
        }, 1000);
      });
    };
    const data = await simulateApiRequest();
    return data;
  }

  async fetchProducts() {
    const simulateApiRequest = () => {
      return new Promise((resolve) => {
        const fetchingTimeOut = setTimeout(() => {
          resolve(products);
          clearTimeout(fetchingTimeOut);
        }, 2000);
      });
    };
    const data = await simulateApiRequest();
    return data;
  }

  async postReview(review) {
    try {
      const simulateApiRequest = () => {
        return new Promise((resolve) => {
          const fetchingTimeOut = setTimeout(() => {
            resolve(review);
            clearTimeout(fetchingTimeOut);
          }, 1000);
        });
      };
      const data = await simulateApiRequest();
      return data;
    } catch (error) {
      return {};
    }
  }

  async fetchMenuHighlight() {
    try {
      const simulateApiRequest = () => {
        return new Promise((resolve) => {
          const fetchingTimeOut = setTimeout(() => {
            this.fetchMenuItem(highlights.menu.itemId).then((res) => {
              resolve({ title: highlights.menu.title, item: res });
              clearTimeout(fetchingTimeOut);
            });
          }, 1000);
        });
      };
      const data = await simulateApiRequest();
      return data;
    } catch (error) {
      return {};
    }
  }

  async searchMenu(category, limit) {
    try {
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
    } catch (error) {
      return [];
    }
  }

  async fetchMenu() {
    try {
      const simulateApiRequest = () => {
        return new Promise((resolve) => {
          const fetchingTimeOut = setTimeout(() => {
            resolve(menu);
            clearTimeout(fetchingTimeOut);
          }, 2000);
        });
      };
      const data = await simulateApiRequest();
      return data;
    } catch (error) {
      return [];
    }
  }

  async fetchMenuItem(id) {
    try {
      const simulateApiRequest = () => {
        return new Promise((resolve) => {
          const fetchingTimeOut = setTimeout(() => {
            const item = menu.find((item) => item.id === id);
            resolve(item);
            clearTimeout(fetchingTimeOut);
          }, 2000);
        });
      };
      const data = await simulateApiRequest();
      return data;
    } catch (error) {
      return {};
    }
  }

  async fetchItems(ids = []) {
    try {
      const simulateApiRequest = () => {
        return new Promise((resolve) => {
          const fetchingTimeOut = setTimeout(() => {
            const items = menu.filter((item) => ids.includes(item.id));
            resolve(items);
            clearTimeout(fetchingTimeOut);
          }, 2000);
        });
      };
      const data = await simulateApiRequest();
      return data;
    } catch (error) {
      return [];
    }
  }

  async fetchOffers() {
    try {
      const simulateApiRequest = () => {
        return new Promise((resolve) => {
          const fetchingTimeOut = setTimeout(() => {
            resolve(offers);
            clearTimeout(fetchingTimeOut);
          }, 2000);
        });
      };
      const data = await simulateApiRequest();
      return data;
    } catch (error) {
      return {};
    }
  }
}

export default FetchWorker;
