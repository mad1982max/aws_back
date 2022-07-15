"use strict";
import { products } from "./__mocks__/products.js";
import { handleResponse } from "./helpers/api.js";

export const getProductsList = async (event) => handleResponse(products);

export const getProductsById = async (event) => {
  const { productId } = event.pathParameters;
  const requiredProduct = products.find((product) => product.id === productId);

  if (!requiredProduct) {
    const message = `product with id ${productId} not found`;
    return handleResponse({ message }, 404);
  }

  return handleResponse(requiredProduct);
};
