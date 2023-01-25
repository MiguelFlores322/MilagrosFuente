<%@ Page Title="Nota Pedido" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="NotaPedido.aspx.cs" Inherits="SistemaInventario.Inventario.NotaPedido" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"type="text/javascript"></script>
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>  <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript"  src="NotaPedido.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
     <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" /> <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />      <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />

 </asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div class="titulo"  style="width:530px;">Nota Pedido</div> 
                

                        <div id="tabRegistro"  style="width:530px;">
                          <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" >
                                               
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                          Nota Pedido
                            </div>    

                               <div class="ui-jqdialog-content"  >  
                                   
                       
                            </div>

                            <div  class="linea-button">  
                                                        
                                  <asp:Button ID="btnNuevo" runat="server" Text="Nuevo"  
                                        class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                        Font-Names="Arial"    Font-Bold="True"   Width="120px" />
                                  
                                  <asp:Button ID="btnAgregarProducto" runat="server" Text="Agregar"  
                                        class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                        Font-Names="Arial"    Font-Bold="True"     Width="120px"  />
                                   
                                  <asp:Button ID="btnEliminar" runat="server" Text="Eliminar"  
                                        class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                        Font-Names="Arial"  Font-Bold="True"    Width="120px"  />

                                  <asp:Button ID="btnExcel" runat="server" Text="Excel"  
                                        class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                        Font-Names="Arial"   Font-Bold="True"      Width="120" />
                       
                            </div>

                      </div>   
    
                          

                        </div>

                        <div id="div_grvDetalleArticulo" style="padding-top:5px;">
                                                    <asp:GridView ID="grvDetalleArticulo" runat="server" AutoGenerateColumns="False" 
                                            border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                            Width="530px" >
                                                <Columns>
                                                    <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                                        <ItemTemplate>                                                            
                                                            <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete"  Text="" />
                                                            <asp:HiddenField ID="hfCodDetalle" runat="server" Value='<%# Bind("CodDetalle") %>' />
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:BoundField DataField="CodigoProducto" HeaderText="Codigo">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>

                                               
                                                </Columns>

                                                    </asp:GridView>
                                    
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
                                                    <asp:CheckBox ID="chkServicios" runat="server" Text="Servicios" Font-Bold="True" style="display:none;"/>
                                                </td>

                                                            <td>
                                                    <asp:CheckBox ID="chkNotaPedido" runat="server" Text="nota pedido" Font-Bold="True" style="display:none;" />
                                                </td>
                                                                                                      
                                                            <td style="padding-left:5px;font-weight: bold">
                                                            Articulo
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
                                            Width="975px" >  
                                       
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
                                                                    <asp:HiddenField ID="hfDescuento" runat="server" Value='<%# Bind("Descuento") %>' />
                                                                    <asp:HiddenField ID="hfCodFamilia" runat="server" Value='<%# Bind("CodFamilia") %>' />
                                                                    <asp:HiddenField ID="hfCostoProductoSoles" runat="server" Value='<%# Bind("CostoProductoSoles") %>' />
                                                                    <asp:HiddenField ID="hfCostoProductoDolares" runat="server" Value='<%# Bind("CostoProductoDolares") %>' />
                                                                    <asp:HiddenField ID="hfMargen" runat="server" Value='<%# Bind("Margen") %>' />
                                                                </ItemTemplate>
                                                    </asp:TemplateField>                                                                                                                                   
                                                 
                                                    <asp:TemplateField HeaderText="Codigo">                                                        
                                                        <ItemStyle Font-Bold="true" HorizontalAlign="Left"/>                                        
                                                        <ItemTemplate>
                                                            <asp:HyperLink 
                                                                runat="server" ID="hlkCodigo"                                                                 
                                                                Font-Underline="true" ForeColor="Blue" style="cursor:hand" 
                                                                Text='<%# Bind("CodigoProducto") %>'                                                                
                                                                onclick="F_VerUltimoPrecio(this.id); return false;" ToolTip="Ver Series">
                                                            </asp:HyperLink>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:BoundField DataField="Producto" HeaderText="Producto">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>

                                                    <asp:TemplateField HeaderText="Stock" >
                                                                <ItemStyle HorizontalAlign="Center" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblChala1" Text='<%# Bind("Chala1") %>'></asp:Label>
                                                                </ItemTemplate>
                                                    </asp:TemplateField>
                                              
                                                    <asp:BoundField DataField="UM" HeaderText="UM" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>

                                            <asp:TemplateField HeaderText="Dolares" >
                                                                <ItemStyle HorizontalAlign="Center" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblPrecioDolares" Text='<%# Bind("PrecioDolares") %>'></asp:Label>
                                                                </ItemTemplate>
                                                    </asp:TemplateField>
                                                                                                                                                               
                                                  <asp:TemplateField HeaderText="Soles" >
                                                                <ItemStyle HorizontalAlign="Center" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblPrecioSoles" Text='<%# Bind("PrecioSoles") %>'></asp:Label>
                                                                </ItemTemplate>
                                                    </asp:TemplateField>
                                                                                                    
                                                    <asp:BoundField DataField="TipoCambio" HeaderText="TC" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>

                                                     <asp:BoundField DataField="Descuento" HeaderText="Dscto-Max" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>                                                                                                    
                                                 
                                                     <asp:TemplateField HeaderText="Cant." ItemStyle-HorizontalAlign="Center">
                                                        <ItemTemplate>                                                                                                                        
                                                            <asp:TextBox runat="server" ID="txtCantidad" Width="55px" Font-Bold="true" style="text-align:center;"  
                                                            Font-Names="Arial" onblur="F_ValidarStockGrilla(this.id);"  Enabled="False"></asp:TextBox>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>                                                                                                       

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

     <input id="hfCodCtaCte" type="hidden"  value="0" />
     <input id="hfCodCtaCteConsulta" type="hidden"  value="0" />
     <input id="hfCodigoTemporal" type="hidden"  value="0" />
     <input id="hfCodDocumentoVenta" type="hidden" value="0" />
     <input id="hfNotaPedido" type="hidden" value="0" />
     <input id="hfCodUsuario" type="hidden" value="0" />
     <input id="hfCodDepartamento" type="hidden"  value="0" />
     <input id="hfCodProvincia" type="hidden"  value="0" />
     <input id="hfCodDistrito" type="hidden"  value="0" />
     <input id="hfCodProforma" type="hidden"  value="0" />
     <input id="hfCodTraslado" type="hidden"  value="0" />
     <input id="hfPartida" type="hidden"  value="" />
</asp:Content>
