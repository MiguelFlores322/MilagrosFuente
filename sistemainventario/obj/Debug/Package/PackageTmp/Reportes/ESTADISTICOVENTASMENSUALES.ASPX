<%@ Page Title="Ventas" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="ESTADISTICOVENTASMENSUALES.ASPX.cs" Inherits="SistemaInventario.Reportes.ESTADISTICOVENTASMENSUALES" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
  
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>       
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    
    <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript" src="ESTADISTICOVENTASMENSUALES.js" charset="UTF-8"></script>
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />       
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/toars/toastr.min.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/toars/toastr.min.js" type="text/javascript"></script>

    <link href="../Asset/morris/morris.css" rel="stylesheet" />
    <script type="text/javascript" src="../Asset/morris/FileSaver.min.js"></script>
    <script type="text/javascript" src="../Asset/morris/canvas-toBlob.js"></script>
    <script type="text/javascript" src="../Asset/morris/raphael.min.js"></script>
    <script type="text/javascript" src="../Asset/morris/morris.min.js"></script>
    <script src="../Asset/morris/morris.js" type="text/javascript"></script>
    <%--<script src="../Asset/graficos_morris.js-0.5.1/morris.js" type="text/javascript"></script>--%>
    <script src="../Asset/morris/rgbcolor.js" type="text/javascript"></script>
    <script src="../Asset/graficos_morris.js-0.5.1/otros/canvg.js" type="text/javascript"></script>
    <script src="../Asset/graficos_morris.js-0.5.1/otros/canvg.min.js" type="text/javascript"></script>
    <script src="../Asset/morris/jspdf.min.js" type="text/javascript"></script>
    <script src="../Asset/graficos_morris.js-0.5.1/otros/html2canvas.js" type="text/javascript"></script>

    
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo" style="width: 430px">
        Reporte de Ventas</div>
    <div id='divConsulta' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all"
        style="width: 430px">
        <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
            Criterio de busqueda
        </div>
        <div class="ui-jqdialog-content" style="width: 430px;">
            <table cellpadding="0" cellspacing="0" class="form-inputs" width="350">
              <tr>
                    <td style="font-weight: bold">
                        Desde
                    </td>
                    <td colspan='4'>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:TextBox ID="txtDesde" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue" 
                                        Font-Bold="True" CssClass="MesAnioPicker" ReadOnly="True"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold; padding-left: 42px;">
                                    Hasta
                                </td>
                                <td>
                                    <asp:TextBox ID="txtHasta" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue" 
                                        Font-Bold="True" CssClass="MesAnioPicker" ReadOnly="True"></asp:TextBox>
                                </td>
                            </tr>
                            
                        </table>
                    </td>
                </tr>
                
                
            </table>
            <table>
                <tr>
                    <td style="font-weight: bold; ">
                        <aps:label>* PERIODO DE GRAFICO NO MAYOR A 12 MESES</aps:label>
                    </td>
                </tr>
            </table>
        </div>
        <div class="linea-button">
            <asp:Button ID="btnGenerarPdf" runat="server" Text="Generar PDF" Font-Names="Arial" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Width="120px"/>
            <asp:Button ID="btnBuscar" runat="server" Text="Generar Reporte" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                Font-Names="Arial" Font-Bold="True" Width="120" />
        </div>
    </div>
    <div id="tabRegistro">
        <table cellpadding="0" cellspacing="0" class="form-inputs"  style="width: 800px; height: 600px;">
            <tr>
                <td style="font-weight: bold" style="width: 800px; height: 600px;">
                    <div id="barchart_values" style="width: 800px; height: 600px;">
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div id="dlgWait" style="background-color: #CCE6FF; text-align: center; display: none;">
        <br />
        <br />
        <center>
            <asp:Label ID="Label2" runat="server" Text="PROCESANDO..." Font-Bold="true" Font-Size="Large"
                Style="text-align: center"></asp:Label></center>
        <br />
        <center>
            <img alt="Wait..." src="../Asset/images/ajax-loader2.gif" /></center>
    </div>
    <input id="hfCodCtaCte" type="hidden" value="0" />
    <input id="hfCliente" type="hidden" value="0" />
</asp:Content>
