<%@ Page Title="Control Interno" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ControlInterno.aspx.cs" Inherits="SistemaInventario.Inventario.ControlInterno" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
        <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
        <script src="../Asset/js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
        <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
        <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
        <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"type="text/javascript"></script>
        <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
        <script src="../Asset/js/js.js" type="text/javascript"></script>  <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
        <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
        <script type="text/javascript" language="javascript"  src="ControlInterno.js" charset="UTF-8"></script>
        <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
        <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
         <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" /> 
         <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />     
         <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div class="titulo">Comprobante Ingreso</div> 

                        <div id="tabConsulta">
                            <div id='divConsulta' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                                  <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                                 Criterio de busqueda
                                     </div>

                                  <div class="ui-jqdialog-content">
                            <table cellpadding="0" cellspacing="0" class="form-inputs">
                            <tbody>
                             <tr>
                                        <td style="font-weight: bold">
                                            Serie
                                        </td>

                                             <td>
                                                 <div id="div_serieconsulta">
                                                 <asp:DropDownList ID="ddlSerieConsulta" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   >
                                                 </asp:DropDownList>
                                     </div>
                                </td>
                                             
                                             <td>
                                         <asp:CheckBox ID="chkNumero" runat="server" Text="Numero" Font-Bold="True"/>
                                        </td>

                                             <td>
                                          <asp:TextBox ID="txtNumeroConsulta" runat="server" Width="45" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ></asp:TextBox>
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
                                                <asp:TextBox ID="txtClienteConsulta" runat="server" Width="485" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   ></asp:TextBox>
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
                                            Width="1005px"  OnRowDataBound="grvConsulta_RowDataBound"> 
                                           
                                                <Columns>
                                                         <asp:TemplateField HeaderText="">
                                                                            <ItemTemplate>                                                                                                                               
                                                                                <asp:ImageButton runat="server" id="imgTexto" ImageUrl="~/Asset/images/imprimir.gif" 
                                                                                                 ToolTip="TEXTO" 
                                                                                                 OnClientClick="F_ImprimirControlInterno(this); return false;" />
                                                                            </ItemTemplate>
                                                         </asp:TemplateField>
                                                                                              

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

                                                    <asp:BoundField DataField="Importe" HeaderText="Importe">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>
                                                                                                        
                                                </Columns>

                                                    </asp:GridView>
                                              
                                                        </asp:Panel>
                                                    </ItemTemplate>
                                                </asp:TemplateField>

                                                    <asp:TemplateField HeaderText="ID" HeaderStyle-HorizontalAlign="Center" >
                                                        <ItemStyle HorizontalAlign="Left" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblID" Text='<%# Bind("ID") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                    
                                                   <asp:TemplateField HeaderText="Numero" HeaderStyle-HorizontalAlign="Center" >
                                                        <ItemStyle HorizontalAlign="Left" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblNumero" Text='<%# Bind("Numero") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                   <asp:TemplateField HeaderText="Cliente" HeaderStyle-HorizontalAlign="Center" >
                                                        <ItemStyle HorizontalAlign="Left" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblcliente" Text='<%# Bind("Cliente") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                                                                   
                                                   <asp:BoundField DataField="Emision" HeaderText="Emision" HeaderStyle-HorizontalAlign="Center" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Center" />
                                                    </asp:BoundField>
                                           
                                                   <asp:BoundField DataField="Vendedor" HeaderText="Vendedor" HeaderStyle-HorizontalAlign="Center" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>

                                                   <asp:BoundField DataField="Anexo" HeaderText="Anexo" HeaderStyle-HorizontalAlign="Center" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>

                                                   <asp:BoundField DataField="Operacion" HeaderText="Operacion" HeaderStyle-HorizontalAlign="Center" >
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>
                                                                                                                                    
                                                   <asp:BoundField DataField="Total" HeaderText="Total" HeaderStyle-HorizontalAlign="Center" DataFormatString="{0:N2}">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>

                                                    <asp:BoundField DataField="Moneda" HeaderText="Moneda" HeaderStyle-HorizontalAlign="Center" >
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

                        <input id="hfCodCtaCteConsulta" type="hidden"  value="0" />
                       
</asp:Content>
