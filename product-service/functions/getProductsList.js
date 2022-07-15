import { products } from "../__mocks__/products.js";
import { handleResponse } from "../helpers/api.js";

export const getProductsList = async (event) => handleResponse(products);
