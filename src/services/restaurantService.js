import { BaseService } from "./BaseService";

class RestaurantService extends BaseService {
  getRestaurantById = (id) => {
    return this.get(`restaurants/${id}`);
  };
}
export const restaurantService = new RestaurantService();
