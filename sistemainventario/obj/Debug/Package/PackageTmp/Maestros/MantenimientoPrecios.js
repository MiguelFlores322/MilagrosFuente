var AppSession = "../Maestros/MantenimientoPrecios.aspx";

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

function CargarArchivoImportaciones() {
    MostrarEspera(true);
    if (document.getElementById("MainContent_FileUpload1").value == "") {
        alertify.log("No tiene archivo.");
        MostrarEspera(false);
        return false;
    }

    return true;
}