class ProductWorker {
  constructor() {
    this.maxQuantity = 10;
    this.ratingTitles = {
      1: "terrible",
      2: "bad",
      3: "fine",
      4: "good",
      5: "excellent",
    };
  }

  getDiscount(price, offer = 0) {
    return price - price * (offer / 100);
  }

  getTotal(product, quantity, variants, offers) {
    let total = offers[product.id]
      ? this.getDiscount(offers[product.id], product.unitPrice)
      : product.unitPrice;
    total *= quantity;

    Object.keys(variants).forEach((variant) => {
      if (Array.isArray(variants[variant])) {
        variants[variant].forEach((option) => {
          total += product.variants[variant][option];
        });
      } else {
        total += product.variants[variant][variants[variant]];
      }
    });
    return total;
  }
  
  getProductDetails(cartItems, favourites, product, offers) {
    let details = { ...(cartItems[product.id] || favourites[product.id]) };

    if (!Object.keys(details).length) {
      details = { quantity: 1 };
      if (Object.keys(product.variants).length) {
        Object.keys(product.variants).forEach((variant) => {
          details = {
            ...details,
            [variant]: product.variants[variant].multiSelect
              ? []
              : Object.keys(product.variants[variant])[0],
          };
        });
      }
    }

    let { total, quantity, ...variants } = details;
    details.total = this.getTotal(product, quantity, variants, offers);

    return details;
  }
}

export default ProductWorker;
