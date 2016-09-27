'use strict'
const
	chai = require('chai'),
	fs = require('fs'),
	assert = chai.assert,
	utility = require('../../utility');

chai.should();

module.exports = () => {

	var testSuiteBaseDir = testOutputBaseDir.concat('noChaiAsPromise/');

	describe('Windows tests start:', function() {

		before(function() {
			utility.mkdirSync(testSuiteBaseDir);
		});

		beforeEach(function() {
			return browser.url('http://www.google.com').then(function() {
				return browser.getUrl().then(function(url) {
					url.should.to.contain("http://www.google.com");
				});
			});
		});

		describe('Basic Windows functions', function() {

			var Wnds = []; //delcaring Wnds as array, otherwise no push() available
			it('Get current windows handles', function() {
				return browser.windowHandles().then(function(windowHdls) {
					var windows = windowHdls.value;

					//ref: http://www.w3schools.com/js/js_arrays.asp
					//console.log(windows);
					windows.length.should.equal(1);
					Array.isArray(windows).should.equal(true);
					browser.saveScreenshot(testSuiteBaseDir.concat('1.first.windows.png'));
					Wnds.push(windows[0]);
				})
			});

			it('Create new window', function() {
				//TOCHECK: For phantomjs standalone, newWindow(url), url input not working, still need to use url()
				return browser.newWindow('http://whatever.com.you.input.is.useless').getUrl().then(function(url) {
						url.should.equal('about:blank');
					}).url('http://example.com')
					.then(function() {
						return browser.windowHandles().then(function(windowHdls) {
							var windows = windowHdls.value;
							windows.length.should.equal(2);
							browser.saveScreenshot(testSuiteBaseDir.concat('2.second.windows.exampleDotCom.png'));
							Wnds.push(windows[1]);
						})
					})

			})

			it('Switching back to first Windows', function() {
				return browser.switchTab(Wnds).then(() => {
					browser.saveScreenshot(testSuiteBaseDir.concat('3.backTo.FirstWin.png'));
				});
			})

			it('Close inActive window', function() {
				//you cannot close current window directly, workaround switch then close
				return browser.close(Wnds[1]).then(function() {
					browser.saveScreenshot(testSuiteBaseDir.concat('4.closeSecondWin.png'));
					return browser.getTabIds().then(function(wnds) {
						wnds.should.have.lengthOf(1);
					})
				})
			})

		});

		describe('Deal with windows pop up website', function() {

			var Wnds = [];
			it('Going to bochk.com', () => {
				return browser.url('https://its.bochk.com/login/ibs_lgn_index_e.jsp').then(() => {
					browser.saveScreenshot(testSuiteBaseDir.concat('5.bochk.png'));
					return browser.getSource().then(function(source) {
						fs.writeFileSync(testSuiteBaseDir.concat('5.bochk.html'), source);
						return browser.click('#loginbox-nav a[class=apply]').then((ele) => {
							browser.saveScreenshot(testSuiteBaseDir.concat('6.bochk.png'));
							return browser.getTabIds().then(function(wnds) {
								console.log(wnds.length);
								Wnds = wnds;
							})
						})
					})
				})
			})

			it('Switch to new poped up window', () => {
				/*return browser.click('a[class$=apply]').then(()=>{
					return browser.getTabIds().then(function(wnds){
						console.log(wnds);
					})
				})*/
				return browser.switchTab(Wnds[1]).then( ()=> {
					browser.saveScreenshot(testSuiteBaseDir.concat('7.bochk.png'));
				})
			})
		})

	});

}