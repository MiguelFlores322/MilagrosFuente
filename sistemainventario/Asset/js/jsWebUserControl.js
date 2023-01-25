var TipoCita = new Array();
function llenarArrCita(indice, idCita, hEmpresa, hCliente, hOficina, hTipo) {
    TipoCita[indice] = Array(idCita, hEmpresa, hCliente, hOficina, hTipo);
    return TipoCita;
}


function MostrarMensaje(mensaje, opt) {

    $("#lblMensajeCrearCita").html(mensaje);
    $("#dialog:ui-dialog").dialog("destroy");
    $("#dialog-message").dialog("open");
    $("#lblMensajeCrearCita").html(mensaje);
    $("#dialog-message").dialog({
        modal: true,
        beforeClose: function(event, ui) {
        },
        buttons: {
            Aceptar: function() {


                $(this).dialog("close");



            }
        }
    });
}
function fnLlamadaError() {
    alert("error");
}

function JSFormatearHora(hora) {
    var hora = new String(hora);
    
    var texto = "";
    if (hora == 0) {
        texto = "Todo el dia"
    }
    else if (hora == -1) {
        texto = "Sin Hora"
    }
    else {

        if (hora > 115900) {

            if (hora > 115900 && hora < 130000) {

                texto = hora.substring(0, 2) + ":" + hora.substring(2, 4) + " p.m.";
            }
            else {

                var horapm = parseInt(hora.substring(0, 2));
                if (horapm < 10) {
                    texto = '0' + horapm + ":" + hora.substring(2, 4) + " p.m.";
                }
                else {
                    texto = horapm + ":" + hora.substring(2, 4) + " p.m.";
                }
            }
        }
        else {

            if (hora > 95900) {

                texto = hora.substring(0, 2) + ":" + hora.substring(2, 4) + " a.m.";
            }
            else {

                texto = hora.substring(0, 1) + ":" + hora.substring(1, 3) + " a.m.";
            }
        }
    }
    return texto;
}

function JSFechaIsoARegular(cadena) {
    var fecha = new String(cadena)

    var fechaHoy = new Date();
    var fechaRegular;
    if (fecha == "") {
        fechaRegular = fechaHoy.getDay() + "/" + fechaHoy.getMonth() + "/" + fechaHoy.getFullYear();
    }
    else {
        var dia = fecha.substring(6, 8);
        var mes = fecha.substring(4, 6);
        var anio = fecha.substring(0, 4);
        fechaRegular = dia + "/" + mes + "/" + anio;
    }
    return fechaRegular;
}

function VerificarSeleccionTipoCita() {

    $("#trEmpresa,#trEmpresa2,#trCliente,#trOficina").hide();
    $.each(TipoCita, function(index, value) {
        if ($(".TipoCita").val() == value[0]) {

            ActivarTR(value[1], value[2], value[3], value[4]);
        }
    });
}

function VerificarSeleccionTipoCitaEditar() {

    $("#trEmpresaEdit,#trClienteEdit,#trOficinaEdit,#trTipoEdit").hide();
    $.each(TipoCita, function(index, value) {
        if ($(".TipoCitaEdit").val() == value[0]) {
            ActivarTREdit(value[1], value[2], value[3], value[4]);
        }
    });
    ValidarHora();
    ChangeEventoEditar();
   
}
function ValidarTrEditTipo(IdCliente, IdEmpresa, IdOficina, IdTipo, sHora) {

    var iIdCliente = 0;
    var iIdEmpresa = 0;
    var iIdOficina = 0;
    var iIdTipo = 0;
    if (IdCliente != '0') {
        iIdCliente = 1;
    }
    if (IdEmpresa != '0') {
        iIdEmpresa = 1;
    }
    if (IdOficina != '0') {
        iIdOficina = 1;
    }
    if (IdTipo != '0') {
        iIdTipo = 1;
    }
    // ValidarHora(sHora);
    ActivarTREdit(iIdEmpresa, iIdCliente, iIdOficina, iIdTipo);
}

function ValidarHora() {
    switch ($("#hdHora").val()) {
        case "T":
            $("#trHoraEdit").show();
            break;
        case "A":
        case "S":
            //  LimpiarHoraEdit()
            $("#trHoraEdit").hide();        
            break;
    }
}

function ActivarTR(hEmpresa, hCliente, hOficina, hTipo) {

    if (hEmpresa == 1) {
        $("#trEmpresa").show();
        $("#trEmpresa2").show();


    } else {
        $("#trEmpresa").hide();
        $("#trEmpresa2").hide();

    }
    $(".btnGuardarCita").next().val(hEmpresa);

    if (hCliente == 1) {
        $("#trCliente").show();
    } else {
        $("#trCliente").hide();
    }
    $(".btnGuardarCita").next().next().val(hCliente);

    if (hOficina == 1) {
        $("#trOficina").show();

    } else {
        $("#trOficina").hide();
    }
    $(".btnGuardarCita").next().next().next().val(hOficina);

    if (hTipo == 1) {
        $("#trTipo").show();
    } else {
        $("#trTipo").hide();
    }
    $(".btnGuardarCita").next().next().next().next().val(hTipo);
}

function ActivarTREdit(hEmpresa, hCliente, hOficina, hTipo) {

    if (hEmpresa == 1) {
        $("#trEmpresaEdit").show();
        $("#trEmpresaEdit2").show();

    } else {
        $("#trEmpresaEdit").hide();
        $("#trEmpresaEdit2").show();
    }
    $(".btnModificarCita").next().val(hEmpresa);

    if (hCliente == 1) {
        $("#trClienteEdit").show();
    } else {
        $("#trClienteEdit").hide();
    }
    $(".btnModificarCita").next().next().val(hCliente);

    if (hOficina == 1) {
        $("#trOficinaEdit").show();
        // $("#WebUserControl21_cboOficinaEditar").val("0");
    } else {
        $("#trOficinaEdit").hide();
    }
    $(".btnModificarCita").next().next().next().val(hOficina);

    if (hTipo == 1) {
        $("#trTipoEdit").show();
    } else {
        $("#trTipoEdit").hide();
    }
    $(".btnModificarCita").next().next().next().next().val(hTipo);
    // ValidarHora(sHora);
}
function HideControles() {
    $('.tabs').tabs('select', 0);
    $("#trEmpresa").hide();
    $("#trCliente").hide();
    $("#trEmpresa2").hide();
    $("#trOficina").hide();
    $("#trTipo").hide();
    $("#trHora").hide();
    $("#trHoraEdit").hide();
  //  $("#WebUserControl11_cboProvincia").attr('disabled', true);
  //  $("#WebUserControl11_cboDistrito").attr('disabled', true);
}

function fpicker() {

    $("#WebUserControl21_txtFechaEditar").datepicker({
        changeMonth: true,
        changeYear: true,
        beforeShowDay: function(date) {
            var day = date.getDay();
            return [(day != 0), ''];
        },
        minDate: 0,
        dateFormat: 'dd/mm/yy'
    });
}
