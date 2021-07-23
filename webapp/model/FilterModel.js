sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"celsa/zui_comp/utils/FioriComponent"
], function (JSONModel, FioriComponent) {
	"use strict";

	return {
		getModel: function () {
			//gets component
			let component = FioriComponent.getComponent();
			//gets model
			let jsonModel = component.byId("App").getModel("FilterModel");
			//checks if the model exists
			if (!jsonModel) {
				jsonModel = new JSONModel();
				component.byId("App").setModel(jsonModel, "FilterModel");
			}
			return jsonModel;
		},

		initializeModel: function () {
			let jsonModel = this.getModel();
			jsonModel.setData({
				"material": "",
				"supplier": "",
				"locat": ""
			});
			return jsonModel;
		},

		setProperty: function (sPropery, value) {
			this.getModel().setProperty(sPropery, value);
			this.updateModel();
		},

		getProperty: function (sPropery) {
			return this.getModel().getProperty(sPropery);
		},

		updateModel: function () {
			this.getModel().updateBindings(true);
		}

	};
});