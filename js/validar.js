

/**
 * Clase que valida todas las expresiones regulares
 * 
 * @author Javier Lopera Jiménez
 * 
*/

// Arrays donde se almacenarán las expresiones regulares y el error correspondiente 
// en caso de no ser válido


validar = (function () {

    let expresiones = {
        arrayTexto: [new RegExp("^[a-zA-Zá-úÁ-Ú0-9 ]+$"), "Se debe escribir un texto"],
        arrayNumero: [new RegExp("^[0-9]+$"), "Se debe escribir un número entero"],
        arrayFecha: [new RegExp("^([0-9]{2})([/-])([0-9]{2})\\2([0-9]{4})$"), "Introduce un formato válido, '22/12/2222' o '29-02-2000'"],
        arrayDni: [new RegExp("^([0-9]{8})[- ]?([a-zA-Z])$"), "12345678Z o 12345678-Z", "TRWAGMYFPDXBNJZSQVHLCKET"],
        arrayCorreo: [new RegExp("^([0-9a-zA-Z]+[.]?)*[@][0-9a-zA-Z]+[.][a-zA-Z]+$"), "Se debe poner el correo correctamente"],
        arrayTelefono: [new RegExp("^\\(?[+]?[0-9]?[0-9]?[0-9]?[0-9]?\\)?[ ]?[0-9]{3}[ ]?[0-9]{3}[ ]?[0-9]{3}[ ]?$"), "Introduce un número válido"],
        arrayUrl: [new RegExp("^(http[s]?[:][/][/])?(www[.])?[a-zA-Z]+([.][a-zA-Z]+([/][a-zA-Z0-9]+)*)*$"), "Se debe poner la url correctamente"],
    }

    // Comprueba que el campo sea correcto

    let comprobarTexto = function (texto){
        if(!expresiones.arrayTexto[0].test(texto))
            return expresiones.arrayTexto[1];
        return "";
    }

    let comprobarNumero = function (numero){
        if(!expresiones.arrayNumero[0].test(numero))
            return expresiones.arrayNumero[1];
        return "";
    }

    let comprobarCorreo = function (correo){
        if(!expresiones.arrayCorreo[0].test(correo))
            return expresiones.arrayCorreo[1];
        return "";
    }

    let comprobarTelefono = function (telefono){
        if(!expresiones.arrayTelefono[0].test(telefono))
            return expresiones.arrayTelefono[1];
        return "";
    }

    let comprobarUrl = function (url){
        if(!expresiones.arrayUrl[0].test(url))
            return expresiones.arrayUrl[1];
        return "";
    }

    // Comprueba si el checkBox esta activo

    let comprobarCheckbox = function (input) {
        if (!input.prop("checked")) {
            return "Este campo debe estar seleccionado";
        }
        return "";
    }

    // Comprueba que el radio Button no quede vacio

    let comprobarRadio = function (name) {

        if($('input:radio[name='+name+']:checked').length == 0)
            return "Debes seleccionar alguna opción";
        return "";
    }

    // Comprueba que el radio Button no quede vacio

    let comprobarSelect = function (opcion) {
        if (opcion == "") {
            return "Debes seleccionar algún campo";
        }
        return "";
    }

    function comprobarFechaNacimiento(fecha) {

        try {

            let [, dia, , mes, anno] = expresiones.arrayFecha[0].exec(fecha.trim());

            let date = new Date(`${anno}/${mes}/${dia}`);

            if (Number(dia) != date.getDate() || Number(mes) != date.getMonth() + 1 || Number(anno) != date.getFullYear()) {
                return "La fecha no es válida";
            }

            return "";

        } catch (error) {
            if (fecha.trim() == "") {
                return "El campo no puede quedar vacio";
            }
            return expresiones.arrayFecha[1];
        }
    }

    // Comprueba que el Dni sea correcto

    let comprobarDni = function (dniCompleto) {

        try {
            let [, dniNumero, dniLetra] = expresiones.arrayDni[0].exec(dniCompleto.trim());

            if (dniLetra.toUpperCase() == expresiones.arrayDni[2][parseInt(dniNumero) % 23]) {
                return "";
            }
            return "La letra no corresponde con el dni";

        } catch{
            return expresiones.arrayDni[1];
        }
    }

    return {
        comprobarTexto: comprobarTexto,
        comprobarNumero: comprobarNumero,
        comprobarCorreo: comprobarCorreo,
        comprobarTelefono: comprobarTelefono,
        comprobarUrl: comprobarUrl,
        comprobarCheckbox: comprobarCheckbox,
        comprobarRadio: comprobarRadio,
        comprobarSelect: comprobarSelect,
        comprobarDni: comprobarDni,
        comprobarFechaNacimiento: comprobarFechaNacimiento,
        expresiones: expresiones
    }
})();