import { products } from "../__mocks__/products.js";
import { handleResponse } from "../helpers/api.js";
import { errorMsg } from "../constants.js";

export const getProductById = async (event) => {
  const { productId } = event.pathParameters;
  const requiredProduct = products.find((product) => product.id === productId);

  if (!requiredProduct) {
    const message = errorMsg.PRODUCT_NOT_FOUND;
    return handleResponse({ message }, 404);
  }

  return handleResponse(requiredProduct);
};
