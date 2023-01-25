<%@ Page Title="Inventario Valorizado" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="InventarioValorizado.aspx.cs" Inherits="SistemaInventario.Reportes.InventarioValorizado" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"
        type="text/javascript"></script>
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript" src="InventarioValorizado.js"
        charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo" style="width: 430px">
        Inventario Valorizado</div>
    <div id="tabRegistro" style="width: 430px">
        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                CRITERIO DE BUSQUEDA
            </div>
            <div class="ui-jqdialog-content">
                <table cellpadding="0" cellspacing="0" class="form-inputs">
                    <tr>
                        <td style="font-weight: bold">
                            Descripcion
                        </td>

                        <td>
                        
                        <table cellpadding="0" cellspacing="0">
                        <tr>
                         <td>
                  
                                <asp:TextBox ID="txtArticulo" runat="server" Width="300px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True"></asp:TextBox>
                          
                        </td>
                        </tr>
                        </table>
                        </td>
                       
                    </tr>
                    <tr>
                        <td>
                            
                        </td>
                        <td>
                        <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding-left: 5px; font-weight: bold">
                            <asp:CheckBox ID="chkStock" runat="server" Font-Bold="True" Text="INCLUIR LO PRODUCTOS QUE NO TIENEN STOCK" />
                        </td>
                        <td style="font-weight: bold;display:none">
                        <asp:CheckBox ID="chkAlmacen" runat="server" Font-Bold="True" Text="TODOS LOS ALMACENES"/>
                        </td>
                        </tr>
                        </table>
                        </td>
                   

                       
                    </tr>
                   
                </table>
            </div>
            <div class="linea-button">
                <asp:Button ID="btnReporte" runat="server" Text="Reporte" Font-Names="Arial" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    Width="120px" />
            </div>
        </div>
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
