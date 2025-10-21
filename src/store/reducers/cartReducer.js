const initialState = {
     cart: JSON.parse(localStorage.getItem("cartItems")) || [],
     totalPrice: 0,
     cartId:null
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART": {
      const productToAdd = action.payload;
      const existingProduct = state.cart.find(
        (item) => item.productId === productToAdd.productId
      );

      const updatedCart = existingProduct
        ? state.cart.map((item) =>
            item.productId === productToAdd.productId ? productToAdd : item
          )
        : [...state.cart, productToAdd];

      const totalPrice = updatedCart.reduce(
        (acc, item) => acc + Number(item.quantity || 0) * Number(item.specialPrice || 0),
        0
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      return {
        ...state,
        cart: updatedCart,
        totalPrice,
      };
    }

    case "REMOVE_CART": {
      const updatedCart = state.cart.filter(
        (item) => item.productId !== action.payload.productId
      );

      const totalPrice = updatedCart.reduce(
        (acc, item) => acc + Number(item.quantity || 0) * Number(item.specialPrice || 0),
        0
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      return {
        ...state,
        cart: updatedCart,
        totalPrice,
      };
    }

    case "GET_USER_CART_PRODUCTS": {
      const cart = action.payload || [];
      const totalPrice =
        cart.reduce(
          (acc, item) => acc + Number(item.quantity || 0) * Number(item.specialPrice || 0),
          0
        ) || 0;

      return {
        ...state,
        cart,
        totalPrice,
        cartId: action.cartId,
      };
    }

    default:
      return state;
  }
};
