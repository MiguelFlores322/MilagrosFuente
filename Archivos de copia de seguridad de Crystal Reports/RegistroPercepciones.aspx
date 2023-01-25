<%@ Page Title="Percepciones" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="RegistroPercepciones.aspx.cs" Inherits="SistemaInventario.CuentasPorPagar.RegistroPercepciones" %>
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
    <script type="text/javascript" language="javascript"  src="RegistroPercepciones.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" /> 
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />      
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div class="titulo"  style="width: 940px">COMPROBANTE DE PERCEPCION</div> 

                     <div id="divTabs"  style="width: 940px">

                        <ul>
                            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
                            <li id="liConsulta"><a href="#tabConsulta" onclick="getContentTab();">Consulta</a></li>
                        </ul>

                        <div id="tabRegistro">
                               <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" >
                                   <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                    REGISTRO DE Percepciones
                                   </div>
                           
                                   <div >  
                             <table  cellpadding="0" cellspacing="0" class="form-inputs" width="750">
                                    <tr>
                            <td style="font-weight: bold">
                                Empresa
                           
                            </td>
                            <td style="padding-left:4px;">
                                <asp:TextBox ID="txtEmpresa" runat="server" Width="394px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True" ReadOnly="true" Font-Size="Medium"></asp:TextBox>
                            </td>
                        </tr>
                                     <tr>

                                     <td style="font-weight: bold">
                                            Razon Social
                                     </td>

                                     <td>
                                     <table  cellpadding="0" cellspacing="0" >
                                     <tr>
                                       <td>
                                        <asp:TextBox ID="txtProveedor" runat="server" Width="300px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ></asp:TextBox>
                                                                                
                                     </td>

                                     <td style="font-weight: bold">
                                     Serie
                                     </td>

                                     <td>
                                   
                                     <asp:TextBox ID="txtSerie" runat="server" Width="51px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  CssClass="Derecha"  ></asp:TextBox>
                                     </td>

                                     <td style="font-weight: bold">
                                     Numero
                                     </td>

                                     <td>
                                   
                                     <asp:TextBox ID="txtNumero" runat="server" Width="60px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  CssClass="Derecha"  ></asp:TextBox>
                                     </td>

                                     <td style="font-weight: bold">
                               Emision
                                </td>
                                
                                     <td>
                                  <asp:TextBox ID="txtEmision" runat="server" Width="55px" CssClass="Jq-ui-dtp"  
                                             Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ReadOnly="True" ></asp:TextBox>
                                  </td>

                                     <td style="padding-left:26px;font-weight: bold"">
                                Moneda
                                </td>
                                                                    
                                     <td style="padding-left:22px;">
                                <div id="div_moneda">
                                         <asp:DropDownList ID="ddlMoneda" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   Width="84">
                                         </asp:DropDownList>
                                     </div>
                                </td>
                                     </tr>
                                     </table>
                                     </td>
                                   

                                                        
                                </tr>
                                
                                     <tr>
                                     <td style="font-weight: bold">
                                     Responsable
                                     </td>

                                <td >
                                <table  cellpadding="0" cellspacing="0" >
                                <tr>
                                     <td>
                                        <asp:TextBox ID="txtResponsable" runat="server" Width="300px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ></asp:TextBox>
                                                                                
                                     </td>

                                      <td style="font-weight: bold">
                                Tasa
                                </td>
                                                                    
                                     <td style="padding-left:6px;">
                                <div id="div_tasa">
                                         <asp:DropDownList ID="ddlTasa" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   Width="55">
                                         </asp:DropDownList>
                                     </div>
                                </td>

                                <td style="padding-left:4px;font-weight: bold">
                                     tc
                                     </td>

                                     <td style="padding-left:31px;">
                                   
                                     <asp:TextBox ID="txtTC" runat="server" Width="60px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  CssClass="Derecha" ></asp:TextBox>
                                     </td>
                                
                                

                            <td style="padding-left:3px;font-weight: bold">
                             Afecto 
                             </td>

                                 <td style="padding-left:3px;">
                             <asp:TextBox ID="txtFactura" runat="server"  Width="80px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ReadOnly="True" CssClass="Derecha" Text="0.00"></asp:TextBox>
                             </td>
                              <td style="padding-left:0px;font-weight: bold">
                             Percepcion 
                             </td>

                                 <td style="padding-left:9px;">
                             <asp:TextBox ID="txtTotalFactura" runat="server"  Width="80px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  CssClass="Derecha"  Text="0.00"></asp:TextBox>
                             </td>

                             </tr>
                                </table>
                                </td>
                                </tr>
                                                             
                               </table>
                             
                            </div>     
                                                               
                                   <div class="linea-button">

                                <asp:Button ID="btnNuevo" runat="server" Text="Nuevo"  
                                class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                        Font-Names="Arial" Font-Bold="True"   Width="120px"    />
                         
                                <asp:Button ID="btnAgregarFactura" runat="server" Text="Agregar"  
                                class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                        Font-Names="Arial" Font-Bold="True" Width="120px"       />
                                                         
                                  <asp:Button ID="btnEliminarFactura" runat="server" Text="Eliminar"  
                                class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                        Font-Names="Arial"  Font-Bold="True"  Width="120px"     />
                           
                                <asp:Button ID="btnGrabar" runat="server" Text="Grabar"  
                                class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                        Font-Names="Arial"  Font-Bold="True"    Width="120px"   />
                            
                            </div>

                        </div>

                                   <div id="div_grvFactura" style="padding-top:5PX;">
                                                    <asp:GridView ID="grvFactura" runat="server" AutoGenerateColumns="False" 
                                            border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                            Width="608px" >
                                                    <Columns>

                                                              <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                                        <ItemTemplate>                                                            
                                                            <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete"  Text="" />
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                              <asp:TemplateField HeaderText="ID" >
                                                                <ItemStyle HorizontalAlign="Right" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblDetalle" Text='<%# Bind("Detalle") %>'></asp:Label>
                                                                </ItemTemplate>
                                                    </asp:TemplateField>

                                                              <asp:TemplateField HeaderText="Codigo" >
                                                                <ItemStyle HorizontalAlign="Right" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblcodigo" Text='<%# Bind("Codigo") %>'></asp:Label>
                                                                </ItemTemplate>
                                                    </asp:TemplateField>

                                                              <asp:TemplateField HeaderText="Factura" >
                                                                <ItemStyle HorizontalAlign="Right" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblFactura" Text='<%# Bind("Factura") %>'></asp:Label>
                                                                </ItemTemplate>
                                                    </asp:TemplateField>
                                                                                                   
                                                              <asp:BoundField DataField="Emision" HeaderText="Emision" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Center" />
                                                    </asp:BoundField>
                 
                                                              <asp:BoundField DataField="Total" HeaderText="Venta AFECTA">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>

                                                              <asp:BoundField DataField="Moneda" HeaderText="Moneda" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>
                                               
                                                   
                                                    </Columns>

                                                    </asp:GridView>
                                    
                                    </div>
                           
                        </div>

                        <div id="tabConsulta">
                            <div id='divConsulta' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                        
                                       <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                                 Criterio de busqueda
                                        </div>
                                        
                                        <div class="ui-jqdialog-content">
                                        <table cellpadding="0" cellspacing="0" class="form-inputs" width="700">
                                        <tr>
                                                                                         
                                             <td style="font-weight: bold">
                                         <asp:CheckBox ID="chkNumero" runat="server" Text="Numero" />
                                        </td>

                                             <td>
                                          <asp:TextBox ID="txtNumeroConsulta" runat="server" Width="70" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ></asp:TextBox>
                                     </td>

                                             <td style="font-weight: bold">
                                               <asp:CheckBox ID="chkRango" runat="server" Text="Fecha" />
                                              </td>

                                             <td>
                                                <asp:TextBox ID="txtDesde" runat="server" Width="55" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True" CssClass="Jq-ui-dtp"></asp:TextBox>
                                             </td>

                                             <td>
                                                <asp:TextBox ID="txtHasta" runat="server" Width="55" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True" CssClass="Jq-ui-dtp"></asp:TextBox>
                                             </td>

                                             <td style="font-weight: bold">
                                               <asp:CheckBox ID="chkCliente" runat="server" Text="Cliente" />
                                              </td>

                                             <td>
                                                <asp:TextBox ID="txtProveedorConsulta" runat="server" Width="450" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ></asp:TextBox>
                                             </td>

                                        </tr>

                                        
                                        </table>
                                                      
                            </div>

                            <div class="linea-button">
                            <asp:Button ID="btnBuscarConsulta" runat="server" Text="Buscar"  
                                            class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                                    Font-Names="Arial" Font-Bold="True" Width="120" />
                            </div>
                        </div>

                        <div id="div_consulta" style="padding-top:5PX;" >
                            <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" 
                                            border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                            Width="912px" OnRowDataBound="grvConsulta_RowDataBound">
                                                <Columns>
                                                    <asp:TemplateField>
                                                                <ItemTemplate>
                                                                    <asp:ImageButton runat="server" id="imgAnularDocumento" ImageUrl="~/Asset/images/EliminarBtn.png" ToolTip="ELIMINAR RETENCION" OnClientClick="F_AnularRegistro(this); return false;" />
                                                                </ItemTemplate>
                                                            </asp:TemplateField>
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

                                                    <asp:TemplateField HeaderText="Numero" >
                                                        <ItemStyle HorizontalAlign="Right" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblNumero" Text='<%# Bind("Numero") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                   <asp:TemplateField HeaderText="RazonSocial" >
                                                        <ItemStyle HorizontalAlign="Left" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblCliente" Text='<%# Bind("RazonSocial") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                                                                                                                       
                                                    <asp:BoundField DataField="Emision" HeaderText="Emision" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Center" />
                                                    </asp:BoundField>
                                                                                         
                                                    <asp:BoundField DataField="Moneda" HeaderText="Moneda" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>
                                                                                                                                        
                                                    <asp:BoundField DataField="Total" HeaderText="Total">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>

                                                    <asp:TemplateField HeaderText="TC" >
                                                                <ItemStyle HorizontalAlign="Right" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblTipoCambio" Text='<%# Bind("TC") %>'></asp:Label>
                                                                </ItemTemplate>
                                                    </asp:TemplateField>

                                                         <asp:BoundField DataField="Estado" HeaderText="Estado" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>

                                                </Columns>

                                                    </asp:GridView>
                                    </div>
                      </div>  

                      </div>
                     
                     <div id="divConsultaFactura" style="display:none;">
                           
                                         <div class="ui-jqdialog-content">
                                        <table width="360">
                                        
                                                   <tr>    
                                                    <td>
                                                         <asp:Button ID="btnAgregar" runat="server" Text="Agregar"
                                                          class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                                            Font-Names="Arial"  Font-Bold="True"     Width="120px"    />
                                                                </td>
                                                                                                                  
                                                        </tr>
                                                 
                                                   <tr>
                                                <td>
                                                   <div id="div_grvConsultaFactura">
                                                    <asp:GridView ID="grvConsultaFactura" runat="server" AutoGenerateColumns="False" 
                                                         border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                                         Width="450">  
                                       
                                                    <Columns>
                                                            <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                                                <ItemTemplate>                                                            
                                                                    <asp:CheckBox runat="server" ID="chkOK" CssClass="chkSi" Text="" />
                                                                </ItemTemplate>
                                                            </asp:TemplateField>

                                                            <asp:TemplateField HeaderText="ID" >
                                                                        <ItemStyle HorizontalAlign="Center" />
                                                                        <ItemTemplate>
                                                                            <asp:Label runat="server" ID="lblCodigo" Text='<%# Bind("Codigo") %>'></asp:Label>
                                                                            <asp:HiddenField ID="hfCodMoneda" runat="server" Value='<%# Bind("CodMoneda") %>' />
                                                                        </ItemTemplate>
                                                            </asp:TemplateField>

                                                            <asp:TemplateField HeaderText="Factura" >
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

                                                             <asp:TemplateField HeaderText="Total" >
                                                                <ItemStyle HorizontalAlign="Center" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblDolares" Text='<%# Bind("Total") %>'></asp:Label>
                                                                </ItemTemplate>
                                                            </asp:TemplateField>
                                                                                                                    
                                                            <asp:TemplateField HeaderText="Moneda" >
                                                                 <ItemStyle HorizontalAlign="Center" />
                                                                 <ItemTemplate>
                                                                           <asp:Label runat="server" ID="lblMoneda" Text='<%# Bind("Moneda") %>'></asp:Label>
                                                                 </ItemTemplate>
                                                            </asp:TemplateField>

                                                      <asp:TemplateField HeaderText="Afecto (SOLES)" ItemStyle-HorizontalAlign="Center">
                                                        <ItemTemplate>                                                                                                                        
                                                            <asp:TextBox runat="server" ID="lblTotal" Width="55px" Font-Bold="true" style="text-align:center;"  
                                                           CssClass="ccsestilo" Font-Names="Arial"  ForeColor="Blue"  Text='<%# Bind("TotalSoles") %>' ></asp:TextBox>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                </Columns>
             
                                            </asp:GridView>
                                                   </div>
                                               
                                                </td>
                                            </tr>
                                          </table>
                                    </div>
                                </div>

                                  <div id="divSeleccionarEmpresa">
        <asp:GridView ID="grvEmpresas" runat="server" AutoGenerateColumns="False" border="0"
            CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="400px">
            <Columns>
                <asp:TemplateField HeaderText="Nombre">
                    <ItemTemplate>
                        <asp:Label ID="lblRazonSocial" runat="server" Text='<%# Bind("RazonSocial") %>' Font-Size="Medium"></asp:Label>
                    </ItemTemplate>
                    <HeaderStyle HorizontalAlign="Center" />
                    <ItemStyle HorizontalAlign="Left" Width="100px" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Sede">
                    <ItemTemplate>
                        <asp:DropDownList ID="ddlSede" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True" CssClass="ccsestilo" >
                        </asp:DropDownList>
                    </ItemTemplate>
                    <ItemStyle HorizontalAlign="Center" Width="70px" />
                </asp:TemplateField>
                <asp:TemplateField>
                    <ItemTemplate>
                        <asp:ImageButton ID="imgSelecEmpresa" runat="server" ImageUrl="~/Asset/images/ok.gif"
                            OnClientClick="F_ElegirEmpresa(this); return false;" ToolTip="Elegir" />
                        <asp:HiddenField ID="hfCodEmpresa" runat="server" Value='<%# Bind("CodEmpresa") %>' />
                    </ItemTemplate>
                    <ItemStyle Width="20px" />
                </asp:TemplateField>
            </Columns>
        </asp:GridView>
    </div>

                     <div id="dlgWait" style="background-color:#CCE6FF; text-align:center; display:none;">
        <br /><br />
        <center><asp:Label ID="Label2" runat="server" Text="PROCESANDO..." Font-Bold="true" Font-Size="Large" style="text-align:center"></asp:Label></center>
        <br />
        <center><img alt="Wait..." src="../Asset/images/ajax-loader2.gif"/></center>
    </div>  
             <input id="hfCodCtaCte"         type="hidden"  value="0" />
             <input id="hfCodCtaCteConsulta" type="hidden"  value="0" />
             <input id="hfCodigoTemporal"    type="hidden"  value="0" />
             <input id="hfCodDocumentoVenta" type="hidden"  value="0" />
             <input id="hfMoneda"            type="hidden"  value="0" />
             <input id="hfCodEmpresa"        type="hidden"  value="0" />
             <input id="hfCodSede"           type="hidden"  value="0" />
</asp:Content>