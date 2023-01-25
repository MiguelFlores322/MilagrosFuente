<%@ Page Title="Orden Compra Venta" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="OrdenCompraVenta.aspx.cs" Inherits="SistemaInventario.Ventas.OrdenCompraVenta" %>
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
    <script type="text/javascript" language="javascript"  src="OrdenCompraVenta.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
     <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
       <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" /> 
       <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />

 </asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div class="titulo">Orden Compra de Venta</div> 

                     <div id="divTabs">

                        <ul>
                            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
                            <li id="liConsulta"><a href="#tabConsulta" onclick="getContentTab();">Consulta</a></li>
                        </ul>

                        <div id="tabRegistro">
                          <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" >
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                     Datos de Orden de Compra
                            </div>
                           
                            <div >  
                             <table  cellpadding="0" cellspacing="0" class="form-inputs" width="750">
                                <tr>
                                     <td  style="font-weight: bold">
                                            Cliente
                                     </td>

                                     <td>
                                     <table  cellpadding="0" cellspacing="0" >
                                     <tr>
                                     
                                   <td >
                                     <asp:TextBox ID="txtNroRuc" runat="server" Width="70px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"     MaxLength="11" ></asp:TextBox>
                                     </td>
                                       

                                                 <td>
                                        <asp:TextBox ID="txtCliente" runat="server" Width="338px"   Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ></asp:TextBox>
                                         
                              <asp:ImageButton ID="imgAddScop" runat="server" ImageUrl="~/Asset/images/add_small.png" ImageAlign="AbsMiddle" ToolTip="Agregar Cliente"
                              style="display:none;" />
                                               <asp:Label ID="Label1" runat="server" Text="T.C." Font-Bold="True"></asp:Label>
                                       <asp:Label ID="lblTC" runat="server" Text="Label" Font-Bold="True"></asp:Label>
                                     </td>
                                     
                                     <td style="font-weight: bold">
                                Moneda
                                </td>

                                     <td>
                                <div id="div_moneda">
                                         <asp:DropDownList ID="ddlMoneda" runat="server"  Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  Width="78">
                                         </asp:DropDownList>
                                     </div>
                                </td>

                                     <td style="font-weight: bold;">
                                            Serie
                                     </td>

                                     <td style="padding-left:14px;">
                                    <asp:TextBox ID="txtSerieOC" runat="server" Width="30px" ForeColor="Blue"  Font-Names="Arial" Font-Bold="True"></asp:TextBox> 
                                       
                                      </td>

                                     <td>
                                        
                               <asp:TextBox ID="txtNumeroOC" runat="server" Width="48px" ForeColor="Blue"  Font-Names="Arial" Font-Bold="True"></asp:TextBox> 
                                     </td>

                                     <td style="font-weight: bold">
                                     Igv (%)
                                     </td>

                                     <td>
                                     
                                     <div id="div_igv">
                                   <asp:DropDownList ID="ddlIgv" runat="server"  Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  Width="60">
                                     </asp:DropDownList>
                                   </div>
                                    
                                     
                                 </td>
                                   <td>
                              <asp:HyperLink ID="HyperLink2" Target="_blank" runat="server" Text="SUNARP"
                              ForeColor="Blue" NavigateUrl="https://www.sunarp.gob.pe/ConsultaVehicular/">SUNARP</asp:HyperLink>
                             </td>
                              <td>
                              <asp:HyperLink ID="HyperLink1" Target="_blank" runat="server" Text="SUNAT" 
                                     NavigateUrl="http://www.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias" 
                                     ForeColor="Blue"></asp:HyperLink>
                             </td>
                                     </tr>
                                     </table>
                                     </td>

                                </tr>
                                
                                <tr>
                                <td  style="font-weight: bold">
                                Distrito
                                </td>

                                <td>
                                <table  cellpadding="0" cellspacing="0">
                                <tr>
                                  <td >
                                <asp:TextBox ID="txtDistrito" runat="server" Width="250px" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox> 
                              </td>
                                 <td style="font-weight: bold">
                                Direccion
                                </td>
                                  <td  style="font-weight: bold">
                                <asp:TextBox ID="txtDireccion" runat="server" Width="280px"  Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"></asp:TextBox> 
                             
                               <asp:CheckBox ID="chkImpresion" runat="server" Text="Imprimir" style="display:none;" />
                                
                                </td>
                             
                             <td style="font-weight: bold">
                                 Emision
                                 </td>
                                  <td>
                                  <asp:TextBox ID="txtEmision" runat="server" Width="55px" CssClass="Jq-ui-dtp"   Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  ReadOnly="True"></asp:TextBox>
                                 </td>
                                 <td  style="font-weight: bold">
                                       cond.
                                 </td>
                                 <td colspan="2">
                                   <div id="div_formapago">
                                   <asp:DropDownList ID="ddlFormaPago" runat="server"  Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  Width="95">
                                     </asp:DropDownList>
                                   </div>
                                     
                                 </td>
                                 <td style="font-weight: bold">
                                     vcto 
                                 </td>
                                 <td>
                                  <asp:TextBox ID="txtVencimiento" runat="server"  Width="55px"  Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ReadOnly="True"></asp:TextBox>
                                 </td>
                                </tr>
                                </table>
                                </td>
                                
                              
                                </tr>
                                
                                <tr>
                               
                                   <td   style="font-weight: bold;">
                                                    Vendedor
                                            </td>
                               <td style="">
                               <table  cellpadding="0" cellspacing="0">
                               <tr>
                                        
                                            <td style ="padding-left:2px;">                                          
                                                   <div id="div_Vendedor">
                                                   <asp:DropDownList ID="ddlVendedor" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  BackColor="#FFFF99">
                                                   </asp:DropDownList>                                     
                                                   </div>                                     
                                            </td>
                               
                     <td style="font-weight: bold;padding-left:302px;">
                     SubTotal
                     </td>
                             
                            <td>
                              <asp:TextBox ID="txtSubTotal" runat="server"  Width="80px"  Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   CssClass = "Derecha"  ReadOnly="True" Text="0.00"></asp:TextBox>
                            
                            </td>
                           
                           <td style="font-weight: bold">
                           Igv
                           </td>
                             
                            <td>
                             <asp:TextBox ID="txtIgv" runat="server"  Width="80px"  Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   CssClass = "Derecha"  ReadOnly="True" Text="0.00"></asp:TextBox>
                            
                            </td>
                            <td style="font-weight: bold">
                            total
                            </td>
                             <td>
                             <asp:TextBox ID="txtTotal" runat="server"  Width="80px"  Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  CssClass = "Derecha"   ReadOnly="True" Text="0.00"></asp:TextBox>
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
                                         Font-Names="Arial" Font-Bold="True"   Width="120" />
                                         <asp:Button ID="btnEliminar" runat="server" Text="Eliminar"  
                                class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                         Font-Names="Arial" Font-Bold="True"    Width="120"  />
   <asp:Button ID="btnAgregarProducto" runat="server" Text="Agregar"  
                                class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                         Font-Names="Arial" Font-Bold="True"    Width="120"   />

                                <asp:Button ID="btnGrabar" runat="server" Text="Grabar"  
                                class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                         Font-Names="Arial" Font-Bold="True"    Width="120"  />
                             
                            </div>

                      </div>   

                          <div id="div_grvDetalleArticulo" style="padding-top:5px;">
                                        
                                        <asp:GridView ID="grvDetalleArticulo" runat="server" AutoGenerateColumns="False" 
                                            border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                            Width="1018px">
                                                <Columns>
                                                    <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                                        <ItemTemplate>                                                            
                                                            <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete"  Text="" />
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:TemplateField HeaderText="ID">                                                        
                                                        <ItemStyle Font-Bold="true" HorizontalAlign="Center"/>                                        
                                                        <ItemTemplate>
                                                            <asp:HyperLink 
                                                                runat="server" ID="lblcoddetalle"                                                                 
                                                                Font-Underline="true" ForeColor="Blue" style="cursor:hand" 
                                                                Text='<%# Bind("CodDetalle") %>'                                                                
                                                                onclick="F_VerSeries(this.id); return false;" ToolTip="Ver Series">
                                                            </asp:HyperLink>
                                                                 <asp:HiddenField ID="hfcodarticulo" runat="server" Value='<%# Bind("CodArticulo") %>' />                
                                                                 <asp:HiddenField ID="hfCantidad" runat="server" Value='<%# Bind("Cantidad") %>' />
                                                                 <asp:HiddenField ID="hfPrecio" runat="server" Value='<%# Bind("Precio") %>' />                                                                 
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:BoundField DataField="CodigoProducto" HeaderText="Código">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>

                                                       <asp:TemplateField HeaderText="Descripcion" >
                                                                <ItemStyle HorizontalAlign="Left" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblProducto" Text='<%# Bind("Producto") %>'></asp:Label>
                                                                </ItemTemplate>
                                                    </asp:TemplateField>

                                                    
                                                     <asp:TemplateField HeaderText="Cantidad" ItemStyle-HorizontalAlign="Center">
                                                        <ItemTemplate>                                                                                                                        
                                                            <asp:TextBox runat="server" ID="txtCantidad" Width="75px" Font-Bold="true" style="text-align:center;"  CssClass="ccsestilo"   
                                                              Font-Names="Arial"  ForeColor="Blue" Text='<%# Bind("Cantidad") %>' onblur="F_ActualizarCantidad(this.id); return false;"></asp:TextBox>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                                           
                                                    <asp:BoundField DataField="UM" HeaderText="UM" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>
                                           
                                                    <asp:TemplateField HeaderText="Precio" ItemStyle-HorizontalAlign="Center">
                                                        <ItemTemplate>                                                                                                                        
                                                            <asp:TextBox runat="server" ID="txtPrecio" Width="75px" Font-Bold="true" style="text-align:center;"   CssClass="ccsestilo"  
                                                                            Font-Names="Arial"  ForeColor="Blue" Text='<%# Bind("Precio") %>' onblur="F_ActualizarPrecio(this.id); return false;"></asp:TextBox>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:TemplateField HeaderText="Importe" >
                                                           <ItemStyle HorizontalAlign="Right" />
                                                           <ItemTemplate>
                                                               <asp:Label runat="server" ID="lblimporte" Text='<%# Bind("Importe") %>'></asp:Label>
                                                           </ItemTemplate>
                                                    </asp:TemplateField>  

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
                            <table cellpadding="0" cellspacing="0" class="form-inputs">
                            <tbody>
                             <tr>                                                                                  
                                             <td>
                                         <asp:CheckBox ID="chkNumero" runat="server" Text="Numero" Font-Bold="True"/>
                                        </td>

                                             <td>
                                          <asp:TextBox ID="txtNumeroConsulta" runat="server" Width="60" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ></asp:TextBox>
                                     </td>

                                             <td>
                                               <asp:CheckBox ID="chkRango" runat="server" Text="Fecha" Font-Bold="True"/>
                                              </td>

                                             <td>
                                                <asp:TextBox ID="txtDesde" runat="server" Width="55" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"    
                                                     CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                             </td>

                                             <td>
                                                <asp:TextBox ID="txtHasta" runat="server" Width="55" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"    
                                                     CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                             </td>

                                             <td>
                                               <asp:CheckBox ID="chkCliente" runat="server" Text="Cliente" Font-Bold="True"/>
                                              </td>

                                                  <td>
                                                <asp:TextBox ID="txtClienteConsulta" runat="server" Width="360" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ></asp:TextBox>
                                             </td>
                                                 <td style="font-weight: bold">
                                        ESTADO
                                        </td>

                                             <td>
                                         <div id="div_Estado">
                                         <asp:DropDownList ID="ddlEstado" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   >
                                         </asp:DropDownList>
                                     </div>
                                </td>

                                       </tr>
                            </tbody>
                            </table >
                            </div>

                                  <div class="linea-button">
                              <asp:Button ID="btnBuscarConsulta" runat="server" Text="Buscar"  
                                            class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                                    Font-Names="Arial" Font-Bold="True"      Width="120" />
                            </div>

                            </div>
                                    <div id="div_consulta" style="padding-top:5px;">
                                                    <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" 
                                            border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                            Width="1005px" OnRowDataBound="grvConsulta_RowDataBound">
                                            
                                                <Columns>
                                                            <asp:TemplateField>
                                                                <ItemTemplate>
                                                                    <asp:ImageButton runat="server" id="imgEliminarDocumento" ImageUrl="~/Asset/images/EliminarBtn.png" ToolTip="Eliminar Orden Compra Venta" OnClientClick="F_EliminarRegistro(this); return false;" />
                                                                </ItemTemplate>
                                                            </asp:TemplateField>
                                                             
                                                               <asp:TemplateField>
                                                                <ItemTemplate>
                                                                    <asp:ImageButton runat="server" id="imgAnularDocumento" ImageUrl="~/Asset/images/Eliminar.jpg" ToolTip="Anular Orden Compra Venta" OnClientClick="F_AnularRegistro(this); return false;" />
                                                                </ItemTemplate>
                                                            </asp:TemplateField>

                                                 <%--                    <asp:TemplateField HeaderText="CI">
                                                                            <ItemTemplate>                                                                                                                               
                                                                                <asp:ImageButton runat="server" id="imgTexto" ImageUrl="~/Asset/images/texto.png" 
                                                                                                 ToolTip="TEXTO" 
                                                                                                 OnClientClick="F_ImprimirControlInterno(this); return false;" />
                                                                            </ItemTemplate>
                                                                      </asp:TemplateField>--%>

                                                                      <asp:TemplateField >
                                                    <ItemTemplate>
                                                        <img id="imgMas" alt = "" style="cursor: pointer" src="../Asset/images/plus.gif" onclick="imgMas_Click(this);" title="Ver Detalle" />
                                                        <asp:Panel ID="pnlOrders" runat="server" Style="display: none">
                                                                 <asp:GridView ID="grvDetalle" runat="server" border="0" CellPadding="0" CellSpacing="1"  
                                                                  AutoGenerateColumns="False"  GridLines="None" class="GridView"> 
                                            
                                                <Columns>
                                                 
                                                   <asp:BoundField DataField="ID" HeaderText="ID" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>

                                                    <asp:BoundField DataField="Codigo" HeaderText="Codigo" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>
                                           
                                                    <asp:BoundField DataField="Descripcion" HeaderText="Descripcion">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>

                                                    <asp:BoundField DataField="Cantidad" HeaderText="Cantidad" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>

                                                    <asp:BoundField DataField="UM" HeaderText="UM" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>


                                                    <asp:BoundField DataField="Precio" HeaderText="Precio">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>
                                                    
                                                </Columns>

                                                    </asp:GridView>
                                                        </asp:Panel>
                                                    </ItemTemplate>
                                                </asp:TemplateField>

                                                                      <asp:TemplateField HeaderText="ID" >
                                                                <ItemStyle HorizontalAlign="Right" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblcodigo" Text='<%# Bind("Codigo") %>'></asp:Label>
                                                                    <asp:HiddenField ID="hfCodControlInternoAlmacenCab" runat="server" Value='<%# Bind("CodControlInternoAlmacenCab") %>' />
                                   
                                                                </ItemTemplate>
                                                    </asp:TemplateField>

                                                                      <asp:TemplateField HeaderText="Numero" >
                                                        <ItemStyle HorizontalAlign="Left" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblNumero" Text='<%# Bind("Numero") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                                      <asp:TemplateField HeaderText="Cliente" >
                                                        <ItemStyle HorizontalAlign="Left" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblcliente" Text='<%# Bind("Cliente") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                                                                   
                                                                      <asp:BoundField DataField="Emision" HeaderText="Emision" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>
                                           
                                                                      <asp:BoundField DataField="Condicion" HeaderText="Condicion">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>

                                                                      <asp:BoundField DataField="Vencimiento" HeaderText="Vcto" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>

                                                                      <asp:BoundField DataField="Moneda" HeaderText="Moneda" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>
                                           
                                                                      <asp:BoundField DataField="TC" HeaderText="TC">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>
                                       
                                                         <asp:TemplateField HeaderText="Total" >
                                                        <ItemStyle HorizontalAlign="Right" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblTotal" Text='<%# Bind("Total") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:TemplateField HeaderText="Estado" >
                                                        <ItemStyle HorizontalAlign="Left" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblEstado" Text='<%# Bind("Estado") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                        <asp:BoundField DataField="Facturacion" HeaderText="Facturac" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Center" />
                                                    </asp:BoundField>
                                                             <asp:BoundField DataField="FechaCancelacion" HeaderText="CancelAC" HeaderStyle-HorizontalAlign="Center" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Center" />
                                                    </asp:BoundField>
                                                </Columns>

                                                    </asp:GridView>
                                    
                                    </div>
                      </div>  
                   
                    </div>   

                     <div id="divConsultaArticulo" style="display:none;">
                           
                              <div id='div1' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                                  <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                                 Criterio de busqueda
                                     </div>

                                  <div class="ui-jqdialog-content">
                            <table cellpadding="0" cellspacing="0" class="form-inputs">
                            <tbody>
                             <tr>
                                      <td>
                                                    <asp:CheckBox ID="chkServicios" runat="server" Text="Servicios" Font-Bold="True" style="display:none;" />
                                                </td>

                                                            <td>
                                                    <asp:CheckBox ID="chkNotaPedido" runat="server" Text="nota pedido" Font-Bold="True"  style="display:none;"  />
                                                </td>
                                                                                                      
                                                            <td style="padding-left:5px;font-weight: bold">
                                                            <asp:CheckBox ID="chkDescripcion" runat="server" Text="descripcion" Font-Bold="True" />
                                                            </td>

                                                            <td>
                                                              <asp:TextBox ID="txtArticulo" runat="server" Width="717px"  Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
                                                            </td>   
                                       </tr>
                            </tbody>
                            </table >
                            </div>

                                  <div class="linea-button">
                               <asp:Button ID="btnBuscarArticulo" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                                                Font-Names="Arial"  Font-Bold="True"    Width="120" />
   <asp:Button ID="btnAgregar" runat="server" Text="Agregar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                        Font-Names="Arial"  Font-Bold="True"   Width="120"   />
                            </div>

                            </div>

                                    

                                       <div id="div_grvConsultaArticulo" style="padding-top:5px;">
                                                            <asp:GridView ID="grvConsultaArticulo" runat="server" AutoGenerateColumns="False" 
                                            border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                             Width="980px">  
                                       
                                                <Columns>
                                                 <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                                        <ItemTemplate>                                                            
                                                            <asp:CheckBox runat="server" ID="chkOK" CssClass="chkSi" Text="" onclick="F_ValidarCheck(this.id);"/>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                      <asp:TemplateField HeaderText="ID" >
                                                                <ItemStyle HorizontalAlign="Center" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblcodproducto" Text='<%# Bind("CodProducto") %>'></asp:Label>
                                                                    <asp:HiddenField ID="hfcodunidadventa" runat="server" Value='<%# Bind("CodUnidadVenta") %>' />
                                                                    <asp:HiddenField ID="hfcosto" runat="server" Value='<%# Bind("Costo") %>' />
                                                                    <asp:HiddenField ID="lblPrecio1" runat="server" Value='<%# Bind("Precio1") %>' />
                                                                    <asp:HiddenField ID="lblPrecio2" runat="server" Value='<%# Bind("Precio2") %>' />
                                                                    <asp:HiddenField ID="lblPrecio3" runat="server" Value='<%# Bind("Precio3") %>' />
                                                                </ItemTemplate>
                                                    </asp:TemplateField>
                                                    
                                                    <asp:TemplateField HeaderText="Código">                                                        
                                                        <ItemStyle Font-Bold="true"/>                                        
                                                        <ItemTemplate>
                                                            <asp:HyperLink 
                                                                runat="server" ID="hlkCodNeumaticoGv"                                                                 
                                                                Font-Underline="true" ForeColor="Blue" style="cursor:hand" 
                                                                Text='<%# Bind("CodigoProducto") %>'                                                                
                                                                onclick="F_VerUltimoPrecio(this.id); return false;" ToolTip="Ultimo Precio">

                                                            </asp:HyperLink>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                                                                                                   
                                                      <asp:TemplateField HeaderText="Descripcion" >
                                                                <ItemStyle HorizontalAlign="Left" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblProducto" Text='<%# Bind("Producto") %>'></asp:Label>
                                                                </ItemTemplate>
                                                    </asp:TemplateField>


                                                    <asp:TemplateField HeaderText="Stock" >
                                                                <ItemStyle HorizontalAlign="Center" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblstock" Text='<%# Bind("Stock") %>'></asp:Label>
                                                                </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:BoundField DataField="UM" HeaderText="UM" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>
                                      
                                                    <asp:TemplateField HeaderText="Mon.">                                                        
                                                        <ItemStyle Font-Bold="true"/>                                        
                                                        <ItemTemplate>
                                                            <asp:HyperLink 
                                                                runat="server" ID="lblMoneda"                                                                 
                                                                Font-Underline="true" ForeColor="Blue" style="cursor:hand" 
                                                                Text='<%# Bind("Moneda") %>'                                                                
                                                                onclick="F_VerPrecioMinimo(this.id); return false;" ToolTip="">

                                                            </asp:HyperLink>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                                               
                                                     
                                                    <asp:TemplateField HeaderText="Precio" ItemStyle-HorizontalAlign="Center">
                                                        <ItemTemplate>                                                                                                                        
                                                            <asp:TextBox runat="server" ID="txtPrecioLibre" Width="55px" Font-Bold="true" style="text-align:center;"  CssClass="ccsestilo"
                                                                          Font-Names="Arial"  ForeColor="Blue" Text='<%# Bind("Precio1") %>' onblur="F_ValidarPrecioGrilla(this.id);"></asp:TextBox>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                     <asp:TemplateField HeaderText="Cant." ItemStyle-HorizontalAlign="Center">
                                                        <ItemTemplate>                                                                                                                        
                                                            <asp:TextBox runat="server" ID="txtCantidad" Width="55px" Font-Bold="true" style="text-align:center;"  CssClass="ccsestilo"
                                                             Font-Names="Arial"  ForeColor="Blue" onblur="F_ValidarStockGrilla(this.id);"  Enabled="False"></asp:TextBox>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                </Columns>
             
                                            </asp:GridView>
                                                   </div>
                                </div>

                     <div id="div_SerieDetalle"  style="display:none;">
                        <table  cellpadding="0" cellspacing="0"  >
                              
                           <tr>  
                                    <td style="padding-top:5px;">
                                    <div id="div_GrillaSerieDetalle">
                                                    <asp:GridView ID="grvSerieDetalle" runat="server" AutoGenerateColumns="False" 
                                            border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                            Width="360px" >
                                                <Columns>
                                                       <asp:TemplateField>
                                                                <ItemTemplate>
                                                                    <asp:ImageButton runat="server" id="imgEliminar" ImageUrl="~/Asset/images/Eliminar.jpg" ToolTip="Eliminar" OnClientClick="F_EliminarSerie(this); return false;" />
                                                                </ItemTemplate>
                                                            </asp:TemplateField>

                                                    <asp:TemplateField HeaderText="ID" >
                                                                <ItemStyle HorizontalAlign="Right" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblID" Text='<%# Bind("ID") %>'></asp:Label>
                                                                    <asp:HiddenField ID="hfCodDetDocumentoVenta" runat="server" Value='<%# Bind("CodDetDocumentoVenta") %>' />
                                                                </ItemTemplate>
                                                    </asp:TemplateField>
                                                    
                                                    <asp:BoundField DataField="Serie" HeaderText="Serie">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>
                                                                                                        
                                              
                                                </Columns>

                                                    </asp:GridView>
                                    
                                    </div>
                                    </td>
                            
                                </tr>
                                                          
                        </table>
                    </div>
                          
                     <div id="div_PrecioMinimo" style="display:none;">
                           
                                         <div class="ui-jqdialog-content">
                                        <table  cellpadding="0" cellspacing="0" class="form-inputs">
                                          <tr>    
                                             <td>
                                                            Precio Minimo
                                                            </td>

                                             <td>
                                                                 <asp:TextBox ID="txtPrecioMinimo" runat="server" Width="80px" ReadOnly="True"   Font-Names="Arial" ForeColor="Blue"  Font-Bold="True" Font-Size="Small"></asp:TextBox>
                                                            </td>

                                                               <td>
                                                                 <asp:TextBox ID="txtMoneda" runat="server" Width="80px" ReadOnly="True"   Font-Names="Arial" ForeColor="Blue"  Font-Bold="True" Font-Size="Small"></asp:TextBox>
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

     <input id="hfCodCtaCteOC" type="hidden"  value="0" />
     <input id="hfCodMovimiento" type="hidden"  value="0" />
     <input id="hfCodCtaCte" type="hidden"  value="29" />
     <input id="hfCodCtaCteConsulta" type="hidden"  value="0" />
     <input id="hfCodigoTemporal" type="hidden"  value="0" />
     <input id="hfCodDocumentoVenta" type="hidden" value="0" />
     <input id="hfCodComision" type="hidden" value="0" />
     <input id="hfCodDocumentoVentaComision" type="hidden" value="0" />
     <input id="hfCodDepartamento" type="hidden"  value="0" />
     <input id="hfCodProvincia" type="hidden"  value="0" />
     <input id="hfCodDistrito" type="hidden"  value="0" />
     <input id="hfSerie" type="hidden" value="0" />
     <input id="hfFlagSerie" type="hidden" value="0" />
</asp:Content>