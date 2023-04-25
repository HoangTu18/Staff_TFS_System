import { BaseService } from "./BaseService";

class CategoryService extends BaseService {
  getCategory = () => {
    return this.get(`categories`);
  };
}
export const categoryService = new CategoryService();
