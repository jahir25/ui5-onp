sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";
        let oModelApp
        return Controller.extend("ui5onp.com.pe.ui5onp.controller.View1", {
            onInit: function () {
                this.onInitModel()
                this.onTestData()
            },

            onInitModel: function () {
                this.getView().setModel(new JSONModel({
                    "dLeyGeneral": new Date(2019, 5, 21),
                    "iMinAños": 65
                }), "modelApp")
                oModelApp = this.getView().getModel("modelApp")
            },

            onTestData: function () {
                oModelApp.setProperty("/dNacimiento", new Date(1948, 11, 17))
                oModelApp.setProperty("/dInitLabora", new Date(1963, 11, 20))
                oModelApp.setProperty("/dCeseLabora", new Date(1984, 4, 1))
                oModelApp.setProperty("/dSolicitud", new Date(2021, 11, 20))
            },

            calcularEdad: function (fechaNacimiento, fechaActual) {
                let { años, meses, dias } = this.calcularBase(fechaNacimiento, fechaActual)
                return `${años} años, ${meses} meses y ${dias} días`;
            },

            calcularBase: function (fechaNacimiento, fechaActual) {
                const diff = fechaActual.getTime() - fechaNacimiento.getTime();
                const edad = new Date(diff);
                const años = edad.getUTCFullYear() - 1970;
                const meses = edad.getUTCMonth();
                const dias = edad.getUTCDate() - 1;
                return {
                    años,
                    meses,
                    dias
                }
            },

            obtenerAños: function (fechaNacimiento, fechaActual) {
                let { años } = this.calcularBase(fechaNacimiento, fechaActual)
                return años;
            },

            obtenerStateAños: function(iCantAños){
                let sState = "Success"
                if(iCantAños < oModelApp.getProperty("/iMinAños")) sState = "Error"
                return sState
            },

            onCalculateGeneral: function () {

                let dNacimiento = oModelApp.getProperty("/dNacimiento")
                let dInitLabora = oModelApp.getProperty("/dInitLabora")
                let dCeseLabora = oModelApp.getProperty("/dCeseLabora")
                let dSolicitud = oModelApp.getProperty("/dSolicitud")
                let dLeyGeneral = oModelApp.getProperty("/dLeyGeneral")

                //Calcular Edad Solicitud
                oModelApp.setProperty("/sEdadSolicitud", this.calcularEdad(dNacimiento, dSolicitud))

                //Calcular Edad Cese
                oModelApp.setProperty("/sEdadCese", this.calcularEdad(dNacimiento, dCeseLabora))

                //Calcular la fecha de Contingencia
                let añosASumar = 65;
                let dNewContingencia = new Date(dNacimiento);
                dNewContingencia.setFullYear(dNewContingencia.getFullYear() + añosASumar);
                oModelApp.setProperty("/dContingencia", dNewContingencia)

                //Calcular Fecha Devengado
                let añosRestar;
                let dDevengado = new Date(dSolicitud);
                if (dLeyGeneral >= dNewContingencia) {
                    añosRestar = 1;
                    dDevengado.setFullYear(dDevengado.getFullYear() - añosRestar);
                    oModelApp.setProperty("/dDevengado", dDevengado)
                }
                

                //Calcular Años Aportados
                oModelApp.setProperty("/iCantAños", this.obtenerAños(dNacimiento, dCeseLabora))
                oModelApp.setProperty("/sStateAños", this.obtenerStateAños(this.obtenerAños(dNacimiento, dCeseLabora)))

            }
        });
    });
