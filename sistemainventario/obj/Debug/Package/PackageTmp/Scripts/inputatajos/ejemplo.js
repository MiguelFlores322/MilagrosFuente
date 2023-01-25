$(document).ready(function () {
    var cont = 0;
    $.Shortcuts.add({
        type: 'down',
        mask: 'Ctrl+A',//F1,F2,etc
        handler: function () {
            console.log('Grabar' + (cont++));//Metodo a Ejecutar
        }
    });
    $.Shortcuts.start();
});