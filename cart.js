import AbstractCartProxy from '../abstract/cart';
import { multiStoreConfig } from './util';

class CartProxy extends AbstractCartProxy {
  constructor(config, req) {
    const OpenCart2Client = require('./opencart-vsbridge-client').OpenCart2Client;
    super(config, req)
    this.api = OpenCart2Client(multiStoreConfig(config.opencart2.api, req));
  }
  create(customerToken) {
    return this.api.cart.create(customerToken);
  }
  update(customerToken, cartId, cartItem) {
    return this.api.cart.update(customerToken, cartId, cartItem);
  }
  delete(customerToken, cartId, cartItem) {
    return this.api.cart.delete(customerToken, cartId, cartItem);
  }
  pull(customerToken, cartId, params) {
    return this.api.cart.pull(customerToken, cartId, params);
  }
  totals(customerToken, cartId, params) {
    return this.api.cart.totals(customerToken, cartId, params);
  }
  async getShippingMethods(customerToken, cartId, address) {
    // return [{ "carrier_code": "flat.flat", "method_code": "flat.flat", "carrier_title": "Доставка с фиксированной стоимостью доставки", "method_title": "Доставка с фиксированной стоимостью доставки", "amount": 0, "base_amount": 0, "available": true, "error_message": "", "price_excl_tax": 0, "price_incl_tax": 0 }]
    return this.api.cart.shippingMethods(customerToken, cartId, address);
  }
  async getPaymentMethods(customerToken, cartId) {
    // return [{"code":"bank_transfer","title":"Банковский перевод"},{"code":"cod","title":"Оплата при доставке"}]
    return this.api.cart.paymentMethods(customerToken, cartId);
  }
  async setShippingInformation(customerToken, cartId, address) {
    // return {
    //   "payment_methods": await this.getPaymentMethods(customerToken, cartId),
    //   "totals": await this.api.cart.totals(customerToken, cartId, address)
    // }
    return this.api.cart.shippingInformation(customerToken, cartId, address);
  }
  collectTotals(customerToken, cartId, shippingMethod) {
    return this.api.cart.collectTotals(customerToken, cartId, shippingMethod);
  }
  applyCoupon(customerToken, cartId, coupon) {
    return this.api.cart.applyCoupon(customerToken, cartId, coupon);
  }
  deleteCoupon(customerToken, cartId) {
    return this.api.cart.deleteCoupon(customerToken, cartId);
  }
  getCoupon(customerToken, cartId) {
    return this.api.cart.getCoupon(customerToken, cartId);
  }
}

module.exports = CartProxy;
