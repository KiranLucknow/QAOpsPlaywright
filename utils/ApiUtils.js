class ApiUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponseApiContext = await this.apiContext.post('https://www.rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginPayload
            }
        )

        // expect(loginResponseApiContext.ok()).toBeTruthy();
        const loginResponseJson = await loginResponseApiContext.json()
        const token = loginResponseJson.token;
        console.log(token);
        return token;

    }

    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://www.rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderPayload,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            }
        )
        const orderResponseJson = await orderResponse.json()
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0]
        console.log(orderId);
        response.orderId = orderId;
        return response;
    }
}
module.exports = { ApiUtils }