'use strict'
const
	chai = require('chai'),
	fs = require('fs'),
	assert = chai.assert,
	utility = require('../../utility');

chai.should();

module.exports = () => {

	var testSuiteBaseDir = testOutputBaseDir.concat('elementSelector/');

	describe('Element Selector start:', function() {

		before(function() {
			utility.mkdirSync(testSuiteBaseDir);
			return browser.url('http://bet.hkjc.com/football/index.aspx?lang=ch').then(function() {
				return browser.getUrl().then(function(url) {
					url.should.to.contain("http://bet.hkjc.com/football/index.aspx?lang=ch");
				});
			});
		});

		beforeEach(function() {
			//this function runs before each it(), crazy
		});

		describe('Element Selector functions', function() {

			it('Element Selector', function() {
				var myDateTime = browser.element('#sRefreshTime');
				console.log(myDateTime);
			});

		});

	});

}