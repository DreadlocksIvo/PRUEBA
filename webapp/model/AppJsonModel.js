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
					"PurchaseOrder": "4500000153",
					"POType": "Standard PO",
					"Supplier": "17300001",
					"SupplierName": "Domestic US Supplier 1",
					"Location": "A-14-F4",
					"Material": "CH-1010",
					"MaterialText": "Acrylic resin"
				}, {
					"PurchaseOrder": "4500000154",
					"POType": "Standard PO",
					"Supplier": "17300001",
					"SupplierName": "Domestic US Supplier 1",
					"Location": "A-14-F5",
					"Material": "CH-4100",
					"MaterialText": "Bag. 10 LB"
				}, {
					"PurchaseOrder": "4500000157",
					"POType": "Standard PO",
					"Supplier": "17300001",
					"SupplierName": "Domestic US Supplier 1",
					"Location": "A-03-C3",
					"Material": "CH-1120",
					"MaterialText": "Label BlueSky 10 LB"
				}, {
					"PurchaseOrder": "4500000160",
					"POType": "Standard PO",
					"Supplier": "17300002",
					"SupplierName": "Domestic US Supplier 2",
					"Location": "A-03-C3",
					"Material": "CH-1120",
					"MaterialText": "Label BlueSky 10 LB"
				}, {
					"PurchaseOrder": "4500000160",
					"POType": "Standard PO",
					"Supplier": "17300003",
					"SupplierName": "Domestic US Supplier 3",
					"Location": "A-14-F5",
					"Material": "CH-4100",
					"MaterialText": "Bag. 10 LB"
				}, {
					"PurchaseOrder": "4500000160",
					"POType": "Standard PO",
					"Supplier": "17300003",
					"SupplierName": "Domestic US Supplier 3",
					"Location": "A-14-F4",
					"Material": "CH-4100",
					"MaterialText": "Acrylic resin"
				}, {
					"PurchaseOrder": "4500000165",
					"POType": "Standard PO",
					"Supplier": "17300004",
					"SupplierName": "Domestic US Supplier 4",
					"Location": "A-14-F4",
					"Material": "CH-1010",
					"MaterialText": "Label BlueSky 10 LB"
				}, {
					"PurchaseOrder": "4500000170",
					"POType": "Standard PO",
					"Supplier": "17300004",
					"SupplierName": "Domestic US Supplier 4",
					"Location": "A-03-C3",
					"Material": "CH-1120",
					"MaterialText": "Acrylic resin"
				}],
				"SupplierNameItems": [{
					"key": "01",
					"Desc": "Domestic US Supplier 1",
					"NroSerie": "1",
					"Grupo": "1"
				}, {
					"key": "02",
					"Desc": "Domestic US Supplier 2",
					"NroSerie": "2",
					"Grupo": "2"
				}, {
					"key": "03",
					"Desc": "Domestic US Supplier 3",
					"NroSerie": "3",
					"Grupo": "3"
				}, {
					"key": "04",
					"Desc": "Domestic US Supplier 4",
					"NroSerie": "4",
					"Grupo": "4"
				}],
				"Material": [{
					"key": "01",
					"Desc": "Acrylic resin"
				}, {
					"key": "02",
					"Desc": "Bag. 10 LB"
				}, {
					"key": "03",
					"Desc": "Label BlueSky 10 LB"
				}],
				"Location": [{
					"key": "A-14-F4",
					"Desc": "A-14-F4"
				}, {
					"key": "A-14-F5",
					"Desc": "A-14-F5"
				}, {
					"key": "A-03-C3",
					"Desc": "A-03-C3"
				}, {
					"key": "A-03-C4",
					"Desc": "A-03-C4"		
				}]
				
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