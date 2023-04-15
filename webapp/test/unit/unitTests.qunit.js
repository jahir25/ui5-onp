/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ui5onpcompe/ui5onp/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
