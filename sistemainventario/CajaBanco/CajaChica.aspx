<%@ Page Title="Caja Chica" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CajaChica.aspx.cs" Inherits="SistemaInventario.CajaBanco.CajaChica" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"type="text/javascript"></script>
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
     <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript"  src="CajaChica.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" /> 
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />     
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div class="titulo"    style="width: 410px">LIQUIDACION DE CAJA</div> 
               <div id="tabRegistro" style="width: 410px">
                          <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" >
                                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix" >
                                    REGISTRO</div>
                         
                                <div id="divConsultaArticulo">
                           
                                         <div class="ui-jqdialog-content">
                                        <table  cellpadding="0" cellspacing="0" class="form-inputs">
                                                <tr>    
                                                    <td style="padding-left:5px;font-weight: bold">
                                                          Fecha
                                                    </td>

                                                    <td style="padding-left:5px;">
                                                          <asp:TextBox ID="txtDesde" runat="server" Width="55px"  Font-Names="Arial"  CssClass="Jq-ui-dtp" ReadOnly="true"   ForeColor="Blue"  Font-Bold="True" ></asp:TextBox>
                                                    </td>
                                                </tr>                                                 
                                        </table>
                                    </div>

                                    <div  class="linea-button">
                                                                          
                                      <asp:Button ID="btnReGenerarCaja" runat="server" Text="GENERAR CAJA" Font-Names="Arial"
                                                  class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                                    Width="200px" />

                                      <asp:Button ID="btnLiquidacionCaja" runat="server" Text="LIQUIDACION CAJA" Font-Names="Arial"
                                                  class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                                  style = "display:none;" Width="200px"/> 

                                      <asp:Button ID="btnReporteResumido" runat="server" Text="REPORTE RESUMIDO" Font-Names="Arial"
                                                  class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                                  style = "display:none;" Width="200px" /> 
                                     
                                      <asp:Button ID="btnReporteDetalle" runat="server" Text="REPORTE DETALLE" Font-Names="Arial"
                                                  class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                                  style = "display:none;" Width="200px" /> 

                                      <asp:Button ID="btnReporteCancelacion" runat="server" Text="REPORTE COMPROBANTE DE CANCELACION" Font-Names="Arial"
                                                  class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                                  style = "display:none;" Width="403px" /> 
                                     
                                    </div>
                                </div>

                    
                           </div>   
    
                        </div>

               <div id="divConsultaFactura" style="display:none;">
                           
                         <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 760px" >
                                   <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                    REGISTRO 
                                   </div>
                           
                                   <div >  
                             <table  cellpadding="0" cellspacing="0" class="form-inputs" width="760">
                                     <tr>

                                     <td  style="font-weight: bold">
                                            TIPO CAMBIO
                                     </td>

                                     <td>
                                     <table  cellpadding="0" cellspacing="0" >
                                     <tr>
                                       
                                     <td>
                                     <asp:TextBox ID="txtTC" runat="server" Width="30px" Font-Names="Arial"  ForeColor="Blue"  CssClass = "Derecha"  Font-Bold="True"   ></asp:TextBox>
                                     </td>

                                     <td  style="font-weight: bold;padding-left:26px;">
                               FECHA
                                </td>
                                
                                     <td style="padding-left:3px;">
                                  <asp:TextBox ID="txtEmision" runat="server" Width="55px" CssClass="Jq-ui-dtp"  Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ReadOnly="True" Enabled="False"></asp:TextBox>
                                  </td>

                                  <td  style="font-weight: bold;">
                               Operacion
                                </td>
                                
                                     <td style="padding-left:3px;">
                                  <asp:TextBox ID="txtOperacion" runat="server" Width="55px" CssClass="Jq-ui-dtp"  ReadOnly="True" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ></asp:TextBox>
                                  </td>

                                     <td style="padding-left:6px;font-weight: bold">
                                Moneda
                                </td>
                                                                    
                                     <td style="padding-left:3px;">
                                <div id="div_moneda">
                                         <asp:DropDownList ID="ddlMoneda" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   Width="95">
                                         </asp:DropDownList>
                                     </div>
                                </td>

                                     <td  style="padding-left:6px;font-weight: bold">
                                    Medio Pago
                                </td>
                                                                       
                                     <td style="padding-left:0px;">
                                     <div id="div_MedioPago">
                                         <asp:DropDownList ID="ddlMedioPago" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True" Enabled="False">   
                                         </asp:DropDownList>
                                     </div>
                                 </td>
                                </tr>
                                     </table>
                                     </td>

                                     </tr>
                                
                                     <tr>
                                      <td style="font-weight: bold">
                                   Banco
                                 </td>

                                      <td>
                                <table  cellpadding="0" cellspacing="0" >
                                <tr>
                                                                
                                 <td>
                                     <div id="div_Banco">
                                         <asp:DropDownList ID="ddlBanco" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   Width="160">
                                         </asp:DropDownList>
                                     </div>
                                 </td>

                                 <td style="font-weight: bold" >
                                   Nro Cta
                                 </td>
                                                                    
                                 <td style="padding-left:19px;">
                                     <div id="div_Cuenta">
                                         <asp:DropDownList ID="ddlCuenta" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   
                                             Width="210px" >
                                         </asp:DropDownList>
                                     </div>
                                 </td>

                                 <td style="font-weight: bold">
                             
                             </td>

                                 <td >
                            
                             </td>
                              
                               
                             </tr>
                                </table>
                                </td>
                                    </tr>

                                     <tr>
                                  <td style="font-weight: bold">
                             total FACTURA
                             </td>

                                <td>
                                <table  cellpadding="0" cellspacing="0" >
                                <tr>
                                   <td>
                             <asp:TextBox ID="txtTotalFactura" runat="server"  Width="90px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   CssClass = "Derecha"  ReadOnly="True" Text="0.00"></asp:TextBox>
                             </td>
                              
                                     <td style="padding-left:44px;font-weight: bold">
                           Nro Operacion
                             </td>

                             <td>
                              <asp:TextBox ID="txtNroOperacion" runat="server"  Width="206px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
                             
                             </td>
                             
                                     <td style="padding-left:59px;font-weight: bold">
                           
                             </td>

                             <td style = "display:none;">
                             <asp:TextBox ID="txtTotalLiquidacion" runat="server"  Width="90px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   CssClass = "Derecha"  Text="0.00"></asp:TextBox>
                             <asp:TextBox ID="txtMonto" runat="server"  Width="90px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   CssClass = "Derecha"  Text="0.00"></asp:TextBox>
                             </td>
                                </tr>
                                </table>
                                </td>
                                </tr>
                               </table>
                             
                            </div>                                 
                                <div class="linea-button">

                                <asp:Button ID="btnGrabar" runat="server" Text="Grabar"  
                                        class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                        Font-Names="Arial"  Font-Bold="True"    Width="120px"   />                            
                                
                                </div>
                        </div>
                        
                         <div id="div_grvConsultaFactura" style="padding-top:5PX;">
                                                            <asp:GridView ID="grvConsultaFactura" runat="server" AutoGenerateColumns="False" 
                                            border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                             Width="760"  >  
                                       
                                                <Columns>
                                                 <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                                        <ItemTemplate>                                                            
                                                            <asp:CheckBox runat="server" ID="chkOK" CssClass="chkSi" Text=""  onclick="F_ValidarCheck(this.id);"/>
                                                            <asp:HiddenField ID="hfTotal" runat="server" Value='<%# Bind("Total") %>' />
                                                            <asp:HiddenField ID="hfID" runat="server" Value='<%# Bind("ID") %>' />
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:TemplateField HeaderText="ID" >
                                                                <ItemStyle HorizontalAlign="Right" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblCodigo" Text='<%# Bind("Codigo") %>'></asp:Label>
                                                                </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:BoundField DataField="RazonSocial" HeaderText="RazonSocial">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>

                                                    <asp:TemplateField HeaderText="Numero" >
                                                                <ItemStyle HorizontalAlign="Center" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblFactura" Text='<%# Bind("Factura") %>'></asp:Label>
                                                                </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:TemplateField HeaderText="Emision" >
                                                                <ItemStyle HorizontalAlign="Center" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblEmision" Text='<%# Bind("Emision") %>'></asp:Label>
                                                                </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:BoundField DataField="Cancelacion" HeaderText="Cancelacion">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Center" />
                                                    </asp:BoundField>
                                                                                        
                                                    <asp:BoundField DataField="TotalFactura" HeaderText="Total" HeaderStyle-HorizontalAlign="Center" DataFormatString="{0:N2}">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>

                                                    <asp:TemplateField HeaderText="Moneda" >
                                                                <ItemStyle HorizontalAlign="Center" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblMoneda" Text='<%# Bind("Moneda") %>'></asp:Label>
                                                                </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:BoundField DataField="Estado" HeaderText="Estado">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>

                                                     <asp:BoundField DataField="Operacion" HeaderText="Operacion">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>
                                                </Columns>
             
                                            </asp:GridView>
                                                   </div>

               </div>
                          
               <div id="dlgWait" style="background-color:#CCE6FF; text-align:center; display:none;">
        <br /><br />
        <center><asp:Label ID="Label2" runat="server" Text="PROCESANDO..." Font-Bold="true" Font-Size="Large" style="text-align:center"></asp:Label></center>
        <br />
        <center><img alt="Wait..." src="../Asset/images/ajax-loader2.gif"/></center>
    </div>               
</asp:Content>