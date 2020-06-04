/**
     * Clase de inicio
     * 
     * @author Javier Lopera Jiménez
     * 
    */

$(function () {

    function rellenaSpam($control) {

        // comprobar el checkbox
        if ($control[0] == $(":checkbox")[0]) {
            // alert("a");
            let mensaje = validar.comprobarCheckbox($control);
            $control.next().text(mensaje);
            // alert(mensaje);
        }
        else if ($control.prop("type") === "radio") {
            let mensaje = validar.comprobarRadio("radio");
            $control.parent().parent().children("span").text(mensaje);
        }
        else {

            let mensaje = validar[$control.attr("id")]($control.val());
            $control.next().text(mensaje);
            
            return (mensaje.length != 0);
        }
    }

    $("input,select")
        .blur(function () {
            if ($(this).prop("type") === "select-one") {
                let mensaje = validar.comprobarSelect($(this).val());
                $(this).parent().children("span").text(mensaje);
            }
            else {
                if (!rellenaSpam($(this))) {
                    $(this).removeClass("error");
                    $(this).addClass("valido");
                }
                else
                    $(this).addClass("error");
            }
        })
        .focus(function () {
            $(this).removeClass("valido error");
        });

    $("form")
        .submit(function (event) {

            event.preventDefault();

            $("input, select").trigger("blur");

            if ($("span:not(:empty)").length == 0) {
                $("form").fadeOut("slow").fadeIn("slow");
                setTimeout(function () {
                    $("form").trigger("reset");
                }, 400);
            } else {
                $("span:not(:empty)").first().prev().focus();
            }
        })
        .on("reset", function () {
            $("input,select").removeClass("valido").removeClass("error");
            $("span").text("");
        });

    $("#rellenar")
        .click(function (event) {

            $("#radio1").checked;
            $("#comprobarTexto").val("Hola");
            $("#comprobarNumero").val("98");
            $("#comprobarCorreo").val("javiLoji@gmail.com");
            $("#comprobarDni").val("12345678Z");
            $("#comprobarFechaNacimiento").val("29/02/2000");
            $("#comprobarTelefono").val("658542122");
            $("#comprobarUrl").val("https://amazon.com");

            event.preventDefault();

        })
})