
import {test as baseTest} from'@playwright/test';



interface testDataForOrder {
  username: string;
  password: string;
  productName: string;
}

export const customtest = baseTest.extend<{ testDataForOrder: testDataForOrder }>({
  testDataForOrder: {
    username: 'anshika@gmail.com',
    password: 'Iamking@000',
    productName: 'Zara Coat 4',
  },
});