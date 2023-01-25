var Altura = 767.75;
    var Ancho  = 1330;
    var Fuente_leyenda = 15;
    var Fuente_axixas = 30;
    var exportarData;
    var Fecha;
    var Grafico_PdfH=700;
    var Grafico_PdfW=850;

$(document).ready(function () {
    if (!F_SesionRedireccionar('')) return false;
    
    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('.MesAnioPicker').datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yymm',

        onClose: function (dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).val($.datepicker.formatDate('yymm', new Date(year, month, 1)));
        }
    });

    $('.MesAnioPicker').datepicker($.datepicker.regional['es']);

    $('.MesAnioPicker').focus(function () {
        $('.ui-datepicker-calendar').hide();
        $('#ui-datepicker-div').position({
            my: 'center top',
            at: 'center bottom',
            of: $(this)
        });
    });

    $('.MesAnioPicker').datepicker('setDate', new Date());

  
    $('#MainContent_btnBuscar').click(function () {
      
        try {
        if (!ValidacionFecha())
            return false;
//            documet.getElementById("btnGenerarPdf").disabled=false;
            $('#MainContent_btnGenerarPdf').prop("disabled", false); //desabilitar.
            google.charts.load('current', {packages: ['corechart', 'bar']});
            google.charts.setOnLoadCallback(function(){drawAnnotations()});
            
//            GRAFICO();
            return false;
        }
        catch (e) {

            alertify.log("Error Detectado: " + e);
        }


        return false;

    });

    $('#MainContent_btnGenerarPdf').click(function () {
        try {
          if (!ValidacionGrafico())
            return false; 
            F_PDF();
//            
            return false;
        }

        catch (e) {

            alert("Error Detectado: " + e);
        }

    });

    $('#MainContent_txtCliente').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

  $('#MainContent_btnGenerarPdf').prop("disabled", true); 
  
});

