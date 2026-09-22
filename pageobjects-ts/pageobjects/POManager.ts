import {LoginPage} from './LoginPage';
import { DashboardPage } from'./DashboardPage';
import { OrdersHistoryPage } from './OrdersHistoryPage';
import { OrdersReviewPage } from './OrdersReviewPage';
import { CartPage } from './CartPage';
import{Page} from '@playwright/test';

export class POManager {
    // This class is responsible for managing the page objects and providing access to them.
    // these page objects are used to interact with the different pages of the application under test. 
     loginPage: LoginPage;
     dashboardPage: DashboardPage;
     ordersHistoryPage: OrdersHistoryPage;
     ordersReviewPage: OrdersReviewPage;
     cartPage: CartPage;
     page: Page;

    constructor(page: any) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.cartPage = new CartPage(this.page);


    }

    getLoginPage() {
        return this.loginPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }
    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }
}
module.exports = { POManager };