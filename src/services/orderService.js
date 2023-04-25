import { BaseService } from "./BaseService";

class OrderService extends BaseService {
  getOrderByStaffId = (id) => {
    return this.get(`orders/staff/${id}`);
  };
  insertOrder = (model) => {
    return this.post(`orders/forstaff/`, model);
  };
  updateOrder = (model) => {
    return this.put(`orders`, model);
  };
  updateOrderStatus = (model) => {
    return this.put(`orders/status`, model);
  };
  getCustomerById = (id) => {
    return this.get(`customers/byid/${id}`);
  };
  getCustomers = () => {
    return this.get(`customers`);
  };
}
export const orderService = new OrderService();
