/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"celsa/zui_comp/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});