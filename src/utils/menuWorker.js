class MenuWorker {

    constructor ()
    {
        this.highlightedCategories = ["low-calorie", "vegan", "spicy", "dairy", "nuts"];
    }

  parseCategories(data, filters = []) {
    let categories = [...filters];
    data.forEach((item) => {
      for (let category of item.categories) {
        if (!categories.includes(category)) {
          if (["breakfast", "lunch", "dinner", "drinks"].includes(category)) {
            categories.unshift(category);
          } else {
            categories.push(category);
          }
        }
      }
    });
    return categories;
  }

  filter(data, filters) {
    if (filters.length === 0) {
      return data;
    }
    return data.filter((item) => {
      for (let filter of filters) {
        if (!item.categories.includes(filter)) {
          return false;
        }
      }
      return true;
    });
  }
}
export default MenuWorker;