$().ready(function () {

    $(document).everyTime(900000, function () {

        $.ajax({
            type: "POST",
            url: '../Ventas/RegistroFactura.aspx/KeepActiveSession',
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

    $('.Jq-ui-dtp').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());

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

$(document).on("change", "select[id $= 'MainContent_ddlRuta']", function () {
    F_Vendedor($("#MainContent_ddlRuta").val());
});

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

function generarNumero(numero) {
	return (Math.random() * numero).toFixed(0);
}

function colorRGB() {
	var coolor = "(" + generarNumero(255) + "," + generarNumero(255) + ","+generarNumero(255) + "," + "0.2" + ")";

	return "rgb" + coolor;
}

function colorwidth() {
	var width = "(" + generarNumero(255) + "," + generarNumero(255) + "," + generarNumero(255) + "," + "1" + ")";

	return "rgb" + width;
}


function GRAFICO() {
//captura los valores
 var GraficoDesde = $("#MainContent_txtDesde").val();
 var GraficoHasta = $("#MainContent_txtHasta").val();


 $("#chart_bar").empty();
 



    Venta = [];
    Meses = [];
    colores = [];
    width = [];
    barmorris = [];
    $.ajax({
        type: "POST",
        url: "../Servicios/Servicios.asmx/F_GRAFICO_ESTADISTICO_NET",
        data: "{'GraficoDesde':'" + GraficoDesde + "','GraficoHasta':'" + GraficoHasta + "'}",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            toastr.warning(xhr.status + "\n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
        
            var data = JSON.parse(JSON.stringify(response));
            for (var i = 0; i < data.d.length; i++) {
                Meses.push(data.d[i]['Meses']);
                Venta.push(data.d[i]['Venta']);
//                colores.push(colorRGB());
//                width.push(colorwidth());
                //console.log(Meses);
                //console.log(Venta);
            };
            for (var i = 0; i < data.d.length; i++) {
                barmorris.push({
                    Meses: Meses[i],
                    Venta: Venta[i],
                    

                });
            };

            Morris.Bar({
                // ID of the element in which to draw the chart.
                element: 'chart_bar',
                // Chart data records -- each entry in this array corresponds to a point on
                // the chart.

                data: barmorris,
                // The name of the data record attribute that contains x-values.
                xkey: 'Meses',
                // A list of names of data record attributes that contain y-values.
                ykeys: ['Venta'],
                // Labels for the ykeys -- will be displayed when you hover over the
                // chart.
                labels: ['primera mitad'],
//                dataLabelsSize: true,
//                resize: true,
//                LineColors: ["#C14D9F", '#2CB4AC', '#2CB4AC'],
//                hideHover: colores,
//                barColors:width,
//                behaveLikeLine: true,
//                resize: true,
//                pointFillColors: ['#ffffff'],
//                pointStrokeColors: width,
//                fillOpacity: 0.6,
//                stacked: true,
//                lineColors: ['gray', 'red']
            })

            //-------------------------------
            //2. CREACION DE IMAGEN EN CANVAS
            //-------------------------------
            //transformo el grafico a img guardado en el canvas oculto
            var svg = $("#chart_bar").html();        
            canvg(document.getElementById('canvas'),svg.split("<div")[0]); 
            

            
//             var ctx = $("#canvas").get(0).getContext("2d");
//             var mychart= new Chart(ctx).Bar(Morris.Bar);
        }
    });

};

function F_PDF() {

//------------------
//3. CREACION DE PDF
//------------------
    //obtengo la imagen
    ///var imgData = canvas.toDataURL('image/png'); 
    var imgData = exportarData; 
    var fecha_actual = Fecha;
    //archivo fisico (en el directorio)
    //base64 = imagen convertida en alfanumerico

    var arg;
    try {
        var objParams =
            {
                Filtro_Img: imgData,
                Filtro_Desde: $('#MainContent_txtDesde').val(),
                Filtro_Hasta: $('#MainContent_txtHasta').val(),
                Filtro_Fecha: fecha_actual,
                Filtro_GraficoPDFH:Grafico_PdfH,
                Filtro_GraficoPDFW:Grafico_PdfW,
            };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        F_CrearPDF_NET
            (
                arg,
                function (result) {

                    var direccion = "";

            direccion = result.split('~')[0];

//-----------------------
//4. VISUALIZACION DE PDF
//-----------------------

               var rptURL = '';
                var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
                var TipoArchivo = 'application/pdf';
                var CodTipoArchivo = '5';
                var CodMenu = 2004;
                var SerieDoc = '0';

                rptURL = '../Reportes/Web_Pagina_Crystal.aspx';
                rptURL = rptURL + '?';
                rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
                rptURL = rptURL + 'txt=' + direccion + '&';

                window.open(rptURL, "PopUpRpt", Params);


                }
            );

    } catch (mierror) {
    }

return false;
}

function drawAnnotations() {
//    captura los valores
 var GraficoDesde = $("#MainContent_txtDesde").val();
 var GraficoHasta = $("#MainContent_txtHasta").val();

 var d = new Date();
  Fecha = d.toISOString().replace('T',"").replace('-',"").replace('-',"").replace('Z',"").replace(':',"").replace(':',"").split('.')[0];
  console.log(Fecha);


    Venta = [];
    Meses = [];
    colores = [];
    MostrarEspera(true);
    $.ajax({
        type: "POST",
        url: "../Servicios/Servicios.asmx/F_GRAFICO_ESTADISTICO_NET",
        data: "{'GraficoDesde':'" + GraficoDesde + "','GraficoHasta':'" + GraficoHasta + "'}",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            toastr.warning(xhr.status + "\n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
        
         var data = new google.visualization.DataTable(response);
        
      data.addColumn('string','Meses');
      data.addColumn('number','venta');
      data.addColumn({type: 'string', role: 'annotation', textStyle:{fontSize: 20}});
      var dataArray=[];
     
      $.each(response,function(i,obj){
      for (var a = 0; a < obj.length; a++) {
        dataArray.push([obj[a].Meses,obj[a].Venta,""+obj[a].Venta+""]);
              
            };

      data.addRows(dataArray);
      });
      var options = {
        annotations: {
          alwaysOutside: true,
          textStyle: {
            fontSize: Fuente_leyenda,
            color: '#000',
            auraColor: 'none'
          }
        },
        width: Ancho,
        height: Altura,
        bar: {groupWidth: "80%"},
        legend: { position: "none" },
        hAxis: {
          title: 'Periodo',
          
          textStyle: {
            fontSize: Fuente_leyenda,
//            color: '#053061',
            bold: true,
            italic: false
          },
          titleTextStyle: {
            fontSize: Fuente_axixas,
//            color: '#053061',
            bold: true,
            italic: false
          }
        },
        vAxis: {
          title: 'Venta',
          
          textStyle: {
            fontSize: Fuente_leyenda,
//            color: '#67001f',
            bold: false,
            italic: false
          },
          titleTextStyle: {
            fontSize: Fuente_axixas,
//            color: '#67001f',
            bold: true,
            italic: false
          }
        }
      };
      var char_area=document.getElementById("barchart_values");
      var chart = new google.visualization.ColumnChart(char_area);
      
      google.visualization.events.addListener(chart,'ready',function(){
//      char_area.innerHTML='<img src="' + chart.getImageURI() + '">';
        exportarData=chart.getImageURI();
//        var image =exportarData.replace('data:image/png;base64','');
//           console.log(exportarData);
        
      });

      chart.draw(data, options);
        MostrarEspera(false); 
//        });
        
        }
        
    });
    
};   

function ValidacionFecha(){
  try {
  var GraficoDesde = $("#MainContent_txtDesde").val();
 var GraficoHasta = $("#MainContent_txtHasta").val();
 
        var Cuerpo = '#MainContent_';
        var Cadena = 'Perido';

        var prueba =$(Cuerpo + 'txtHasta').val() - $(Cuerpo + 'txtDesde').val()

        if ($(Cuerpo + 'txtHasta').val() - $(Cuerpo + 'txtDesde').val() < 0 )
            Cadena =  'El ' +Cadena + ' debe estar dentro del rango' ;
        
        if ($(Cuerpo + 'txtHasta').val() - $(Cuerpo + 'txtDesde').val() >100 )
            Cadena = Cadena + ' No Mayor a 12 Meses' ;
        
       
                
        if (Cadena != 'Perido') {
            toastr.error(Cadena);
            return false;
        }
        return true;
    }
    catch (e) {
        toastr.warning("Error Detectado: " + e);
        return false;
    }
    console.log(prueba);
    console.log(fecha_grafico);
};

function ValidacionGrafico(){
  try {
  var GraficoDesde = $("#MainContent_txtDesde").val();
 var GraficoHasta = $("#MainContent_txtHasta").val();
 var fecha_grafico=Fecha;
        var Cuerpo = '#MainContent_';
        var Cadena = 'Generar';

        var prueba =$(Cuerpo + 'txtHasta').val() - $(Cuerpo + 'txtDesde').val()

//         if( $(exportarData).val()=== undefined)
//        Cadena = Cadena + ' primero Grafico' ;
//        
       
                
        if (Cadena != 'Generar') {
            toastr.error(Cadena);
            return false;
        }
        return true;
    }
    catch (e) {
        toastr.warning("Error Detectado: " + e);
        return false;
    }
    console.log(prueba);
    console.log(fecha_grafico);
};




