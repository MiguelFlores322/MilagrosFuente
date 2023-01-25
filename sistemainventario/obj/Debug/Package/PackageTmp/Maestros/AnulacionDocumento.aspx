<%@ Page Title="Anulacion" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AnulacionDocumento.aspx.cs" Inherits="SistemaInventario.Ventas.AnulacionDocumento" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"type="text/javascript"></script>
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>  <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript"  src="AnulacionDocumento.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
     <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" /> <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />      <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />

 </asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div class="titulo" style="width: 410px">ANULACION DE DOCUMENTOS</div> 

                  
                        <div id="tabRegistro" style="width: 410px">
                          <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" >
                           <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                     ANULACION
                            </div>
                           
                            <div >  
                             <table  cellpadding="0" cellspacing="0" class="form-inputs" width="410">
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

                                <tr>
                                     <td style="font-weight: bold">
                                     Tipo Cambio
                                     </td>

                                     <td>
                                     
                                   <asp:Label ID="lblTC" runat="server" Text="Label" Font-Bold="True"  ></asp:Label>
                                                                  
                                     
                                 </td>

                                     <td style="font-weight: bold">
                                     Fecha
                                     </td>

                                     <td>
                                     
                                   <asp:TextBox ID="txtEmision" runat="server" Width="60px" CssClass="Jq-ui-dtp"  Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ReadOnly="True"></asp:TextBox>
                                 
                                     
                                 </td>

                                     <td>
                                <div id="div_igv">
                                         <asp:DropDownList ID="ddlIgv" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   Width="54">
                                         </asp:DropDownList>
                                     </div>
                                </td>
                                </tr>
                              
                                
                                </table>
                             
                            </div>     
                            <div class="linea-button">
       <asp:Button ID="btnGrabar" runat="server" Text="ANULAR"  
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
