<%@ Page Title="Mantenimiento Serie" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="MantenimientoSerie.aspx.cs" Inherits="SistemaInventario.Maestros.MantenimientoSerie" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"type="text/javascript"></script>
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>  
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript"  src="MantenimientoSerie.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
     <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
     <link href="../Asset/toars/toastr.min.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/toars/toastr.min.js" type="text/javascript"></script>
 </asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div class="titulo" style="width: 410px">MANTENIMIENTO SERIE</div> 

                  
                        <div id="tabRegistro" style="width: 410px">
                          <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" >
                           <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                     MANTENIMIENTO SERIE
                            </div>
                           
                            <div >  
                             <table  cellpadding="0" cellspacing="0" class="form-inputs" width="410">
                                <tr>
                                   
                                     <td style="font-weight: bold">
                                EMPRESA
                                </td>

                                     <td>
                                <div id="div_Empresa">
                                         <asp:DropDownList ID="ddlEmpresa" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  Width="126">
                                         </asp:DropDownList>
                                     </div>
                                </td>                                     
                                </tr>
                                <tr>
                                   
                                     <td style="font-weight: bold">
                                Documento
                                </td>

                                     <td>
                                <div id="div_documento">
                                         <asp:DropDownList ID="ddlDocumento" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  >
                                         </asp:DropDownList>
                                     </div>
                                </td>

                                     <td style="font-weight: bold">
                                            Serie
                                     </td>

                                     <td>
                                      <div id="div_serie">
                                          <asp:DropDownList ID="ddlSerie" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   Width="64">
                                          </asp:DropDownList> 
                                      </div>
                                       
                                      </td>

                                     <td>
                                          <asp:TextBox ID="txtNumero" runat="server" Width="50" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ></asp:TextBox>
                                     </td>

                                </tr>

                                </table>
                             
                            </div>     
                            <div class="linea-button">
       <asp:Button ID="btnGrabar" runat="server" Text="GRABAR"  
                                                class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                                Font-Names="Arial"  Font-Bold="True"     Width="120" />
    </div >  
                         

                      </div>   
 
                       </div> 

                    <div id="dlgWait" style="background-color:#CCE6FF; text-align:center; display:none;">
        <br /><br />
        <center><asp:Label ID="Label2" runat="server" Text="PROCESANDO..." Font-Bold="true" Font-Size="Large" style="text-align:center"></asp:Label></center>
        <br />
        <center><img alt="Wait..." src="../Asset/images/ajax-loader2.gif"/></center>
    </div>  

     <input id="hfCodCtaCte" type="hidden"  value="0" />
     <input id="hfCodCtaCteConsulta" type="hidden"  value="0" />
     <input id="hfCodigoTemporal" type="hidden"  value="0" />
     <input id="hfCodDocumentoVenta" type="hidden" value="0" />
      <input id="hfCodUsuario" type="hidden" value="0" />
</asp:Content>
