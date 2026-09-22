const{test,expect}=require('@playwright/test');

test('Eligible for refund',async({page})=>{
   
  await page.goto('https://eventhub.rahulshettyacademy.com/');
   

});

test('not eligible for refund',async({page})=>{



})