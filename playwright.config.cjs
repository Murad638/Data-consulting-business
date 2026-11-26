const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
 testDir:'./tests',testMatch:'**/*.spec.cjs',timeout:60000,workers:2,retries:0,
 reporter:[['list'],['html',{open:'never'}]],
 use:{baseURL:'http://127.0.0.1:4173/Data-consulting-business/',browserName:'chromium',trace:'retain-on-failure',screenshot:'only-on-failure'},
 projects:[{name:'desktop',use:{viewport:{width:1440,height:900}}},{name:'tablet',use:{viewport:{width:820,height:1180},hasTouch:true}},{name:'mobile',use:{viewport:{width:390,height:844},isMobile:true,hasTouch:true}}],
 webServer:{command:'node tests/server.cjs',url:'http://127.0.0.1:4173/Data-consulting-business/',reuseExistingServer:false,timeout:15000}
});
