<%@ Page Title="Activos Fijos" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ActivosFijos.aspx.cs" Inherits="SistemaInventario.Maestros.ActivosFijos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"type="text/javascript"></script>
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>  <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript"  src="ActivosFijos.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
     <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" /> <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />      <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />

 </asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div class="titulo" >Activos Fijos</div> 
                     <div id="divTabs">

                        <ul>
                            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
                            <li id="liConsulta"><a href="#tabConsulta">Consulta</a></li>
                        </ul>

                        <div id="tabRegistro">
                               <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 650px">
                                   <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                    REGISTRO DE ACTIVOS FIJOS
                                   </div>
                           
                                   <div >  
                                         <table  cellpadding="0" cellspacing="0" class="form-inputs">
                                     <tr>

                                     <td   style="font-weight: bold">
                                            Codigo 
                                     </td>

                                     <td>
                                     <table cellpadding="0" cellspacing="0">
                                     <tr>
                                      <td>
                                        <asp:TextBox ID="txtCodigo" runat="server" Width="160px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
                                                                                
                                     </td>

                                     <td style="padding-left:0px;font-weight: bold">
                                        Familia
                                      </td>
                                                                       
                                     <td style="padding-left:25px;">
                                     <div id="div_Familia">
                                         <asp:DropDownList ID="ddlFamilia" runat="server" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True"  > 
                                          </asp:DropDownList>
                                     </div>
                                 </td>

                                     <td style="padding-left:0px;font-weight: bold">
                                     t.c.
                                     </td>

                                     <td>
                                   
                                     <asp:TextBox ID="txtTC" runat="server" Width="31px" Font-Names="Arial" ReadOnly="True" Text="2.796" ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
                                     </td>
                                     
                                     </tr>
                                     </table>
                                     </td>

                                    
                                     </tr>
                                
                                     <tr>
                               
                                 
                                 <td  style="font-weight: bold">
                                   Descripcion
                                 </td>

                                 <td>
                                 <table cellpadding="0" cellspacing="0">
                                 <tr>
                                      <td>
                                   <asp:TextBox ID="txtDescripcion" runat="server" Width="502px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
                                 </td>
                                 </tr>
                                 </table>
                                 </td>
                                                                    
                            

                                 </tr>

                                     <tr>

                                         <td  style="font-weight: bold;display:none">
                                            Aro/PESO/placas
                                         </td>

                                         <td style="font-weight: bold;display:none">
                                         <table cellpadding="0" cellspacing="0">
                                         <tr>
                                      
                                             <td >
                             <asp:TextBox ID="txtAro" runat="server"  Width="75px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
                             </td>

                                             <td  style="font-weight: bold">
                             Medida
                             </td>

                                             <td  style="padding-left:12px;">
                             <asp:TextBox ID="txtMedida" runat="server"  Width="75px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
                             </td>

                                             <td  style="font-weight: bold">
                             Seccion
                             </td>

                                             <td style="padding-left:17px;">
                             <asp:TextBox ID="txtSeccion" runat="server"  Width="75px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
                             </td>

                                             <td style="padding-left:2px;font-weight: bold">
                             Factor
                             </td>

                                             <td style="padding-left:17px;">
                             <asp:TextBox ID="txtFactor" runat="server"  Width="75px" Font-Names="Arial"  Text="0.00" ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
                             </td>
                            
                                         </tr>
                                         </table>
                                         </td>

                                      </tr>

                                     <tr>
                                <td style="font-weight: bold">
                             Costo Con Igv
                             </td>

                             <td>
                             <table cellpadding="0" cellspacing="0">
                             <tr>
                                   <td>
                             <asp:TextBox ID="txtCostoConIgv" runat="server"  Width="75px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
                             </td>

                                   <td style="font-weight: bold">
                                Moneda
                                </td>
                                                                    
                                   <td style="padding-left:7px;">
                                <div id="div_moneda">
                                         <asp:DropDownList ID="ddlMoneda" runat="server" Font-Names="Arial" Width="79" ForeColor="Blue"  Font-Bold="True"  >
                                         </asp:DropDownList>
                                     </div>
                                </td>

                                   <td style="padding-left:2px;font-weight: bold">
                             UM COMPRA
                             </td>

                                   <td style="padding-left:1px;">
                                     <div id="div_umcompra">
                                         <asp:DropDownList ID="ddlUMCompra" runat="server" Font-Names="Arial" Width="79" ForeColor="Blue"  Font-Bold="True"  >
                                         </asp:DropDownList>
                                     </div>
                               </td>

                                   <td style="padding-left:2px;font-weight: bold">
                             UM Venta
                             </td>

                                   <td style="padding-left:6px;">
                                     <div id="div_umventa">
                                         <asp:DropDownList ID="ddlUMVenta" runat="server" Font-Names="Arial" Width="79" ForeColor="Blue"  Font-Bold="True"  >
                                         </asp:DropDownList>
                                     </div>
                               </td>
                              
                             </tr>
                             </table>
                             </td>
                               
                                </tr>
                                
                                     <tr>
                             <td style="font-weight: bold">
                             Costo Con Igv S/
                             </td>

                                <td>
                                <table  cellpadding="0" cellspacing="0" >
                                <tr>
                               
                                      <td >
                             <asp:TextBox ID="txtCostoSolesIgv" runat="server"  Width="75px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
                             </td>

                             
                                    <td style="padding-left:2px;font-weight: bold">
                             Precio 
                             </td>
                             <td style="padding-left:3px;">
                             <asp:TextBox ID="txtPrecio1" runat="server"  Width="75px" Font-Names="Arial"   ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
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

                        </div>

                        <div id="tabConsulta">
                            <div id='divConsulta' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                        
                                       <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                                 Criterio de busqueda
                                        </div>
                                        
                                        <div class="ui-jqdialog-content">
                                       <div class="ui-jqdialog-content">
                                        <table cellpadding="0" cellspacing="0" class="form-inputs" >
                                        <tr>
                                          <td style="font-weight: bold" >
                                        familia
                                        </td>
                                        <td>
                                      
                                          <div id="div_familiaconsulta">
                                                 <asp:DropDownList ID="ddlFamiliaConsulta" runat="server" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True"  > 
                                                  </asp:DropDownList>
                                            </div>
                                        </td>
                                          
                                           <td style="font-weight: bold" >
                                               Codigo / Descripcion
                                             </td>
                                             <td>
                                                <asp:TextBox ID="txtDescripcionConsulta" runat="server" Width="647" Font-Names="Arial"  ForeColor="Blue" Font-Bold="True"  ></asp:TextBox>
                                             </td>

                                      
                                        </tr>

                                        </table>
                                                      
                            </div>

                               <div class="linea-button">
                                       <asp:Button ID="btnBuscarConsulta" runat="server" Text="Buscar"  
                                            CssClass="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                                    Font-Names="Arial"  Width="120"   />
                                  </div>
                                                      
                            </div>

                              
                        </div>

                        <div id="div_consulta" style="padding-top:5PX;">
                                                    <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" 
                                            border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                            Width="1005px" >
                                            
                                                <Columns>
                                                 
                                                    <asp:TemplateField>
                                                                <ItemTemplate>
                                                                    <asp:ImageButton runat="server" id="imgAnularDocumento" ImageUrl="../Asset/images/EliminarBtn.png" ToolTip="Eliminar Producto" OnClientClick="F_AnularRegistro(this); return false;" />
                                                                </ItemTemplate>
                                                            </asp:TemplateField>

                                                      <asp:TemplateField>
                                                                <ItemTemplate>
                                                                    <asp:ImageButton runat="server" id="imgEditarRegistro" ImageUrl="../Asset/images/btnEdit.gif" ToolTip="Editar Producto" OnClientClick="F_EditarRegistro(this); return false;" />
                                                                </ItemTemplate>
                                                            </asp:TemplateField>

                                                    <asp:TemplateField HeaderText="ID" >
                                                                <ItemStyle HorizontalAlign="Center" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblcodigo" Text='<%# Bind("Codigo") %>'></asp:Label>
                                                                    <asp:HiddenField ID="hfAro3" runat="server" Value='<%# Bind("Aro3") %>' />
                                                                    <asp:HiddenField ID="hfMedida3" runat="server" Value='<%# Bind("Medida3") %>' />
                                                                    <asp:HiddenField ID="hfSeccion" runat="server" Value='<%# Bind("Seccion") %>' />
                                                                    <asp:HiddenField ID="hfCodMoneda" runat="server" Value='<%# Bind("CodMoneda") %>' />
                                                                    <asp:HiddenField ID="hfCodUnidadCompra" runat="server" Value='<%# Bind("CodUnidadCompra") %>' />
                                                                    <asp:HiddenField ID="hfCodUnidadVenta" runat="server" Value='<%# Bind("CodUnidadVenta") %>' />
                                                                    <asp:HiddenField ID="hfCodFamilia" runat="server" Value='<%# Bind("CodFamilia") %>' />
                                                                    <asp:HiddenField ID="hfFactor" runat="server" Value='<%# Bind("Factor") %>' />
                                                                    <asp:HiddenField ID="hfCostoMercado" runat="server" Value='<%# Bind("CostoMercado") %>' />
                                                                    <asp:HiddenField ID="hfCostoSoles" runat="server" Value='<%# Bind("CostoSoles") %>' />
                                                                </ItemTemplate>
                                                    </asp:TemplateField>

                                                     <asp:TemplateField HeaderText="Codigo" HeaderStyle-HorizontalAlign ="Center" >
                                                        <ItemStyle HorizontalAlign="left" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblCodigoProducto" Text='<%# Bind("CodigoProducto") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:TemplateField HeaderText="Producto" HeaderStyle-HorizontalAlign="Center">
                                                        <ItemStyle HorizontalAlign="Left" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblProducto" Text='<%# Bind("Producto") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:BoundField DataField="Stock" HeaderText="Stock" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>

                                                    <asp:BoundField DataField="UM" HeaderText="UM" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>
                                                                                                   
                                                    
                                                    <asp:TemplateField HeaderText="Costo" >
                                                        <ItemStyle HorizontalAlign="Right" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblCosto" Text='<%# Bind("Costo") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                             
                                                    <asp:TemplateField HeaderText="Precio3" >
                                                        <ItemStyle HorizontalAlign="Right" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblPrecio3" Text='<%# Bind("Precio3") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:BoundField DataField="Moneda" HeaderText="Moneda">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>

                                                    <asp:BoundField DataField="Familia" HeaderText="Familia" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>

                                                                                      
                                                </Columns>

                                            </asp:GridView>
                                    
                                    </div>
                      </div>  

                      </div>

                        <div id="divEdicionRegistro" style="display:none;">
                           
                                  <div class="ui-jqdialog-content">
                                   <table  cellpadding="0" cellspacing="0" class="form-inputs">
                                        <tr>

                                     <td  style="font-weight: bold">
                                            Codigo Producto
                                     </td>

                                     <td>
                                     <table  cellpadding="0" cellspacing="0" >
                                     <tr>
                                       <td style="padding-left:4px;" >
                                        <asp:TextBox ID="txtCodigoProductoEdicion" runat="server" Width="211px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
                                                                                
                                     </td>

                                     <td style="padding-left:2px;font-weight: bold">
                                        Familia
                                      </td>
                                                                       
                                     <td style="padding-left:22px;">
                                     <div id="div_FamiliaEdicion">
                                         <asp:DropDownList ID="ddlFamiliaEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True" > 
                                          </asp:DropDownList>
                                     </div>
                                 </td>

                                     <td style="padding-left:52px;font-weight: bold">
                                     t.c.
                                     </td>

                                     <td>
                                   
                                     <asp:TextBox ID="txtTcEdicion" runat="server" Width="31px" Font-Names="Arial" ReadOnly="True" Text="2.796" ForeColor="Blue"  Font-Bold="True" ></asp:TextBox>
                                     </td>
                                     </tr>
                                     </table>
                                     </td>

                                   
                                     
                                     </tr>
                                
                                        <tr>
                               
                                 
                                 <td style="font-weight: bold">
                                   Descripcion
                                 </td>
                                                                    
                                 <td colspan='5'   style="padding-left:4px;">
                                   <asp:TextBox ID="txtDescripcionEdicion" runat="server" Width="499px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
                                 </td>

                                 </tr>

                                        <tr>

                                         <td style="font-weight: bold">
                                            Aro /PESO
                                         </td>

                                         <td colspan='5'>
                                        <table  cellpadding="0" cellspacing="0" >
                             <tr>

                                 <td >
                             <asp:TextBox ID="txtAroEdicion" runat="server"  Width="75px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True" ></asp:TextBox>
                             </td>

                                 <td style="font-weight: bold">
                             Medida
                             </td>

                                 <td  style="padding-left:11px;">
                             <asp:TextBox ID="txtMedidaEdicion" runat="server"  Width="75px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True" ></asp:TextBox>
                             </td>

                                 <td style="font-weight: bold">
                             Seccion
                             </td>

                                 <td style="padding-left:19px;">
                             <asp:TextBox ID="txtSeccionEdicion" runat="server"  Width="75px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True" ></asp:TextBox>
                             </td>

                                  <td style="padding-left:0px;font-weight: bold">
                             Factor
                             </td>
                             <td style="padding-left:15px;">
                             <asp:TextBox ID="txtFactorEdicion" runat="server"  Width="75px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True"   Text="0.00"></asp:TextBox>
                             </td>
                                </tr>

                                </table>
                                         </td>

                                </tr>

                                        <tr>
                                <td style="font-weight: bold">
                             Costo Con Igv
                             </td>

                                <td colspan='5'>
                                <table  cellpadding="0" cellspacing="0" >
                                <tr>
                               
                                   
                                      <td >
                             <asp:TextBox ID="txtCostoEdicion" runat="server"   ForeColor="Blue"  Font-Bold="True"  Width="75px" Font-Names="Arial"></asp:TextBox>
                             </td>

                             <td style="font-weight: bold">
                                Moneda
                                </td>
                                                                    
                                     <td style="padding-left:6px;">
                                <div id="div_MonedaEdicion">
                                         <asp:DropDownList ID="ddlMonedaEdicion" runat="server" Font-Names="Arial" Width="79" ForeColor="Blue"  Font-Bold="True" >
                                         </asp:DropDownList>
                                     </div>
                                </td>

                                      <td style="padding-left:3px;font-weight: bold">
                             UM COMPRA
                             </td>

                             <td style="padding-left:2px;">
                                     <div id="div_CompraEdicion">
                                         <asp:DropDownList ID="ddlCompraEdicion" runat="server" Font-Names="Arial" Width="78" ForeColor="Blue"  Font-Bold="True" >
                                         </asp:DropDownList>
                                     </div>
                               </td>

                                     <td style="padding-left:3px;font-weight: bold">
                             UM Venta
                             </td>

                             <td>
                                     <div id="div_VentaEdicion">
                                         <asp:DropDownList ID="ddlVentaEdicion" runat="server" Font-Names="Arial" Width="79" ForeColor="Blue"  Font-Bold="True" >
                                         </asp:DropDownList>
                                     </div>
                               </td>
                               
                             </tr>
                                </table>
                                </td>
                                </tr>
                                
                                        <tr>
   <td style="font-weight: bold">
                             Costo S/ Con Igv
                             </td>
                                <td colspan='5'>
                                <table  cellpadding="0" cellspacing="0" >
                                <tr>
                               
                                   

                                      <td >
                             <asp:TextBox ID="txtCostoSolesEdicion" runat="server"  Width="75px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True" ></asp:TextBox>
                             </td>

                             
                                    <td style="padding-left:2px;font-weight: bold">
                             Precio
                             </td>
                             <td>
                             <asp:TextBox ID="txtPrecio1Edicion" runat="server"  Width="75px" Font-Names="Arial"   ForeColor="Blue"  Font-Bold="True" ></asp:TextBox>
                             </td
                             </tr>
                                </table>
                                </td>
                                </tr>
                                        
                                        <tr>
                                             <td style="font-weight: bold">
                                                    Costo Mercado
                                             </td>

                                             <td colspan='5'style="padding-left:4px;">
                                     
                                                <asp:TextBox ID="txtCostoMercadoEdicion" runat="server"  Width="75px"  ForeColor="Blue"  Font-Bold="True" 
                                                     Font-Names="Arial"></asp:TextBox>
                            
                                             </td>
                                        </tr>
                                    
                                        <tr>
                                     <td colspan='6' align="right">
                                     <asp:Button ID="btnEdicion" runat="server" Text="Grabar"  
                                class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                        Font-Names="Arial"  Width="120px"   />
                                     </td>
                                     </tr>
                                                                          
                                        </table>
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
     <input id="hfCodProducto" type="hidden" value="0" />
     <input id="hfMoneda" type="hidden"  value="0" />
</asp:Content>

