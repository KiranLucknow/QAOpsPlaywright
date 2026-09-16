const {LoginPage} = require('./LoginPage')
const {DashboardPage} = require('./DashboardPage')
const {CartPage} = require('./CartPage')
const {CheckoutPage} = require('./CheckoutPage')
const {OrderIdPage} = require('./OrderIdPage')
const {MyOrderPage}=require('./MyOrderPage');

class POmanager{

   constructor(page){
        this.page= page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderIdPage=new OrderIdPage(this.page);
        this.myOrderPage=new MyOrderPage(this.page);

    }


    getLoginPage(){
        return(this.loginPage)
    }
    getDashboardPage(){
        return(this.dashboardPage)
    }
    getCartPage(){
        return(this.cartPage)
    }
    getCheckoutPage(){
        return(this.checkoutPage)
    }
    getOrderIdPage(){
        return (this.orderIdPage)

    }

    getMyorderPage(){
        return (this.myOrderPage);
    }
}
module.exports ={POmanager};