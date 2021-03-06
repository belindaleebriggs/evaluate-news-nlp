// Import the js file to test
import { updateUI } from "../formHandler.js"
// Setup to create a fake dom so UI update tests will work
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests 

describe("Testing the Update UI Display functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.
    test("Testing the updateUI() function returns data", async () => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        // fake api data
        const data =  { 
            positivity: 'Super P',
            truth_or_opinion: 'Waffly',
            };
        // Fake dom elements to allow UI update steps to run
        const dom = new JSDOM(`<section id="results-section" class=""><div id="results" class=""></div></section>`);

        var resultsSection = dom.window.document.getElementById('results-section'); 
        var results = dom.window.document.getElementById('results')
        updateUI(data, resultsSection, results)
        expect(updateUI).toBeDefined();
    });
})
