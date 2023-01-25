<%@ Page Title="Caja Banco" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CajaBanco.aspx.cs" Inherits="SistemaInventario.CajaBanco.CajaBanco" %>
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
        <script type="text/javascript" language="javascript"  src="CajaBanco.js" charset="UTF-8"></script>
        <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
        <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
        <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
        <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />   
        <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div class="titulo"  style="width: 940px">REGISTRO DE CAJA BANCO</div> 

                    <div id="divTabs" style="width: 940px">

                        <ul>
                            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
                          <%--  <li id="liConsulta"><a href="#tabConsulta" onclick="getContentTab();">Consulta</a></li>--%>
                        </ul>

                        <div id="tabRegistro">
                        <table cellpadding="0" cellspacing="0" >
                        <tr>
                        <td valign="top">
                   <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 480px" >
                                   <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                     cuenta origen
                                   </div>
                           
                                 
                             <table  cellpadding="0" cellspacing="0" class="form-inputs" width="700">
                                 <tr>
                            <td style="font-weight: bold">
                                Empresa
                           </td>

                           <td>
                           <table cellpadding="0" cellspacing="0" >
                           <tr>
                           <td>
                                   <div id="div_Empresa">
                                         <asp:DropDownList ID="ddlEmpresa" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True" Width="130">
                                         </asp:DropDownList>
                                     </div>
                            </td>
                            <td  style="font-weight: bold" >
                               Emision
                                </td>
                                
                                     <td style="padding-left:25px;">
                                  <asp:TextBox ID="txtEmision" runat="server" Width="55px" CssClass="Jq-ui-dtp"  
                                             Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ReadOnly="True" ></asp:TextBox>
                                  </td>
                                  <td  style="font-weight: bold">
                                     tc
                                     </td>

                                     <td>
                                       <asp:TextBox ID="txtTC" runat="server" Width="55px" 
                                             Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True" ></asp:TextBox>
                                  </td>
                                  
                           </tr>
                           </table>
   </td>
                          </tr>
                       
                                <tr>

                                     <td   style="font-weight: bold" >
                                            Banco
                                     </td>

                                     <td>
                                     <table  cellpadding="0" cellspacing="0" >
                                     <tr>
                                     <td>
                                          <div id="div_Banco">
                                         <asp:DropDownList ID="ddlBanco" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True" Width="130">
                                         </asp:DropDownList>
                                     </div>
                                                                                
                                     </td>

                                       <td  style="font-weight: bold">
                                Moneda
                                </td>
                                                                    
                                     <td style="padding-left:24px;">
                                <div id="div_Moneda">
                                         <asp:DropDownList ID="ddlMoneda" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True" Width="140">
                                         </asp:DropDownList>
                                     </div>
                                </td>
                                <td>
                                <table>
                                <tr> 
                                </tr>
                                </table>
                                </td>
                                   

                                    
                                     </tr>
                                     </table>
                                     </td>

                                </tr>
                                
                                <tr>
                                 
                            <td  style="font-weight: bold">
                          Cuenta Bancaria
                             </td>

                             <td>
                             <table  cellpadding="0" cellspacing="0">
                             <tr>
                                 <td>
                                         <div id="div_CuentaBancaria">
                                         <asp:DropDownList ID="ddlCuentaBancaria" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True" Width="130">
                                         </asp:DropDownList>
                                     </div>
                                  </td>
                                     <td style="font-weight: bold">
                                Medio Pago
                           </td>   
                            <td style="padding-left: 4px;">
                                   <div id="div_MedioPago">
                                         <asp:DropDownList ID="ddlMedioPago" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True" Width="140" Enabled="False">
                                         </asp:DropDownList>
                                     </div>
                            </td>   

                                     
                            
                             </tr>
                             </table>
                             </td>
                         
                                </tr>
                                   
                                      <tr>
                                 
                            <td  style="font-weight: bold">
                          Nro Operacion
                             </td>

                             <td>
                             <table  cellpadding="0" cellspacing="0">
                             <tr>

                        

                                 <td>
                             <asp:TextBox ID="txtNroOperacion" runat="server"  Width="126px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  CssClass = "Derecha" ></asp:TextBox>
                             </td>

                                 
                            
                             </tr>
                             </table>
                             </td>
                         
                                </tr>
                                <tr>
                                <td  style="font-weight: bold" >
                               monto
                                </td>
                                <td>
                                <table  cellpadding="0" cellspacing="0" >
                                <tr>
                                <td >
                             <asp:TextBox ID="txtMonto" runat="server"  Width="126px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  CssClass = "Derecha" Text="0.00"></asp:TextBox>
                             </td>

                                   <td  style="font-weight: bold" >
                               Comision
                                </td>

                                 <td  style="font-weight: bold;padding-left:18px;"  >
                             <asp:TextBox ID="txtComision" runat="server"  Width="136px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  CssClass = "Derecha" Text="0.00"></asp:TextBox>
                             </td>
                                </tr>
                                </table>
                                </td>
                                 
                                </tr>
                               </table>
                             
                   </div>
                            
                      
                        </td>

                        <td valign="top" style="padding-left:5px;">
                    
                        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 420px" >
                                   <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                     cuenta destino
                                   </div>
                                 
                                   <table  cellpadding="0" cellspacing="0" class="form-inputs" width="700">
                                 <tr>
                            <td style="font-weight: bold">
                                Empresa
                           </td>

                           <td>
                           <table cellpadding="0" cellspacing="0" >
                           <tr>
                           <td>
                                   <div id="div_EmpresaDestino">
                                         <asp:DropDownList ID="ddlEmpresaDestino" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True" Width="130">
                                         </asp:DropDownList>
                                     </div>
                            </td>                        
                                 
                           </tr>
                           </table>
   </td>
                          </tr>
                       
                                <tr>

                                     <td   style="font-weight: bold" >
                                            Banco
                                     </td>

                                     <td>
                                     <table  cellpadding="0" cellspacing="0" >
                                     <tr>
                                     <td>
                                          <div id="div_BancoDestino">
                                         <asp:DropDownList ID="ddlBancoDestino" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True" Width="130">
                                         </asp:DropDownList>
                                     </div>
                                                                                
                                     </td>

                                       <td  style="font-weight: bold">
                                Moneda
                                </td>
                                                                    
                                     <td>
                                <div id="div_MonedaDestino">
                                         <asp:DropDownList ID="ddlMonedaDestino" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True" Width="105">
                                         </asp:DropDownList>
                                     </div>
                                </td>
                            
                                <td>
                                <table>
                                <tr>
 
                                </tr>
                                </table>
                                </td>
                                   
                                     </tr>
                                     </table>
                                     </td>

                                     
                                     
                                </tr>
                        

                                <tr>
                                 
                            <td  style="font-weight: bold">
                          Cuenta Bancaria
                             </td>

                             <td>
                             <table  cellpadding="0" cellspacing="0">
                             <tr>

                                                              <td>
                                         <div id="div_CuentaBancariaDestino">
                                         <asp:DropDownList ID="ddlCuentaBancariaDestino" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True" Width="130">
                                         </asp:DropDownList>
                                     </div>
                                  </td>
                               

                                     <td  style="font-weight: bold" >
                               monto
                                </td>

                                 <td style="padding-left:9px;">
                             <asp:TextBox ID="txtMontoDestino" runat="server"  Width="101px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  CssClass = "Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                             </td>

                                 
                            
                             </tr>
                             </table>
                             </td>
                         
                                </tr>
                               </table>
                                 
                                   <div class="linea-button">
                    <asp:Button ID="btnNuevo" runat="server" Text="Nuevo" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />
                  
                    <asp:Button ID="btnGrabar" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />
                </div> 
                        </div>                           
                        
                        </td>
                        </tr>
                        </table>
                           
                        </div>

                        <div id="tabConsulta" style = "display:none;">
                            <div id='divConsulta' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                        
                                       <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                                 Criterio de busqueda
                                        </div>
                                        
                                        <div class="ui-jqdialog-content">
                                        <table cellpadding="0" cellspacing="0" class="form-inputs" width="700">
                                        <tr>
                                    
                                             
                                             <td>
                                         <asp:CheckBox ID="chkNumero" runat="server" Text="Numero" Font-Bold="True" />
                                        </td>
                                             
                                             <td>
                                          <asp:TextBox ID="txtNumeroConsulta" runat="server" Width="55" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ></asp:TextBox>
                                     </td>

                                             <td>
                                               <asp:CheckBox ID="chkRango" runat="server" Text="Fecha" Font-Bold="True" />
                                              </td>

                                             <td>
                                                <asp:TextBox ID="txtDesde" runat="server" Width="55" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"    CssClass="Jq-ui-dtp"></asp:TextBox>
                                             </td>

                                             <td>
                                                <asp:TextBox ID="txtHasta" runat="server" Width="55" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"    CssClass="Jq-ui-dtp"></asp:TextBox>
                                             </td>

                                             <td>
                                               <asp:CheckBox ID="chkCliente" runat="server" Text="Cliente" Font-Bold="True" />
                                              </td>

                                             <td>
                                                <asp:TextBox ID="txtProveedorConsulta" runat="server" Width="430" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ></asp:TextBox>
                                             </td>

                                      
                                        </tr>
                                                                           
                                        </table>
                                                      
                            </div>

                            <div class="linea-button">
                                        <asp:Button ID="btnBuscarConsulta" runat="server" Text="Buscar"  
                                            class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                                    Font-Names="Arial" Font-Bold="True"     Width="120px"       />
                            </div>

                            
                        </div>

                        <div id="div_consulta" style="padding-top:5px;">
                                                    <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" 
                                            border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                         Width="913px" OnRowDataBound="grvConsulta_RowDataBound">
                                            
                                                <Columns>
                                                            <asp:TemplateField>
                                                                <ItemTemplate>
                                                                    <asp:ImageButton runat="server" id="imgProforma" ImageUrl="~/Asset/images/texto.png" ToolTip="PROFORMA" OnClientClick="F_Proforma(this); return false;" />
                                                                </ItemTemplate>
                                                            </asp:TemplateField>

                                                            <asp:TemplateField>
                                                                <ItemTemplate>
                                                                    <asp:ImageButton runat="server" id="imgEliminarDocumento" ImageUrl="~/Asset/images/EliminarBtn.png" ToolTip="ELIMINAR LETRA" OnClientClick="F_EliminarRegistro(this); return false;" />
                                                                </ItemTemplate>
                                                            </asp:TemplateField>

                                                            

                                                               <%--  <asp:TemplateField  HeaderText="">
                                                                <ItemTemplate>
                                                                    <asp:ImageButton runat="server" id="imgImprimir" ImageUrl="~/Asset/images/imprimir.gif" ToolTip="IMPRIMIR LETRA" OnClientClick="F_Imprimir(this); return false;" />
                                                                </ItemTemplate>
                                                            </asp:TemplateField>
