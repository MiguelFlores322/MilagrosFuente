function loadEditar(idValorCuota,idAfp){            
            $.ajax({
                url:"frmMantValorCuota.aspx?idValorCuota="+idValorCuota + "&idAfp=" + idAfp ,
                success: function(html) {                                            
                            jqueryDialog('Editar Valor Cuota',html, '480px');
                          }
            })
        } 
        
        function loadEditarComision(idComision,idAfp,Anio,Mes){            
            $.ajax({
                url:"frmMantComision.aspx?idComision="+idComision + "&idAfp=" + idAfp,
                success: function(html) {                                            
                            jqueryDialog('Editar Comision',html, '1210px');
                          }
            })
        } 
            
       function loadEditarRegalo(idRegalo){            
            $.ajax({
                url:"frmMantRegalo.aspx?idRegalo="+idRegalo+"&accion=0",
                success: function(html) {                  
                            jqueryDialog('Editar Regalo',html, '800px');
                            $("#btnGuardar").click(function(){
                                $.ajax({
                                    dataType : "json",
                                    url: "frmMantRegalo.aspx?idRegalo="+idRegalo+"&txtCodigo="+$("#txtCodigo").val()+"&txtNombre="+$("#txtNombre").val()+"&txtUnidad="+$("#txtUnidad").val()+"&txtPrecio="+$("#txtPrecio").val()+"&accion=2",
                                    success: function(data){                                                                                    
                                        if(data!=""){
                                        alert(data.mensaje)                                            
                                            jqueryDialog_close();
                                            $("#btnActualizarLista").click();
                                        }                                                                                                                        
                                    }                                    
                                })
                            })                            
                          }
            })
        } 
        // 
               function loadEditarEstadoGestion(IdEstadoGestion){            
                    $.ajax({
                        url:"frmMantEstadoGestion.aspx?IdEstadoGestion="+IdEstadoGestion+"&accion=0" ,
                        success: function(html) {                  
                                    jqueryDialog('Editar Estado Gestion',html, '470px');
                                    $("#btnGuardar").click(function(){                                    
                                        $.ajax({  
                                           dataType : "json" ,
                                           url : "frmMantEstadoGestion.aspx?IdEstadoGestion="+IdEstadoGestion+"&NombreEstado="+$("#txtNombreEstado").val()+"&IdEstadoPadre="+$("#txtIdEstadoPadre").val()+"&Estado="+$("#txtEstado").val()+"&accion=2",                                            
                                            success: function (data){
                                                if(data!=""){  
                                                alert(data.mensaje)                                           
                                                    jqueryDialog_close();
                                                    $("#btnActualizarLista").click();                                                   
                                                }                                      
                                            }
                                        })                                        
                                    })
                                  }
                    })
                } 
        
         function loadEditarMetaCargo(IdMetaCargo){            
            $.ajax({
                url:"frmMantMetaCargo.aspx?IdMetaCargo="+IdMetaCargo+"&accion=0" ,
                success: function(html) {                  
                            jqueryDialog('Editar Meta Cargo',html, '470px');
                            $("#btnGuardar").click(function(){
                                $.ajax({
                                    dataType : "json",
                                    url: "frmMantMetaCargo.aspx?IdMetaCargo="+IdMetaCargo+"&Cargo="+$("#cboCargo").val()+"&MetaDiaria="+$("#txtMetaDiaria").val()+"&Estado="+$("#txtEstado").val()+"&accion=2",
                                    success: function(data){
                                        if(data!=""){
                                        alert(data.mensaje) 
                                            jqueryDialog_close();
                                            $("#btnActualizarLista").click();     
                                        }
                                    }
                                })
                            })
                          }
            })
        } 
        
     
        
             function loadEditarCanal(IdCanal){            
            $.ajax({
                url:"frmMantCanal.aspx?IdCanal="+IdCanal+"&accion=0" ,
                success: function(html) {                  
                            jqueryDialog('Editar Canal',html, '480px');
                            $("#btnGuardar").click(function(){
                                $.ajax({
                                    dataType: "json",
                                    url: "frmMantCanal.aspx?IdCanal="+IdCanal+"&Descripcion="+$("#txtDescripcion").val()+"&CanalOportunidad="+$("#txtCanalOportunidad").val()+"&accion=2",
                                    success: function(data){
                                        if(data!=""){
                                            alert(data.mensaje) 
                                            jqueryDialog_close();
                                            $("#btnActualizarLista").click();     
                                        }
                                   }
                                })
                            })
                          }
            })
        } 
        
           function loadEditarAFP(IdAFP){            
            $.ajax({
                url:"frmMantAFP.aspx?IdAFP="+IdAFP+"&accion=0" ,
                success: function(html) {                  
                            jqueryDialog('Editar AFP',html, '500px');
                            $("#btnGuardar").click(function(){
                                $.ajax({
                                    dataType: "json",
                                    url: "frmMantAFP.aspx?IdAFP="+IdAFP+"&Nombre="+$("#txtNombre").val()+"&Registrado="+$("#txtRegistrado").val()+"&Color="+$("#txtColor").val()+"&Sombra="+$("#txtSombra").val()+"&accion=2",
                                    success: function(data){
                                        if(data!=""){
                                            alert(data.mensaje) 
                                            jqueryDialog_close();
                                            $("#btnActualizarLista").click();     
                                        }
                                   }
                                })
                            })
                          }
            })
        } 
               
        function loadAgregar(){            
            $.ajax({
                url:"frmAgregarValorCuota.aspx?idValorCuota=0",
                success: function(html) {
                            jqueryDialog('Agregar Valor Cuota ',html, '1250px');
                          }
            })
        }
        function loadAgregarComision(){            
            $.ajax({
                url:"frmAgregarComision.aspx?idComision=0",
                success: function(html) {
                            jqueryDialog('Agregar Comision ',html, '1100px');
                          }
            })
        }
        
          function loadAgregarAFP(){            
            $.ajax({
                url:"frmAgregarAFP.aspx",
                success: function(html) {
                            jqueryDialog('Agregar AFP ',html, '500px');
                          }
            })
        }

        function loadAgregarTipoRiesgo() {
            $.ajax({
                url:"frmAgregarTipoRiesgo.aspx",
                success: function(html) {
                    jqueryDialog('Agregar Tipo Riesgo', html, '500px');
                }
            })
        }
        
           function loadAgregarEstadoGestion(){            
            $.ajax({
                url:"frmAgregarEstadoGestion.aspx",
                success: function(html) {
                            jqueryDialog('Agregar Estado Gestion ',html, '470px');
                          }
            })
        }
        
        
                function loadAgregarRegalo(){            
            $.ajax({
                url:"frmAgregarRegalo.aspx?idRegalo=0",
                success: function(html) {
                            jqueryDialog('Agregar Regalo ',html, '800px');
                          }
            })
        }
          function loadAgregarMetaCargo(){            
            $.ajax({
                url:"frmAgregarMetaCargo.aspx?IdMetaCargo=0",
                success: function(html) {
                            jqueryDialog('Agregar Meta Cargo ',html, '470px');
                          }
            })
        }
        
           function loadAgregarCanal(){            
            $.ajax({
                url:"frmAgregarCanal.aspx?IdCanal=0",
                success: function(html) {
                            jqueryDialog('Agregar Canal ',html, '480px');
                          }
            })
        }
        
           function CambiarEstado(idEstado,Estado){
            if(confirm ('¿Esta seguro de cambiar el estado?')){  
                $.ajax({
                url:"frmCambiarEstado.aspx?idRegalo="+idEstado + "&Estado=" + Estado ,
                success: function(html) {
                           window.location.reload();
                          }
            })          
                   
                    }
        }
        
        
