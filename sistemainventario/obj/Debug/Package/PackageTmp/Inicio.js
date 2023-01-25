$(document).ready(function () {
    VerificarSession = false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    F_Controles_Inicializar();

    $('#MainContent_btnBuscar').click(function () {
        try {
            var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p> ';

            if ($('#MainContent_txtUsuario').val() == '')
                Cadena = Cadena + '<p></p>' + 'Usuario'

            if ($('#MainContent_txtContraseña').val() == '')
                Cadena = Cadena + '<p></p>' + 'Contraseña'

            if (Cadena != 'Ingresar los sgtes. Datos: <br> <p></p> ') {
                alertify.log(Cadena);
                return false;
            }

            F_Buscar();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $("#MainContent_txtUsuario").focus();

    $('#MainContent_txtUsuario').css('background', '#FFFFE0');

    $('#MainContent_txtContraseña').css('background', '#FFFFE0');

});

$().ready(function () {

    $(document).everyTime(900000, function () {

        $.ajax({
            type: "POST",
            url: 'Inicio.aspx/KeepActiveSession',
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: VerifySessionState,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alertify.log(textStatus + ": " + XMLHttpRequest.responseText);
            }
        });

    });


});

$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE' || d.type.toUpperCase() === 'EMAIL'))
             || d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }
        else {
            doPrevent = true;
        }
    }

    if (doPrevent) {
        event.preventDefault();
    }
});


function F_Controles_Inicializar() {

    var arg;

    try {
        var objParams =
            {
                Filtro_Periodo: $('#MainContent_txtPeriodo').val()

            };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Controles_Inicializar_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_Sucursal', result.split('~')[2]);
                        $('#MainContent_ddlSucursal').css('background', '#FFFFE0');
                        $('#MainContent_txtUsuario').css('background', '#FFFFE0');
                        $('#MainContent_txtContraseña').css('background', '#FFFFE0');
                        $('#MainContent_txtUsuario').val('');
                        $('#MainContent_txtContraseña').val('');
                        $('#MainContent_txtUsuario').focus();
                    }
                    else {

                        alertify.log(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {
        MostrarEspera(false);
        alertify.log("Error detectado: " + mierror);

    }

}

function F_Buscar() {

    var arg;

    try {
        var objParams =
            {
                Filtro_Usuario:    $('#MainContent_txtUsuario').val(),
                Filtro_Contraseña: $('#MainContent_txtContraseña').val(),
                Filtro_CodSede: $('#MainContent_ddlSucursal').val()
            };


        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Buscar_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_mensaje_operacion == "") {
                        document.location = 'Maestros/TipoCambio.aspx';

                        return false;
                    }
                    else {

                        alertify.log(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {
                MostrarEspera(false);
        alertify.log("Error detectado: " + mierror);

    }

}

function MostrarEspera(pboolMostrar) {
    if (pboolMostrar) {
        $('#dlgWait').dialog({
            autoOpen: false,
            modal: true,
            height: 'auto',
            resizable: false,
            dialogClass: 'alert'
        });

        $('.alert div.ui-dialog-titlebar').hide();
        //        $('.ui-button').remove();
        $('#dlgWait').dialog('open');
    }
    else {
        $('#dlgWait').dialog('close');
    }
}






