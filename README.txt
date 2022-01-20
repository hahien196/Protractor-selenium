==========Automation framework with Protractor=========================

1. Install NodeJS lastest version

From 2->9: Run in automation root folder: \\BB-Web-QA-assignment
2. Install the dependencies in the local node_modules folder 
> npm install

3. Install protractor
> npm install -g protractor

4. Update webdriver-manager
> webdriver-manager update

5. Start webdriver-manager
> webdriver manager start

6. Install authenticator-browser-extension for authenticating browser
> npm install --save-dev authenticator-browser-extension

7. Install protractor-http-client to for calling API request
> npm i protractor-http-client

8. Install protractor-helper (for use protractor.ExpectedConditions)
> npm i protractor-helper

9. To run test
> protractor .\e2e\protractor.conf.js
or run with test suite: protractor .\e2e\protractor.conf.js --suite={suiteName} (suiteName define in protractor.conf.js file

10: After test run completed, you can check auto generated report in folder \\BB-Web-QA-assignment\reports-tmp