--%>
                                                    <asp:TemplateField>
                                                    <ItemTemplate>
                                                        <img id="imgMas" alt = "" style="cursor: pointer" src="../Asset/images/plus.gif" onclick="imgMas_Click(this);" title="Ver Detalle" />
                                                        <asp:Panel ID="pnlOrders" runat="server" Style="display: none">

                                                            <asp:GridView runat="server" ID="grvDetalle"  border="0" CellPadding="0" CellSpacing="1"  GridLines="None" class="GridView" />
                                                 

                                                        </asp:Panel>
                                                    </ItemTemplate>
                                                </asp:TemplateField>

                                                    <asp:TemplateField HeaderText="ID" >
                                                                <ItemStyle HorizontalAlign="Right" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblCodigo" Text='<%# Bind("Codigo") %>'></asp:Label>
                                                                </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:TemplateField HeaderText="RazonSocial" >
                                                        <ItemStyle HorizontalAlign="Left" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblcliente" Text='<%# Bind("RazonSocial") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:TemplateField HeaderText="Numero" >
                                                        <ItemStyle HorizontalAlign="Right" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblNumero" Text='<%# Bind("Numero") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:BoundField DataField="Emision" HeaderText="Emision" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Center" />
                                                    </asp:BoundField>
                                           
                                                    <asp:BoundField DataField="Vcto" HeaderText="Vcto" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Center" />
                                                    </asp:BoundField>

                                                    <asp:BoundField DataField="Moneda" HeaderText="Moneda" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>
                                           
                                                   <asp:BoundField DataField="Total" HeaderText="Total" HeaderStyle-HorizontalAlign="Center" DataFormatString="{0:N2}">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>

                                                     <asp:BoundField DataField="Saldo" HeaderText="Saldo" HeaderStyle-HorizontalAlign="Center" DataFormatString="{0:N2}">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>

                                                    <asp:BoundField DataField="TipoCambio" HeaderText="TC">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>
                                                                                                    
                                                    <asp:TemplateField HeaderText="Estado" HeaderStyle-HorizontalAlign="Center" >
                                                        <ItemStyle HorizontalAlign="Left" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblEstado" Text='<%# Bind("Estado") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:BoundField DataField="FechaCancelacion" HeaderText="Cancelacion" HeaderStyle-HorizontalAlign="Center" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Center" />
                                                    </asp:BoundField>
                                                </Columns>

                                                    </asp:GridView>
                                    
                                    </div>
                      </div>  
                   
                    </div> 
                    
                    <div id="dlgWait" style="background-color:#CCE6FF; text-align:center; display:none;">
        <br /><br />
        <center><asp:Label ID="Label2" runat="server" Text="PROCESANDO..." Font-Bold="true" Font-Size="Large" style="text-align:center"></asp:Label></center>
        <br />
        <center><img alt="Wait..." src="../Asset/images/ajax-loader2.gif"/></center>
    </div>
                    <input id="hfFlagRenovar" type="hidden"  value="0" />
                    <input id="hfCodCtaCte" type="hidden"  value="0" />
                    <input id="hfCodCtaCteConsulta" type="hidden"  value="0" />
                    <input id="hfCodigoTemporal" type="hidden"  value="0" />
                    <input id="hfCodDocumentoVenta" type="hidden" value="0" />
                    <input id="hfCodEmpresa" type="hidden"  value="0" />
                    <input id="hfCodSede" type="hidden" value="0" />
</asp:Content>
