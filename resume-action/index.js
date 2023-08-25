const fs = require("fs")
const path = require("path")
const core = require('@actions/core');
// const github = require('@actions/github');
const puppeteer = require('puppeteer');
// install things
;(async () => {
  try {
    // `who-to-greet` input defined in action metadata file
    const filePath = core.getInput('output') || "file.pdf";
    const ghUsername = core.getInput('github_user_name') || "NeonGamerBot-QK";
    console.log(`Writing to ${filePath}!`);
    // const time = (new Date()).toTimeString();
    // core.setOutput("time", time);
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto('https://resume.github.io/?'+ghUsername);
    // Get the JSON webhook payload for the event that triggered the workflow
    fs.mkdirSync("dist")
setTimeout(async () => {    
// now why wait a minute? becuase this page needs to load EVERYTHING

    await page.pdf({ path: path.join( "dist", filePath )})

    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
    await browser.close();
}, 60_000)
  } catch (error) {
    core.setFailed(error.message);
  }
  
})()