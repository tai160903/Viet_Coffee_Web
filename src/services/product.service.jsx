import instance from "../utils/instance";

const ProductService = {
  async getProducts() {
    try {
      const response = await instance.get("/Product");
      console.log("Products fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error.message);
      return [];
    }
  },
};

export default ProductService;
