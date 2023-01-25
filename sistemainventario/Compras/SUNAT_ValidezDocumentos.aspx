<%@ Page Title="Validez Docs. SUNAT" Language="C#" MasterPageFile="~/Site.Master"
    AutoEventWireup="true" CodeBehind="SUNAT_ValidezDocumentos.aspx.cs" Inherits="SistemaInventario.Compras.SUNAT_ValidezDocumentos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"
        type="text/javascript"></script>
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript" language="javascript"
        charset="UTF-8"></script>
    <script type="text/javascript" language="javascript" src="SUNAT_ValidezDocumentos.js"
        charset="UTF-8"></script>
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/toars/toastr.min.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/toars/toastr.min.js" type="text/javascript"></script>


<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta http-equiv="Access-Control-Allow-Origin" content="*" />
<meta http-equiv="Access-Control-Allow-Headers" content="Content-Type" />
<meta http-equiv="Access-Control-Allow-Methods" content="POST" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo" style="width: 300px">
        Validez SUNAT de Documentos de Compra</div>
    <div style="display:flex; padding-bottom: 5px;">
    <div id="tabRegistro" style="width: 300px;padding-right:20px;">
        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                CRITERIO DE BUSQUEDA</div>
            <div id="divConsultaArticulo">
                <div class="ui-jqdialog-content">
                    <table cellpadding="0" cellspacing="0" class="form-inputs">
                        <tr style="display: none">
                            <td style="font-weight: bold">
                                Sucursal
                            </td>
                            <td>
                                <div id="div_Sucursal">
                                    <asp:DropDownList ID="ddlSucursal" runat="server" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Width="100px">
                                    </asp:DropDownList>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Desde
                            </td>
                            <td style="width: 55px">
                                <asp:TextBox ID="txtDesde" runat="server" Width="55px" Font-Names="Arial" CssClass="Jq-ui-dtp"
                                    ReadOnly="true" ForeColor="Blue"></asp:TextBox>
                            </td>
                            <td style="padding-left: 5px; font-weight: bold">
                                Hasta
                            </td>
                            <td>
                                <asp:TextBox ID="txtHasta" runat="server" Width="55px" Font-Names="Arial" CssClass="Jq-ui-dtp"
                                    ReadOnly="true" ForeColor="Blue"></asp:TextBox>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnReporte" runat="server" Text="Filtrar" Font-Names="Arial" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Width="120px" />
                        
        
                </div>
            </div>
        </div>        
    </div>
    <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="padding-bottom: 10px; width: 520px; height:120px;">
        <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                REGLAS DE LA VALIDACION</div>
        <div class="ui-jqdialog-content">
            <ol>
                <li>EL NUMERO DE RUC DEL EMISOR DE LA FACTURA DEBE TENER 11 CARACTERES Y SER NUMERICO.</li>                
                <li>EL NUMERO DE SERIE DE LA FACTURA DEBE TENER 4 CARACTERES.</li>
                <li>EL NUMERO DE LA FACTURA DEBE SER NUMERICO Y TENER COMO MAXIMO 8 CARACTERES EJM: '749' O '00000749'.</li>
                <li>LA FECHA DE EMISION DE LA FACTURA DEBE TENER EL FORMATO DIA/MES/AÑO EJM: 29/06/2018.</li>
                <li>EL MONTO DE LA FACTURA DEBE SER NUMERICO.</li>
            </ol>
        </div>
        </div>

        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="padding-bottom: 10px; width: 520px; height:50px;">
        <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                MOTIVO DE ESTADO SUNAT NO EXISTE</div>
        <div class="ui-jqdialog-content">
            <ol>
                <li>SI LOS SIGUIENTES DATOS NO ESTAN CORRECTAMENTE COMPLETADOS NO SE ENCONTRARAN EN LA SUNAT.</li>                
                <li>SI EL PROVEEDOR NO A SUBIDO LA FACTURA A LA SUNAT.</li>
            </ol>
        </div>
        </div>
    </div>
    <div >
        <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
            RESULTADOS DE LA BUSQUEDA</div>        
    </div>
    <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
    <asp:Button ID="btnValidar" runat="server" Text="Validar Sunat" Font-Names="Arial"
            class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
            Width="120px" /> 
        <label id="lblCantidadRegistros">
        </label>
        
        <asp:DropDownList ID="ddlEstadoSunat" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="160">
                                            <asp:ListItem Value="-1">-- SELECCIONE ESTADO--</asp:ListItem>
                                            <asp:ListItem Value="0">NO EXISTE</asp:ListItem>
                                            <asp:ListItem Value="1">ACEPTADO</asp:ListItem>
                                            <asp:ListItem Value="2">ANULADO</asp:ListItem>
                                            <asp:ListItem Value="3">AUTORIZADO</asp:ListItem>
                                            <asp:ListItem Value="4">NO AUTORIZADO</asp:ListItem>
                                        </asp:DropDownList>
        
        
    </div>
    <div id="div_consulta" class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
        <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" border="0"
            CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="1035px">
            <Columns>
                <asp:BoundField DataField="Emp" HeaderText="Emp">
                    <HeaderStyle HorizontalAlign="Center" />
                    <ItemStyle HorizontalAlign="Center" />
                </asp:BoundField>
                <asp:BoundField DataField="Almacen" HeaderText="Almacen">
                    <HeaderStyle HorizontalAlign="Center" />
                    <ItemStyle HorizontalAlign="Center" />
                </asp:BoundField>
                <asp:BoundField DataField="TD" HeaderText="TD">
                    <HeaderStyle HorizontalAlign="Center" />
                    <ItemStyle HorizontalAlign="Center" />
                </asp:BoundField>
                <asp:BoundField DataField="Serie" HeaderText="Serie">
                    <HeaderStyle HorizontalAlign="Center" />
                    <ItemStyle HorizontalAlign="Center" />
                </asp:BoundField>
                <asp:TemplateField HeaderText="Numero">
                    <ItemStyle HorizontalAlign="Left" />
                    <ItemTemplate>
                        <asp:Label runat="server" ID="lblNumero" Text='<%# Bind("Numero") %>' CssClass="detallesart"></asp:Label>
                        <asp:HiddenField ID="hfID" runat="server" Value='<%# Bind("ID") %>' />
                        <asp:HiddenField ID="hfRucEmpresa" runat="server" Value='<%# Bind("RucEmpresa") %>' />
                        <asp:HiddenField ID="hfCodTipoComprobante" runat="server" Value='<%# Bind("CodTipoComprobante") %>' />
                        <asp:HiddenField ID="hfSerie" runat="server" Value='<%# Bind("Serie") %>' />
                        <asp:HiddenField ID="hfNumero" runat="server" Value='<%# Bind("Numero") %>' />
                        <asp:HiddenField ID="hfFechaEmision" runat="server" Value='<%# Bind("FechaEmision") %>' />
                        <asp:HiddenField ID="hfTotal" runat="server" Value='<%# Bind("Total") %>' />
                        <asp:HiddenField ID="hfNroDocumento" runat="server" Value='<%# Bind("NroDocumento") %>' />
                        <asp:HiddenField ID="hfFechaUltimaValidacionSunat" runat="server" Value='<%# Bind("FechaUltimaValidacionSunat") %>' />
                        <asp:HiddenField ID="hfCerradoConsultaSunat" runat="server" Value='<%# Bind("CerradoConsultaSunat") %>' />
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:BoundField DataField="FechaEmision" HeaderText="Emision">
                    <HeaderStyle HorizontalAlign="Center" />
                    <ItemStyle HorizontalAlign="Center" />
                </asp:BoundField>
                <asp:BoundField DataField="Total" HeaderText="Total">
                    <HeaderStyle HorizontalAlign="Center" />
                    <ItemStyle HorizontalAlign="Right" />
                </asp:BoundField>
                <asp:BoundField DataField="NroDocumento" HeaderText="Nro. Doc">
                    <HeaderStyle HorizontalAlign="Center" />
                    <ItemStyle HorizontalAlign="Right" />
                </asp:BoundField>
                <asp:TemplateField HeaderText="RazonSocial" HeaderStyle-HorizontalAlign="Center">
                    <ItemStyle HorizontalAlign="Left" />
                    <ItemTemplate>
                        <asp:Label runat="server" ID="lblCliente" Text='<%# Bind("RazonSocial") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:BoundField DataField="FechaEmision" HeaderText="Emision">
                    <HeaderStyle HorizontalAlign="Center" />
                    <ItemStyle HorizontalAlign="Center" />
                </asp:BoundField>
                 <asp:TemplateField HeaderText="Validacion" HeaderStyle-HorizontalAlign="Center">
                    <ItemStyle HorizontalAlign="Center" />
                    <ItemTemplate>
                        <asp:Label runat="server" ID="lblValidacion" Text='<%# Bind("Validacion") %>' CssClass="validacion"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Estado Sunat" HeaderStyle-HorizontalAlign="Center"
                    ControlStyle-Width="120px">
                    <ItemStyle HorizontalAlign="Center" />
                    <ItemTemplate>
                        <asp:Label runat="server" ID="lblEstadoSunat" Text='<%# Bind("EstadoSunat") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="" HeaderStyle-HorizontalAlign="Center" ControlStyle-Width="12px">
                    <ItemStyle HorizontalAlign="Center" />
                    <ItemTemplate>
                        <asp:Image runat="server" ID="imgLoading" ImageUrl="~/Asset/images/nada.png"
                            Width="10px" Height="10px" ToolTip="PROCESANDO" />
                    </ItemTemplate>
                </asp:TemplateField>
            </Columns>
        </asp:GridView>
    </div>
    <div id="dlgWait" style="background-color: #CCE6FF; text-align: center; display: none;">
        <br />
        <br />
        <center>
            <asp:Label ID="Label2" runat="server" Text="PROCESANDO..." Font-Bold="true" Font-Size="Large"
                Style="text-align: center"></asp:Label></center>
        <br />
        <center>
            <img alt="Wait..." src="../Asset/images/ajax-loader2.gif" /></center>
    </div>
    <input id="hfCantidadRegistros" type="hidden" value="0" />
    <input id="hfToken" type="hidden" value="" />
    <input id="hfLink" type="hidden" value="" />
    <input id="hfUrlServerPeticionLocal" type="hidden" value="" />
    <input id="hfNroRucEmpresa" type="hidden" value="" />
    <input id="hfToken_Empresa" type="hidden" value="" />
    
</asp:Content>
