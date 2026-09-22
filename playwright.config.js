// @ts-check
import { defineConfig, devices } from '@playwright/test';
import test from 'node:test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  testMatch: ['*.spec.js'],
  retries:0,
  /* Maximum time one test can run for. */
  timeout: 60*10000, // timeout for overall test execution
  expect :{
    timeout: 50000 // timeout for expect assertion
  },
  reporter:[
    ['html'],
    ['line'],
    ['allure-playwright'],
    ['@azure/playwright/reporter']
  ],
    
  use: {
    actionTimeout: 50*10000, // timeout for each action
    navigationTimeout: 60*10000, // timeout for navigation
    browserName: 'chromium',
   // headless: true,  //true means no browser will be visible, false means browser will be visible
    headless: false,
    screenshot:'on', // screenshot will be taken on failure
    
   
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',//off,on
    //video: 'on', // video will be recorded on failure
    //video: 'retain-on-failure', // video will be recorded on failure
    //trace: 'retain-on-failure', // trace will be retained on failure
  },

  
});
module.exports = config;

