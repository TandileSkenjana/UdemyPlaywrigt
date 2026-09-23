const base = require('@playwright/test');

exports.customtest1 =base.test.extend({
    testDataForOrder:{
        username: "anshika@gmail.com",
        password : "Iamking@000",
        productName: "Zara Coat 4"
    }
})


// exports.customtest1 = base.test.extend(
// {
// testDataForOrder :    {
//     username : "anshikaw@gmail.com",
//     password : "Learning@830$3mK3",
//     productName:"ADIDAS ORIGINAL"
    
//     }

// }

//)