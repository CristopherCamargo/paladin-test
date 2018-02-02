
const initialState = {
  categories: [],
  products: [],
  order: -1,
  filter: {
    available: false,
    price: { min: 100, max: 10000 },
    quantity: { min: 100, max: 800 },
    applyfilter: false,
  }
};

export default initialState;
