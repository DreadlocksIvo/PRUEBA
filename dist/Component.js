sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","celsa/zui_comp/model/models","celsa/zui_comp/utils/FioriComponent"],function(e,i,o,t){"use strict";return e.extend("celsa.zui_comp.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();t.setComponent(this);this.setModel(o.createDeviceModel(),"device")}})});