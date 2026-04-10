import { createProduct, getProducts } from "../models/productModel.js";

export const addProduct = async (data) => {
  return await createProduct(data.name, data.stock, data.price);
};

export const listProducts = async () => {
  return await getProducts();
};