//     
//    function tamano()
//        {   var d;
//            d=document.form1;
//            switch (d.cboPaginas.value)
//            {
//                case "10":
//                document.getElementById("DataDiv").style.height="210px";
//                document.getElementById("GridView1").style.height="210px";
//                break;
//                case "20":
//                document.getElementById("DataDiv").style.height="420px";
//                document.getElementById("GridView1").style.height="420px";
//                break;
//                default:
//                document.getElementById("DataDiv").style.height="500px";
//                document.getElementById("GridView1").style.height="500px";
//                break;
//            }
//        }
//        
//    function CreateGridHeader(DataDiv, GridView1, HeaderDiv) 
//    { 
//        var DataDivObj = $("#"+DataDiv);
//        var DataGridObj = $("#"+GridView1);        
//        var HeaderDivObj = $("#"+HeaderDiv);
//        
//        //********* Creating new table which contains the header row ***********
//        var HeadertableObj = HeaderDivObj.append(document.createElement('table'));
//        
//        DataDivObj.css("padding-top","0px");
//        var DataDivWidth = DataDivObj.clientWidth;
//        DataDivObj.css("width","500px");
//        
//        //********** Setting the style of Header Div as per the Data Div ************
//        HeaderDivObj.className = DataDivObj.className;
//        //HeaderDivObj.style.cssText = DataDivObj.style.cssText;
//        HeaderDivObj.css("cssText",DataDivObj.css("cssText"));
//        //**** Making the Header Div scrollable. *****
//        HeaderDivObj.css("overflow","auto"); 
//        //*** Hiding the horizontal scroll bar of Header Div ****
//        HeaderDivObj.css("overflow-x","hidden");         
//        //**** Hiding the vertical scroll bar of Header Div **** 
//        HeaderDivObj.css("overflow-y","hidden");         
//        
//        HeaderDivObj.css("height",$("#"+GridView1+' tr').eq(0).height()+'px');         
//        var header = $("#"+GridView1+' tr').eq(0).html();
//        //HeaderDivObj.style.height = DataGridObj.rows[0].clientHeight + 'px';
//        //**** Removing any border between Header Div and Data Div ****
//        HeaderDivObj.css("border-bottom-width",'0px'); 
//        
//        //********** Setting the style of Header Table as per the GridView ************
//        HeadertableObj.attr("class",DataGridObj.attr("class"));
//        alert(HeadertableObj.attr("class"));
//        //**** Setting the Headertable css text as per the GridView css text 
//        HeadertableObj.css("cssText",DataGridObj.css("cssText")); 
//        HeadertableObj.css({ "border": "Solid 1px" });
//	    HeadertableObj.rules = 'all';
//        HeadertableObj.cellPadding = DataGridObj.cellPadding;
//	    HeadertableObj.cellSpacing = DataGridObj.cellSpacing;
//        
//        //********** Creating the new header row **********
//        var Row = HeadertableObj.append("<tr></tr>"); 
//        Row.attr("class",$("#"+GridView1+' tr').eq(0).attr("class"));
//        Row.css("cssText",$("#"+GridView1+' tr').eq(0).css("cssText"));        
//        Row.css("font-weight","bold");
//        //Row.append(header); 

