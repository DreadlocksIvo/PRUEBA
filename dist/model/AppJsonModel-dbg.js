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
			let jsonModel = component.byId("App").getModel("AppJsonModel");
			//checks if the model exists
			if (!jsonModel) {
				jsonModel = new JSONModel();
				component.byId("App").setModel(jsonModel, "AppJsonModel");
			}
			return jsonModel;
		},

		initializeModel: function () {
			let jsonModel = this.getModel();
			jsonModel.setData({
				"items": [{
					"ClaseConsumo": "Residencial",
					"Promedio": "1347900",
					"KWh": "3210931",
					"Importe": "3154442731",
					"GKWh": "310.89"
				}, {
					"ClaseConsumo": "Residencial",
					"Promedio": "6797900",
					"KWh": "9210931",
					"Importe": "4154442703",
					"GKWh": "340.07"
				},{
					"ClaseConsumo": "Residencial",
					"Promedio": "6410000",
					"KWh": "3400789",
					"Importe": "2154442773",
					"GKWh": "140.80"
				},
				{
					"ClaseConsumo": "Industrial",
					"Promedio": "7981347",
					"KWh": "3001347",
					"Importe": "1754042700",
					"GKWh": "420.89"
				}, {
					"ClaseConsumo": "Otros",
					"Promedio": "2847900",
					"KWh": "9301790",
					"Importe": "1794043711",
					"GKWh": "903.12"
				}, {
					"ClaseConsumo": "Gubernamental",
					"Promedio": "9472841",
					"KWh": "1100990",
					"Importe": "9333042716",
					"GKWh": "100.37"
				}, {
					"ClaseConsumo": "Diferencial",
					"Promedio": "3719993",
					"KWh": "6940931",
					"Importe": "3900042890",
					"GKWh": "420.89"
				}, {
					"ClaseConsumo": "Sub-Total CN",
					"Promedio": "9814671",
					"KWh": "4240931",
					"Importe": "1754042739",
					"GKWh": "730.89"
				}, {
					"ClaseConsumo": "TOTALES",
					"Promedio": "9846987",
					"KWh": "2391243",
					"Importe": "1975404273",
					"GKWh": "437.03"
				},]
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