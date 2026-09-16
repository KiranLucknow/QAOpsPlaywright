const  base  = require('@playwright/test')

exports.Customtest=base.test.extend(
    {
        testDataForOrder:
        {
        userName: "kiran.sriv@gmail.com",
        password: "Bbbbbb@1",
        productName: "iphone 13 pro",
        countryCode: "cub",
        countryName: " Cuba"
        }
    }
)