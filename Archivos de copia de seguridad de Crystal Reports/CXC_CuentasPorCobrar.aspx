<%@ Page Title="Reporte Cobranzas" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CXC_CuentasPorCobrar.aspx.cs" Inherits="SistemaInventario.Reportes.CXC_CuentasPorCobrar" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"type="text/javascript"></script>
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
       <script src="../Asset/js/js.js" type="text/javascript"></script> <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript" language="javascript" charset="UTF-8"></script>
    <script type="text/javascript" language="javascript"  src="CuentasPorCobrar.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
     <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />  <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" /> <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />

 </asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

        <div class="titulo"    style="width: 700px">Reporte de Cobranzas</div>               

        <div id='divConsulta' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all"  style="width: 700px">
                        
                                       <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                                 Criterio de busqueda
                                        </div>
                                        
                                        <div class="ui-jqdialog-content"  style="width: 700px;">
                                        <table cellpadding="0" cellspacing="0" class="form-inputs" width="700">
                                             <tr>
                                                        <td style="font-weight: bold">
                                                    CLIENTE
                                                </td>

                                                        <td style="padding-left:5px;">
                                            <asp:TextBox ID="txtCliente" runat="server" Width="358px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
                                            </td>

                                                        <td>
                                              <asp:CheckBox ID="chkVencidas" runat="server" Text="Solo Vencidas" Checked="True" Font-Bold="True"/>
                                            </td>

                                                        <td>
                                              <asp:CheckBox ID="chkDeudas" runat="server" Text="Solo DEUDAS"  Font-Bold="True"/>
                                            </td>
                                            
                                                        <td>
                                              <asp:CheckBox ID="chkTodas" runat="server" Text="todas" Font-Bold="True"/>
                                            </td>
                                            </tr>                 
                                        </table>
                                                      
                                        </div>

                                        <div class="linea-button">
                                        <asp:Button ID="btnBuscar" runat="server" Text="Reporte"  
                                            class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                                    Font-Names="Arial"  Font-Bold="True"      Width="120" />
                                        </div>

                        </div>
                         
        <div id="dlgWait" style="background-color:#CCE6FF; text-align:center; display:none;">
        <br /><br />
        <center><asp:Label ID="Label2" runat="server" Text="PROCESANDO..." Font-Bold="true" Font-Size="Large" style="text-align:center"></asp:Label></center>
        <br />
        <center><img alt="Wait..." src="../Asset/images/ajax-loader2.gif"/></center>
    </div>      
       
        <input id="hfCodCtaCte" type="hidden"  value="0" />

</asp:Content>