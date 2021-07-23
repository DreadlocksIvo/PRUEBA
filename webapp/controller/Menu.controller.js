sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"celsa/zui_comp/model/AppJsonModel",
	"celsa/zui_comp/model/FilterModel",
	'sap/ui/model/Sorter',
	"sap/ui/model/Filter",
	"sap/ndc/BarcodeScanner",
	"celsa/zui_comp/utils/ExcelDownloadHelper",
	'sap/m/MessageBox',
	"sap/ui/model/FilterOperator"
], function (Controller, AppJsonModel, FilterModel, Sorter, Filter, BarcodeScanner, ExcelDownloadHelper, MessageBox, FilterOperator) {
	"use strict";

	return Controller.extend("celsa.zui_comp.controller.Menu", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf celsa.zui_comp.view.Menu
		 */
		onInit: function () {
			AppJsonModel.initializeModel();
			FilterModel.initializeModel();
			this.mGroupFunctions = {
				ClaseConsumo: function (oContext) {
					var name = oContext.getProperty("ClaseConsumo");
					return {
						key: name,
						text: name
					};
				}
			};
		},
		
		onBarcodePress: function (oEvent) {
			var that = this;
			sap.ndc.BarcodeScanner.scan(
				function (mResult) {
					if (!mResult.cancelled) {
						that.lecturaValida(mResult);
					}
				},
				function (Error) {
					var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
					MessageBox.error(
						"Cannot read Barcode. " + Error, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}
			);
		},

		lecturaValida: function (data) {
			sap.m.messageToast.show(data);
		},

		onSearch: function (oEvent) {
			// build filter array
			var aFilter = [];
			var selectedFilters = FilterModel.getModel().getData();
			var selectedMaterial = selectedFilters.material,
				selectedSupplier = selectedFilters.supplier,
				selectedLocation = selectedFilters.locat;

			aFilter.push(new Filter("SupplierName", FilterOperator.Contains, selectedSupplier));
			aFilter.push(new Filter("MaterialText", FilterOperator.Contains, selectedMaterial));
			aFilter.push(new Filter("Location", FilterOperator.Contains, selectedLocation));

			// filter binding
			var oList = this.getView().byId("tableMateriales");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onClear: function (oEvent) {
			// build filter array
			var aFilter = [];
			FilterModel.initializeModel();
			var selectedFilters = FilterModel.getModel().getData();
			var selectedMaterial = selectedFilters.material,
				selectedSupplier = selectedFilters.supplier,
				selectedLocation = selectedFilters.locat;

			aFilter.push(new Filter("SupplierName", FilterOperator.Contains, selectedSupplier));
			aFilter.push(new Filter("Material", FilterOperator.Contains, selectedMaterial));
			aFilter.push(new Filter("Location", FilterOperator.Contains, selectedLocation));

			// filter binding
			var oList = this.getView().byId("tableMateriales");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onHandleLocation: function () {
			if (!this._oLocationDialog) {
				this._oLocationDialog = sap.ui.xmlfragment("FragEquipo", "celsa.zui_comp.view.dialogs.LocationDialog", this);
				this.getView().addDependent(this._oLocationDialog);
			}
			this._oLocationDialog.open();
		},

		onHandleSupplier: function () {
			if (!this._oEquiposDialog) {
				this._oEquiposDialog = sap.ui.xmlfragment("FragEquipo", "celsa.zui_comp.view.dialogs.SupplierDialog", this);
				this.getView().addDependent(this._oEquiposDialog);
			}
			this._oEquiposDialog.open();
		},

		onNavigate: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("OrderDetail");
		},

		onHandleMaterial: function (oEvent) {
			if (!this._oMaterialDialog) {
				this._oMaterialDialog = sap.ui.xmlfragment("FragEquipo", "celsa.zui_comp.view.dialogs.MaterialDialog", this);
				this.getView().addDependent(this._oMaterialDialog);
			}
			this._oMaterialDialog.open();
		},

		onLocationDialogSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value"),
				oFilter = new Filter("Desc", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},

		onSupplierDialogSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value"),
				oFilter = new Filter("Desc", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},

		onMaterialDialogSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value"),
				oFilter = new Filter("Desc", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},

		onMaterialDialogClose: function (oEvent) {
			var selected,
				oSelectedItem = oEvent.getParameter("selectedItem");

			oEvent.getSource().getBinding("items").filter([]);

			if (!oSelectedItem) {
				this._ValueHelpDialog.destroy();
				return;
			}
			selected = oSelectedItem.getTitle();
			FilterModel.getModel().setProperty("/material", selected);
		},

		onSupplierDialogClose: function (oEvent) {
			var selected,
				oSelectedItem = oEvent.getParameter("selectedItem");

			oEvent.getSource().getBinding("items").filter([]);

			if (!oSelectedItem) {
				this._ValueHelpDialog.destroy();
				return;
			}
			selected = oSelectedItem.getTitle();
			FilterModel.getModel().setProperty("/supplier", selected);
		},

		onLocationDialogClose: function (oEvent) {
			var selected,
				oSelectedItem = oEvent.getParameter("selectedItem");

			oEvent.getSource().getBinding("items").filter([]);

			if (!oSelectedItem) {
				this._ValueHelpDialog.destroy();
				return;
			}
			selected = oSelectedItem.getInfo();
			FilterModel.getModel().setProperty("/locat", selected);
		},

		onSuggestionItemSelected: function (oEvent) {

		},

		onValueHelpCancelPress: function () {
			if (this._oValueHelpBP) {
				this._oValueHelpBP.close();
			}
		},

		onValueHelpAfterClose: function () {
			if (this._oValueHelpBP) {
				this._oValueHelpBP.destroy();
				this._oValueHelpBP = undefined;
			}
		},

		handleViewSettingsDialogButtonPressed: function (oEvent) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("celsa.zui_comp.view.dialogs.TableDialog", this);
			}
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},

		onSearchPO: function (oEvent) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				aFilters.push(new Filter([
					new sap.ui.model.Filter("PurchaseOrder", FilterOperator.Contains, sQuery)
				], false));
			}

			// update list binding
			var oList = this.byId("tableMateriales");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
		},

		handleConfirm: function (oEvent) {
			var oView = this.getView();
			var oTable = oView.byId("tableMateriales");

			var mParams = oEvent.getParameters();
			var oBinding = oTable.getBinding("items");

			// apply sorter to binding
			// (grouping comes before sorting)
			var sPath;
			var bDescending;
			var vGroup;
			var aSorters = [];
			if (mParams.groupItem) {
				sPath = mParams.groupItem.getKey();
				bDescending = mParams.groupDescending;
				vGroup = this.mGroupFunctions[sPath];
				aSorters.push(new Sorter(sPath, bDescending, vGroup));
			}
			sPath = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPath, bDescending));
			oBinding.sort(aSorters);

			// apply filters to binding
			var aFilters = [];
			jQuery.each(mParams.filterItems, function (i, oItem) {
				var aSplit = oItem.getKey().split("__");
				var sPath = aSplit[0];
				var sOperator = aSplit[1];
				var sValue1 = aSplit[2];
				var oFilter = new Filter(sPath, sOperator, sValue1);
				aFilters.push(oFilter);
			});
			oBinding.filter(aFilters);

			// update filter bar
			this.getView().byId("vsdFilterBar").setVisible(aFilters.length > 0);
			this.getView().byId("vsdFilterLabel").setText(mParams.filterString);
		},

		onDataExport: function (oEvent) {
			var oTableCust = this.getView().byId("tableMateriales");
			var labelsCust = this.getView().byId("tableMateriales").getColumns();
			this.onExportTable(oTableCust, labelsCust);
		},

		onExportTable: function (oTable, labels) {
			var aLabels = [];
			var aPropertys = [];
			for (var l = 0; labels.length > l; l++) {
				aLabels.push(labels[l].getHeader().getText());
				if (oTable.getItems().length > 0) {
					if (oTable.getItems()[0].getCells()[l].getBinding("title") !== undefined) {
						aPropertys.push(oTable.getItems()[0].getCells()[l].getBinding("title").getPath());
					} else if (oTable.getItems()[0].getCells()[l].getBinding("text") !== undefined) {
						aPropertys.push(oTable.getItems()[0].getCells()[l].getBinding("text").getPath());
					}
				}
			}

			var oEventModel = this.getView().getModel("AppJsonModel").getData();
			ExcelDownloadHelper.onExport(oEventModel, aLabels, aPropertys, oTable);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf celsa.zui_comp.view.Menu
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf celsa.zui_comp.view.Menu
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf celsa.zui_comp.view.Menu
		 */
		//	onExit: function() {
		//
		//	}

	});

});