//        //******** This loop will create each header cell *********
//        for(var iCntr =0; iCntr < $("#"+GridView1+' tr').eq(0).cells.length; iCntr++)
//        {
//            var spanTag = Row.append(document.createElement('td'));
//            spanTag.innerHTML = $("#"+GridView1+' tr').eq(0).cells[iCntr].innerHTML;
//            var width = 0;
//            //****** Setting the width of Header Cell **********
//            if(spanTag.clientWidth > $("#"+GridView1+' tr').eq(1).cells[iCntr].clientWidth)
//            {
//                width = spanTag.clientWidth;
//            }
//            else
//            {
//                width = $("#"+GridView1+' tr').eq(1).cells[iCntr].clientWidth;
//            }
//            if(iCntr<=DataGridObj.rows[0].cells.length-2)
//            {
//                spanTag.style.width = width + 'px';
//            }
//            else
//            {
//                spanTag.style.width = width + 20 + 'px';
//            }
//            DataGridObj.rows[1].cells[iCntr].style.width = width + 'px';
//        }
//        var tableWidth = DataGridObj.clientWidth;
//        //********* Hidding the original header of GridView *******
//        DataGridObj.rows[0].style.display = 'none';
//        //********* Setting the same width of all the componets **********
//        HeaderDivObj.style.width = DataDivWidth + 'px';
//        DataDivObj.style.width = DataDivWidth + 'px';    
//        DataGridObj.style.width = tableWidth + 'px';
//        HeadertableObj.style.width = tableWidth + 20 + 'px';
//        return false;
//    }  

//    function Onscrollfnction() 
//    {   
//        var div = document.getElementById('DataDiv'); 
//        var div2= document.getElementById('HeaderDiv'); 
//        //****** Scrolling HeaderDiv along with DataDiv ******
//        div2.scrollLeft = div.scrollLeft; 
//        return false;
//    }