<%@ Page Title="REG VENTAS" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="RegistroFacturaMultipleMilagros.aspx.cs" Inherits="SistemaInventario.Ventas.RegistroFacturaMultipleMilagros" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript" src="RegistroFacturaMultipleMilagros.js"  charset="UTF-8"></script>     
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"   type="text/css" />     
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/toars/toastr.min.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/toars/toastr.min.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo">
        REGISTRO DE VENTAS</div>
    <div id="divTabs">
        <ul>
            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
            <li id="liConsulta"><a href="#tabConsulta" onclick="getContentTab();">Consulta</a></li>
        </ul>
        <div id="tabRegistro">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    Datos de Cliente
                </div>
                <div>
                    <table cellpadding="0" cellspacing="0" class="form-inputs" width="750">
                        <tr style="display: none">
                            <td style="font-weight: bold">
                                Empresa
                                <asp:HiddenField ID="hdnCodEmpresa" runat="server" />
                                <asp:HiddenField ID="hdnCodSede" runat="server" />
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtEmpresa" runat="server" Width="420px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" ReadOnly="true"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold;">
                                            Almacen
                                        </td>
                                        <td style="padding-left: 9px;">
                                            <div id="div_AlmacenFisico">
                                                <asp:DropDownList ID="ddlAlmacenFisico" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="150">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Tipo Doc
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <div id="div_TipoDoc">
                                                <asp:DropDownList ID="ddlTipoDoc" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="120" BackColor="#FFFF99" Font-Size="Medium">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Cliente
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtNroRuc" runat="server" Width="70px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" MaxLength="11"></asp:TextBox>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtCliente" runat="server" Width="342px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                            <asp:ImageButton ID="imgAddScop" runat="server" ImageUrl="~/Asset/images/add_small.png"
                                                ImageAlign="AbsMiddle" ToolTip="Agregar Cliente" Style="display: none;" />
                                        </td>
                                        <td style="font-weight: bold; display: none;">
                                            Distrito
                                        </td>
                                        <td style="font-weight: bold; display: none; padding-left: 4px;">
                                            <asp:TextBox ID="txtDistrito" runat="server" Width="250px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold;">
                                            Direccion
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtDireccion" Style="display: none;" runat="server" Width="420px"
                                                Font-Names="Arial" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                            <div id="div_Direccion">
                                                <asp:DropDownList ID="ddlDireccion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" BackColor="#FFFF99" Width="425">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                COMENTARIO
                            </td>
                            <td style="padding-left: 4px;">
                                <asp:TextBox ID="txtObservacionCliente" runat="server" Width="912px" Font-Names="Arial"
                                    ForeColor="Black" Font-Bold="True" ReadOnly="True" Font-Size="Large"></asp:TextBox>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    Datos de Factura
                </div>
                <div>
                    <table cellpadding="0" cellspacing="0" class="form-inputs" width="750">
                        <tr>
                            <td style="font-weight: bold">
                                Moneda
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <div id="div_moneda">
                                                <asp:DropDownList ID="ddlMoneda" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="80" BackColor="#FFFF99">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold">
                                            Serie
                                        </td>
                                        <td>
                                            <div id="div_serie">
                                                <asp:DropDownList ID="ddlSerie" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtNumero" runat="server" Width="48" Font-Names="Arial" CssClass="Derecha"
                                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            Igv (%)
                                        </td>
                                        <td style="padding-left: 2px;">
                                            <div id="div_igv">
                                                <asp:DropDownList ID="ddlIgv" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="84">
                                                </asp:DropDownList>
                                            </div>
                                            <asp:HiddenField ID="txtValIgv" runat="server" />
                                        </td>
                                        <td style="font-weight: bold;">
                                            Emision
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtEmision" runat="server" Width="56px" CssClass="Jq-ui-dtp" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold;">
                                            cond.
                                        </td>
                                        <td id="tr_avisof" style="padding-left: 8px; background-color: white">
                                            <div id="div_formapago">
                                                <asp:DropDownList ID="ddlFormaPago" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="92">
                                                </asp:DropDownList>
                                            </div>
                                            <div id="div_avisofp" style="font-weight: bold; color: White; display: none">
                                                lA PROFORMA NO ES CONTADO
                                            </div>
                                        </td>
                                        <td style="font-weight: bold">
                                            vcto
                                        </td>
                                        <td style="padding-left: 8px;">
                                            <asp:TextBox ID="txtVencimiento" runat="server" Width="56px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            T.C.
                                        </td>
                                        <td>
                                            <asp:Label ID="lblTC" runat="server" Text="Label" Font-Bold="True"></asp:Label>
                                        </td>
                                        <td style="display: none;">
                                            <asp:CheckBox ID="chkRetencion" runat="server" Text="Retencion" Font-Bold="True" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Vendedor
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <div id="div_VendedorComision">
                                                <asp:DropDownList ID="ddlVendedorComision" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" BackColor="#FFFF99" Width="168">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="display: none;">
                                            <asp:TextBox ID="txtAcuenta" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" CssClass="Derecha" ReadOnly="True" Text="0.00" onchange="return cambiaracuenta(); return false;"></asp:TextBox>
                                        </td>
                                        <td>
                                            <table cellpadding="0" cellspacing="0">
                                                <tr id="tdSubTotalLabel">
                                                    <td style="font-weight: bold;">
                                                        Sub Total
                                                    </td>
                                                    <td id="tdSubTotalText">
                                                        <asp:TextBox ID="txtSubTotal" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                                    </td>
                                                    <td id="tdIgvLabel" style="font-weight: bold;">
                                                        Igv
                                                    </td>
                                                    <td id="tdIgvText" style="font-weight: bold;">
                                                        <asp:TextBox ID="txtIgv" runat="server" Width="81px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="font-weight: bold">
                                            Total
                                        </td>
                                        <td style="padding-left: 5px;">
                                            <asp:TextBox ID="txtTotal" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold; display: none">
                                            Nro Letra
                                        </td>
                                        <td style="display: none">
                                            <asp:TextBox ID="txtNroLetra" runat="server" Width="56px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" CssClass="Derecha"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold; display: none">
                                            Monto Letra
                                        </td>
                                        <td style="font-weight: bold; display: none">
                                            <asp:TextBox ID="txtMontoLetra" runat="server" Width="75px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" CssClass="Derecha" ReadOnly="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold; display: none">
                                            <asp:Button ID="btnBuscarLetra" runat="server" Text="Buscar Letra" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                                Font-Names="Arial" Font-Bold="True" Width="120" />
                                        </td>
                                        <td style="padding-left: 10px">
                                            <asp:CheckBox ID="chkMayorista" runat="server" Text="Mayorista" Font-Bold="True"
                                                onclick="F_ValidarCheckMayoristaMinorista(this.id);" ForeColor="Red" />
                                        </td>
                                        <td>
                                            <asp:CheckBox ID="chkSi" runat="server" Text="SI" Font-Bold="True" onclick="F_ValidarCheckMayoristaSINO(this.id);"
                                                ForeColor="Red" />
                                        </td>
                                        <td>
                                            <asp:CheckBox ID="chkNo" runat="server" Text="NO" Font-Bold="True" onclick="F_ValidarCheckMayoristaSINO(this.id);"
                                                ForeColor="Red" />
                                        </td>
                                        <td>
                                            <asp:CheckBox ID="chkMinorista" runat="server" Text="Minorista" Font-Bold="True"
                                                onclick="F_ValidarCheckMayoristaMinorista(this.id);" ForeColor="#9900CC" />
                                        </td>
                                        <td style="padding-left: 10px">
                                            <asp:CheckBox ID="chkImpresion" runat="server" Text="Impresion" Font-Bold="True" />
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Observacion
                            </td>
                            <td style="padding-left: 4px;">
                                <asp:TextBox ID="txtObservacion" runat="server" Width="700px" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                            </td>
                        </tr>
                    </table>
                </div>
                <!--aca empieza acordion-->
                <div id="accordion">
                 <h3>
                    
                    DATOS DE LA GUIA</h3>
                <div class="ui-jqdialog-content">
                    
                    <table cellpadding="0" cellspacing="0" class="form-inputs">
                                    <tr>
                                        <td>
                                            <asp:CheckBox ID="chkGuia" runat="server" Text="Guia Serie" Font-Bold="True" />
                                        </td>
                                        <td>
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div id="div_serieguia">
                                                            <asp:DropDownList ID="ddlSerieGuia" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True">
                                                            </asp:DropDownList>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtNumeroGuia" runat="server" Width="50" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold; padding-left: 97px;">
                                                        Fecha
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtFechaTraslado" runat="server" Width="56px" CssClass="Jq-ui-dtp"
                                                            Font-Names="Arial" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold;">
                                                        Destino
                                                    </td>
                                                    <td style="padding-left: 14px;">
                                                        <asp:TextBox ID="txtDestino" Style="display: none;" runat="server" Width="510px"
                                                            Font-Names="Arial" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                        <div id="div_Destino">
                                                            <asp:DropDownList ID="ddlDestino" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" BackColor="#FFFF99" Width="500px">
                                                            </asp:DropDownList>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold">
                                            Transportista
                                        </td>
                                        <td>
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <asp:TextBox ID="txtNroRucTrasnportista" runat="server" Width="70px" Font-Names="Arial"
                                                            ForeColor="Blue" Font-Bold="True" MaxLength="11" disabled></asp:TextBox>
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtTransportista" runat="server" Width="300" Font-Names="Arial"
                                                            ForeColor="Blue" Font-Bold="True" disabled></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold">
                                                        Direccion
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtDireccionTransportista" Style="display: none;" runat="server"
                                                            Width="510" Font-Names="Arial" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                        <div id="div_DireccionTransportista">
                                                            <asp:DropDownList ID="ddlDireccionTransportista" runat="server" Font-Names="Arial"
                                                                ForeColor="Blue" Font-Bold="True" BackColor="#FFFF99" Width="423px">
                                                            </asp:DropDownList>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold">
                                            Placa
                                        </td>
                                        <td>
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <asp:TextBox ID="txtPlaca" runat="server" Width="60" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True" disabled></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold">
                                                        Marca
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtMarcaGuia" runat="server" Width="190" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True" disabled></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold">
                                                        Licencia
                                                    </td>
                                                    <td style="padding-left: 11px;">
                                                        <asp:TextBox ID="txtLicenciaGuia" runat="server" Width="120" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True" disabled></asp:TextBox>
                                                    </td>
                                                    <td style= "font-weight: bold">
                                                        Numero Bultos
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtNuBultos" runat="server" Width="105" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True" disabled ></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold">
                                                        Peso (kg)
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtPeso" runat="server" Width="105" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True" disabled></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                    
                </div>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnNuevo" runat="server" Text="Limpiar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnEliminar" runat="server" Text="Eliminar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnProforma" runat="server" Text="Proforma" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnFacturarCT" runat="server" Text="Cotizacion" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:HiddenField ID="hfFlagNotaVenta" runat="server" Value="0" />
                    <asp:Button ID="btnAgregarProducto" runat="server" Text="Agregar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnVistaPrevia" runat="server" Text="Vista Previa" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" Visible="false" />
                    <asp:Button ID="btnVistaPreviaGuia" runat="server" Text="Vista Previa Guia" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" Visible="false" />
                    <asp:HiddenField ID="hdnVistaPrevia" runat="server" Value="0" />
                    <asp:Button ID="btnGrabar" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </div>
            </div>
            <div style="text-align: center; width: 100%; color: Black; font-weight: bold">
                Cantidad de registros
                <asp:Label ID="lblNumRegistros" runat="server" Text="0"></asp:Label>
            </div>
            <div id="div_grvDetalleArticulo" style="padding-top: 5px;">
                <asp:GridView ID="grvDetalleArticulo" runat="server" AutoGenerateColumns="False"
                    border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                    Width="1017px">
                    <Columns>
                        <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete" Text="" />
                            </ItemTemplate>
                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblNroItem" Text='<%# Bind("NroItem") %>' CssClass="detallesart2"></asp:Label>
                                <asp:HiddenField ID="hfCodArticulo" runat="server" Value='<%# Bind("CodArticulo") %>' />
                                <asp:HiddenField ID="hfCodDetalleOC" runat="server" Value='<%# Bind("CodDetalleOC") %>' />
                                <asp:HiddenField ID="hfCantidad" runat="server" Value='<%# Bind("Cantidad") %>' />
                                <asp:HiddenField ID="hfPrecio" runat="server" Value='<%# Bind("Precio") %>' />
                                <asp:HiddenField ID="hfDescripcion" runat="server" Value='<%# Bind("Producto") %>' />
                                <asp:HiddenField ID="hfCodTipoDoc" runat="server" Value='<%# Bind("CodTipoDoc") %>' />
                                <asp:HiddenField ID="hfCodDetalle" runat="server" Value='<%# Bind("CodDetalle") %>' />
                                <asp:HiddenField ID="hfCostoSoles" runat="server" Value='<%# Bind("CostoProductoSoles") %>' />
                                <asp:HiddenField ID="hfCodUM" runat="server" Value='<%# Bind("CodUM") %>' />         
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Codigo">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblCodigoProducto" Text='<%# Bind("CodigoProducto") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Descripcion" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtDescripcion" Font-Bold="true" CssClass="ccsestilo"
                                    Width="480px" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Producto") %>'
                                    onchange="F_ActualizarDescripcionNP(this.id); return false;"></asp:TextBox>
                            </ItemTemplate>
                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Cantidad" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtCantidad" Width="75px" Font-Bold="true" Style="text-align: center;"
                                    CssClass="ccsestilo tcant" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Cantidad") %>'
                                    onchange="F_ActualizarCantidad(this.id); return false;"></asp:TextBox>
                            </ItemTemplate>
                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                        </asp:TemplateField>
                        <asp:BoundField DataField="UM" HeaderText="UM">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Precio" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtPrecio" Width="75px" Font-Bold="true" Style="text-align: center;"
                                    CssClass="ccsestilo tprecio" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Precio") %>'
                                    onchange="F_ActualizarCantidad(this.id); return false;"></asp:TextBox>
                                    
                            </ItemTemplate>
                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Importe">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblImporte" Text='<%# Bind("Importe") %>' CssClass='csimp'></asp:Label>
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
                                <td style="font-weight: bold">
                                    Tipo Doc
                                </td>
                                <td>
                                    <div id="div_TipoDocConsulta">
                                        <asp:DropDownList ID="ddlTipoDocConsulta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="85" BackColor="#FFFF99">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                                <td style="font-weight: bold">
                                    Serie
                                </td>
                                <td>
                                    <div id="div_serieconsulta">
                                        <asp:DropDownList ID="ddlSerieConsulta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkNumero" runat="server" Text="Numero" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:TextBox ID="txtNumeroConsulta" runat="server" Width="45" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkRango" runat="server" Text="Fecha" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:TextBox ID="txtDesde" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtHasta" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkCliente" runat="server" Text="Cliente" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:TextBox ID="txtClienteConsulta" runat="server" Width="350" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnBuscarConsulta" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </div>
            </div>
             <div style="padding-top: 5px;">
               <table cellpadding="0" cellspacing="0" align="center">
                                    <tr>
                                        <td style="font-weight: bold">
                                           Cantidad de Registros:
                                        </td>
                                        <td style="font-weight: bold">
                                            <label id="lblNumeroConsulta"></label>
                                        </td>                                
                                    </tr>
                                </table>
            </div>
            <div id="div_consulta" style="padding-top: 5px;">
                <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" border="0"
                    CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="1005px"
                    OnRowDataBound="grvConsulta_RowDataBound">
                    <Columns>
                        <asp:TemplateField Visible="false">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgEliminarDocumento" ImageUrl="~/Asset/images/EliminarBtn.png"
                                    ToolTip="ELIMINAR FACTURA" OnClientClick="F_EliminarRegistro(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgAnularDocumento" ImageUrl="~/Asset/images/Eliminar.jpg"
                                    ToolTip="ANULAR DOCUMENTO" OnClientClick="F_AnularRegistro(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField Visible="true">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgReemplazar" ImageUrl="~/Asset/images/Reemplazo.png"
                                    ToolTip="ACTUALIZAR DOCUMENTO" OnClientClick="F_ElegirNV(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="GR" Visible="false">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgImprimir" ImageUrl="~/Asset/images/imprimir.gif"
                                    ToolTip="Imprimir Guia" OnClientClick="F_ImprimirGuia(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="PF">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgPdf" ImageUrl="~/Asset/images/pdf.png" ToolTip="Imprimir Factura"
                                    OnClientClick="ImprimirFacturaDetalle(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="TK">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgTCK" ImageUrl="~/Asset/images/imprimir.gif"
                                    ToolTip="Imprimir Ticket" OnClientClick="F_ImprimirFacturaHTML(undefined,this,'imgTCK','TK'); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="ST">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgSticker" ImageUrl="~/Asset/images/imprimir.gif"
                                    ToolTip="Imprimir Sticker" OnClientClick="F_ImprimirFacturaHTML_STICKER(undefined,this,'imgSticker','TK'); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>

                        <asp:TemplateField HeaderText="O">
                            <ItemTemplate>
                                <img id="imgMasObservacion" alt="" style="cursor: pointer" src="../Asset/images/plus.gif"
                                    onclick="imgMasObservacion_Click(this);" title="OBSERVACION" />
                                <asp:Panel ID="pnlOrdersObservacion" runat="server" Style="display: none">
                                    <asp:GridView ID="grvDetalleObservacion" runat="server" border="0" CellPadding="0"
                                        CellSpacing="1" AutoGenerateColumns="False" GridLines="None" class="GridView">
                                        <Columns>
                                            <asp:BoundField DataField="Observacion" HeaderText="Observacion">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Left" />
                                            </asp:BoundField>
                                        </Columns>
                                    </asp:GridView>
                                </asp:Panel>
                            </ItemTemplate>
                        </asp:TemplateField>
                        
                        <asp:TemplateField>
                            <ItemTemplate>
                                <img id="imgMas" alt="" style="cursor: pointer" src="../Asset/images/plus.gif" onclick="imgMas_Click(this);"
                                    title="Ver Detalle" />
                                <asp:Panel ID="pnlOrders" runat="server" Style="display: none">
                                    <asp:GridView ID="grvDetalle" runat="server" border="0" CellPadding="0" CellSpacing="1"
                                        AutoGenerateColumns="False" GridLines="None" class="GridView">
                                        <Columns>
                                            <asp:BoundField DataField="NroItem" HeaderText="Item">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Right" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Pedido" HeaderText="PE">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Right" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Codigo" HeaderText="Codigo">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Left" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Descripcion" HeaderText="Descripcion">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Left" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Cantidad" HeaderText="Cantidad">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Right" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="UM" HeaderText="UM">
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
                        <asp:TemplateField HeaderText="Numero" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblNumero" Text='<%# Bind("Numero") %>'  CssClass="detallesart"></asp:Label>
                                <asp:HiddenField ID="hfCodTraslado" runat="server" Value='<%# Bind("CodTraslado") %>' />
                                <asp:HiddenField ID="hfCodigo" runat="server" Value='<%# Bind("Codigo") %>' />
                                <asp:HiddenField ID="hfCodTipoDoc" runat="server" Value='<%# Bind("CodTipoDoc") %>' />
                                <asp:HiddenField ID="hfDetalleCargado" runat="server" Value='0' />
                                <asp:HiddenField ID="hfDetalleCargadoObservacion" runat="server" Value='0' />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Cliente" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblCliente" Text='<%# Bind("Cliente") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Emision" HeaderText="Emision" HeaderStyle-HorizontalAlign="Center">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Condicion" HeaderText="Condicion" HeaderStyle-HorizontalAlign="Center">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:BoundField DataField="TC" HeaderText="TC" HeaderStyle-HorizontalAlign="Center">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Total" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblTotal" Text='<%# Bind("Total") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Saldo" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblSaldo" Text='<%# Bind("Saldo") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Moneda" HeaderText="Moneda" HeaderStyle-HorizontalAlign="Center">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Guia" HeaderText="Guia" HeaderStyle-HorizontalAlign="Center"
                            Visible="false">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Estado" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblEstado" Text='<%# Bind("Estado") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                    </Columns>
                </asp:GridView>
            </div>
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
                        <asp:DropDownList ID="ddlSede" runat="server" Font-Names="Arial" ForeColor="Blue"
                            Font-Bold="True" CssClass="ccsestilo">
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
    <div id="divConsultaArticulo" style="display: none;">
        <div id='div1' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                Criterio de busqueda
            </div>
            <div class="ui-jqdialog-content">
                <table cellpadding="0" cellspacing="0" class="form-inputs">
                    <tbody>
                        <tr>
                            <td>
                                <asp:CheckBox ID="chkServicios" runat="server" Text="Servicios" Font-Bold="True"
                                    Style="display: none;" />
                            </td>
                            <td>
                                <asp:CheckBox ID="chkNotaPedido" runat="server" Text="nota pedido" Font-Bold="True"
                                    Style="display: none;" />
                            </td>
                            <td style="padding-left: 5px; font-weight: bold">
                                <asp:CheckBox ID="chkDescripcion" runat="server" Text="descripcion" Font-Bold="True" />
                            </td>
                            <td>
                                <asp:TextBox ID="txtArticulo" runat="server" Width="617px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True"></asp:TextBox>
                            </td>
                            <td>
                                <asp:CheckBox ID="chkFiltroMoleta" runat="server" Text="Filtrar Por Moleta" Font-Bold="True" />
                            </td>
                            <td>
                                <asp:TextBox ID="txtFiltroMoleta" runat="server" Width="100" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True"></asp:TextBox>
                            </td>
                            <td>
                                <asp:Label ID="lblTipoPrecios" runat="server" Text="" Font-Bold="True"></asp:Label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="linea-button">
                <asp:Button ID="btnBuscarArticulo" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    Font-Names="Arial" Font-Bold="True" Width="120" />
                <asp:Button ID="btnAgregar" runat="server" Text="Agregar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    Font-Names="Arial" Font-Bold="True" Width="120" />
            </div>
        </div>
        <div>
            <table class="GridView" style="padding-top: 5px; padding-bottom: 0px; margin-bottom: 5px">
                <tr>
                    <th scope="col" style="width: 23px">
                        &nbsp;
                    </th>
                    <th scope="col">
                        Descripcion
                    </th>
                    <th align="center" scope="col" style="width: 38px">
                        Stock
                    </th>
                    <th scope="col" style="width: 38px">
                        Costo
                    </th>
                    <th scope="col" style="width: 23px">
                        MON
                    </th>
                    <th scope="col" style="width: 48px">
                        Mayori
                    </th>
                    <th scope="col" style="width: 48px">
                        Marg %
                    </th>
                    <th scope="col" style="width: 48px">
                        Minori
                    </th>
                    <th scope="col" style="width: 48px">
                        Marg %
                    </th>
                    <th scope="col" style="width: 48px">
                        Moleta
                    </th>
                    <th scope="col" style="width: 23px">
                        UM
                    </th>
                    <th scope="col" style="width: 36px">
                        Desc
                    </th>
                    <th scope="col" style="width: 57px">
                        Precio
                    </th>
                    <th scope="col" style="width: 59px">
                        Cant.
                    </th>
                    <th scope="col" style="width: 7px">
                        &nbsp;
                    </th>
                </tr>
            </table>
        </div>
        <div id="div_grvConsultaArticulo" style="overflow-y: scroll; height: 315px;">
            <asp:GridView ID="grvConsultaArticulo" runat="server" AutoGenerateColumns="False"
                border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                Width="1160px" OnRowDataBound="grvConsultaArticulo_RowDataBound" ShowHeader="false">
                <Columns>
                    <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center" ItemStyle-Width="25px">
                        <ItemTemplate>
                            <asp:CheckBox runat="server" ID="chkOK" CssClass="chkSi" Text="" onclick="F_ValidarCheckElegirArticulo(this.id);" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="ID" Visible="false">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblcodproducto2" Text='<%# Bind("CodProducto") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Codigo" Visible="false">
                        <ItemStyle Font-Bold="true" HorizontalAlign="Left" />
                        <ItemTemplate>
                            <asp:HyperLink runat="server" ID="hlkCodigo" Font-Underline="true" ForeColor="Blue"
                                Style="cursor: hand" Text='<%# Bind("CodigoProducto") %>' onclick="F_VerUltimoPrecio(this.id); return false;"
                                ToolTip="Ver Series">
                            </asp:HyperLink>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Descripcion">
                        <ItemStyle HorizontalAlign="Left" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblProducto" Text='<%# Bind("Producto") %>'></asp:Label>
                            <asp:HiddenField ID="lblCodProducto" runat="server" Value='<%# Bind("CodProducto") %>' />
                            <asp:HiddenField ID="hfCodProducto" runat="server" Value='<%# Bind("CodProducto") %>' />
                            <asp:HiddenField ID="hfCodUnidadVenta" runat="server" Value='<%# Bind("CodUnidadVenta") %>' />
                            <asp:HiddenField ID="hfCosto" runat="server" Value='<%# Bind("Costo") %>' />
                            <asp:HiddenField ID="hfDescuento" runat="server" Value='<%# Bind("Descuento") %>' />
                            <asp:HiddenField ID="hfCodFamilia" runat="server" Value='<%# Bind("CodFamilia") %>' />
                            <asp:HiddenField ID="hfCostoProductoSoles" runat="server" Value='<%# Bind("CostoProductoSoles") %>' />
                            <asp:HiddenField ID="hfCostoProductoDolares" runat="server" Value='<%# Bind("CostoProductoDolares") %>' />
                            <asp:HiddenField ID="hfMargen" runat="server" Value='<%# Bind("Margen") %>' />
                            <asp:HiddenField ID="hfCostoUniOriginal" runat="server" Value='<%# Bind("CostoUniOriginal") %>' />
                            <asp:HiddenField ID="hfPrecioOrig" runat="server" />
                            <asp:HiddenField ID="hfPrecioMayoristaOrig" runat="server" />
                            <asp:HiddenField ID="hfFlagAplicaIgvPrecio" runat="server" Value='<%# Bind("FlagAplicaIgvPrecio") %>' />
                            <asp:HiddenField ID="hfFlagAplicaIgvPrecioMayorista" runat="server" Value='<%# Bind("FlagAplicaIgvPrecioMayorista") %>' />
                            <asp:HiddenField ID="hfPrecioMayorista" runat="server" Value='<%# Bind("PrecioMayorista") %>' />
                            <asp:HiddenField ID="hfPrecioMinorista" runat="server" Value='<%# Bind("PrecioMinorista") %>' />
                            <asp:HiddenField ID="hfCodigoProducto" runat="server" Value='<%# Bind("CodigoProducto") %>' />
                            <asp:HiddenField ID="hfFlagBloqueoMayorista" runat="server" Value='<%# Bind("FlagBloqueoMayorista") %>' />
                            
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Adespa" Visible="false">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblDespacho" Text='<%# Bind("Adespacho") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Alivia" Visible="false">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lbl4ToPiso" Text='<%# Bind("Aliviano") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Aconten" Visible="false">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblTemplo" Text='<%# Bind("AContenedores") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="Total" HeaderText="Stock" HeaderStyle-HorizontalAlign="Center"
                        DataFormatString="{0:N2}" ItemStyle-Width="40px">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Right" />
                    </asp:BoundField>
                    <asp:TemplateField HeaderText="Costo" Visible="true" ItemStyle-Width="40px">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblCostoSoles" Text='<%# Bind("CostoProductoSoles") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="MON" ItemStyle-Width="25px">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblMoneda" Text='<%# Bind("Moneda") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Mayorista" Visible="false" ItemStyle-Width="50px">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblPrecioMayoristaDolares" Text='<%# Bind("PrecioMayoristaDolares") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Mayorista" ItemStyle-Width="50px">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblPrecioMayoristaSoles" Text='<%# Bind("PrecioMayorista") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Margen %" ItemStyle-Width="50px">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblMargenMayoristaSoles" Text='<%# Bind("MargenMayorista") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Minorista" Visible="false" ItemStyle-Width="50px">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblPrecioDolares" Text='<%# Bind("PrecioDolares") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Minorista" ItemStyle-Width="50px">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblPrecioSoles" Text='<%# Bind("PrecioMinorista") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Margen %" ItemStyle-Width="50px">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblMargenMinoristaSoles" Text='<%# Bind("Margen") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="IGV" ItemStyle-HorizontalAlign="Center" Visible="false"
                        ItemStyle-Width="40px">
                        <ItemTemplate>
                            <asp:CheckBox runat="server" ID="chkAplicaIgv" Text="" onclick="F_ValidarCheckAplicarIgv(this.id);" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Moleta" ItemStyle-Width="50px">
                        <ItemStyle HorizontalAlign="Center"   BackColor="LightGreen" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblMoleta" Text='<%# Bind("Moleta") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="UM" ItemStyle-Width="25px">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblUM" Text='<%# Bind("UM") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Desc" ItemStyle-HorizontalAlign="Center" ItemStyle-Width="20px">
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtDescuento1" Width="35px" Font-Bold="true" Style="text-align: center;"
                                ForeColor="Blue" Font-Names="Arial" onblur="F_ValidarDsc(this.id, 'txtDescuento1');"
                                Text='<%# Bind("Descuento1") %>' CssClass="ccsestilo" Enabled="True"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Desc2" ItemStyle-HorizontalAlign="Center" Visible="false">
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtDescuento2" Width="35px" Font-Bold="true" Style="text-align: center;"
                                ForeColor="Blue" Font-Names="Arial" onblur="F_ValidarDsc(this.id, 'txtDescuento2');"
                                Text='<%# Bind("Descuento2") %>' CssClass="ccsestilo" Enabled="True"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Desc3" ItemStyle-HorizontalAlign="Center" Visible="false">
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtDescuento3" Width="35px" Font-Bold="true" Style="text-align: center;"
                                ForeColor="Blue" Font-Names="Arial" onblur="F_ValidarDsc(this.id, 'txtDescuento3');"
                                Text='<%# Bind("Descuento3") %>' CssClass="ccsestilo" Enabled="True"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Desc4" ItemStyle-HorizontalAlign="Center" Visible="false">
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtDescuento4" Width="35px" Font-Bold="true" Style="text-align: center;"
                                ForeColor="Blue" Font-Names="Arial" onblur="F_ValidarDsc(this.id, 'txtDescuento4');"
                                Text='<%# Bind("Descuento4") %>' CssClass="ccsestilo" Enabled="True"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="TipoCambio" HeaderText="TC" Visible="false">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Right" />
                    </asp:BoundField>
                    <asp:BoundField DataField="Descuento" HeaderText="Dscto-Max" Visible="False">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Right" />
                    </asp:BoundField>
                    <asp:TemplateField HeaderText="Precio" ItemStyle-HorizontalAlign="Center" ItemStyle-Width="40px">
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtPrecio" Width="55px" Font-Bold="true" Style="text-align: center;"
                                ForeColor="Blue" Font-Names="Arial" onblur="F_ValidarPrecioGrilla(this.id);"
                                CssClass="ccsestilo"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Dscto" ItemStyle-HorizontalAlign="Center" Visible="False"
                        ItemStyle-Width="40px">
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtDescuento" Width="55px" Font-Bold="true" Style="text-align: center;"
                                ForeColor="Blue" Font-Names="Arial" onblur="F_ValidarDescuento(this.id);" CssClass="ccsestilo"
                                Enabled="False"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Cant." ItemStyle-HorizontalAlign="Center" ItemStyle-Width="40px">
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtCantidad" Width="55px" Font-Bold="true" Style="text-align: center;"
                                ForeColor="Blue" Font-Names="Arial" CssClass="ccsestilo" Enabled="False"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
        </div>
    </div>
    <div id="divConsultaNotaVenta" style="display: none">
        <div id='Div3' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 670px">
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                Criterio de busqueda
            </div>
            <div class="ui-jqdialog-content">
                <table cellpadding="0" cellspacing="0" class="form-inputs" style="width: 670px">
                    <tbody>
                        <tr>
                            <td style="padding-left: 5px; font-weight: bold">
                                Serie
                            </td>
                            <td>
                                <asp:TextBox ID="txtNvSerie" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True"></asp:TextBox>
                            </td>
                            <td style="padding-left: 5px; font-weight: bold">
                                Numero
                            </td>
                            <td>
                                <asp:TextBox ID="txtNvNumero" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-left: 5px; font-weight: bold">
                                Razon Social
                            </td>
                            <td colspan="3">
                                <asp:TextBox ID="txtNvRazonSocial" runat="server" Width="250px" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="linea-button">
                <asp:Button ID="btnBuscarConNv" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    Font-Names="Arial" Font-Bold="True" Width="120" />
            </div>
        </div>
        <div id="div_grvConNtVenta" style="padding-top: 5px;">
            <asp:GridView ID="grvConNtVenta" runat="server" AutoGenerateColumns="False" border="0"
                CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="650px">
                <Columns>
                    <asp:TemplateField HeaderText="Numero">
                        <ItemTemplate>
                            <asp:Label ID="lblNVNumero" runat="server" Text='<%# Bind("NumeroDoc") %>'></asp:Label>
                            <asp:HiddenField ID="hdnCodNtVenta" runat="server" Value='<%# Bind("CodDocumentoVenta") %>' />
                            <asp:HiddenField ID="hdnCodNtFormaPago" runat="server" Value='<%# Bind("CodFormaPago") %>' />
                        </ItemTemplate>
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Left" Width="100px" />
                    </asp:TemplateField>
                    <asp:BoundField DataField="Fecha" HeaderText="Fecha">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Left" />
                    </asp:BoundField>
                    <asp:TemplateField HeaderText="Cliente">
                        <ItemTemplate>
                            <asp:Label ID="lblClienteCon" runat="server" Text='<%# Bind("RazonSocial") %>'></asp:Label>
                        </ItemTemplate>
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Left" Width="250px" />
                    </asp:TemplateField>
                    <asp:BoundField DataField="Total" HeaderText="Total">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Right" />
                    </asp:BoundField>
                    <asp:BoundField DataField="Moneda" HeaderText="Moneda">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Left" />
                    </asp:BoundField>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <asp:ImageButton ID="imgSelecCot" runat="server" ImageUrl="~/Asset/images/ok.gif"
                                OnClientClick="F_ElegirNotaVenta(this); return false;" ToolTip="Elegir" />
                        </ItemTemplate>
                        <ItemStyle Width="20px" />
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
        </div>
    </div>
    <div id="divConsultaProforma" style="display: none">
        <div id='Div5' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 670px">
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                Criterio de busqueda
            </div>
            <div class="ui-jqdialog-content">
                <table cellpadding="0" cellspacing="0" class="form-inputs" style="width: 670px">
                    <tbody>
                        <tr>
                            <td style="padding-left: 5px; font-weight: bold">
                                Serie
                            </td>
                            <td>
                                <asp:TextBox ID="txtSerieProforma" runat="server" Width="80px" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True" disabled></asp:TextBox>
                            </td>
                            <td style="padding-left: 5px; font-weight: bold">
                                Numero
                            </td>
                            <td>
                                <asp:TextBox ID="txtNumeroProforma" runat="server" Width="80px" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-left: 5px; font-weight: bold">
                                Razon Social
                            </td>
                            <td colspan="3">
                                <asp:TextBox ID="txtRazonSocialProforma" runat="server" Width="250px" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="linea-button">
                <asp:Button ID="btnBuscarProforma" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    Font-Names="Arial" Font-Bold="True" Width="120" />
            </div>
        </div>
        <div id="div_Proforma" style="padding-top: 5px;">
            <asp:GridView ID="grvProforma" runat="server" AutoGenerateColumns="False" border="0"
                CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="670px">
                <Columns>
                    <asp:TemplateField HeaderText="Numero">
                        <ItemTemplate>
                            <asp:Label ID="lblNVNumero" runat="server" Text='<%# Bind("Numero") %>'></asp:Label>
                            <asp:HiddenField ID="hdnCodProforma" runat="server" Value='<%# Bind("CodDocumentoVenta") %>' />
                            <asp:HiddenField ID="hdnCodNtFormaPago" runat="server" Value='<%# Bind("CodFormaPago") %>' />
                        </ItemTemplate>
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Left" Width="100px" />
                    </asp:TemplateField>
                    <asp:BoundField DataField="Fecha" HeaderText="Fecha">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Left" />
                    </asp:BoundField>
                    <asp:TemplateField HeaderText="Cliente">
                        <ItemTemplate>
                            <asp:Label ID="lblClienteCon" runat="server" Text='<%# Bind("RazonSocial") %>'></asp:Label>
                        </ItemTemplate>
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Left" Width="250px" />
                    </asp:TemplateField>
                    <asp:BoundField DataField="Total" HeaderText="Total">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Right" />
                    </asp:BoundField>
                    <asp:BoundField DataField="Moneda" HeaderText="Moneda">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Left" />
                    </asp:BoundField>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <asp:ImageButton ID="imgProforma" runat="server" ImageUrl="~/Asset/images/ok.gif"
                                OnClientClick="F_ElegirProforma(this); return false;" ToolTip="Elegir" />
                        </ItemTemplate>
                        <ItemStyle Width="20px" />
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
        </div>
    </div>
    <div id="divConsultaCotizacion" style="display: none">
        <div id='Div2' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 670px">
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                Criterio de busqueda
            </div>
            <div class="ui-jqdialog-content">
                <table cellpadding="0" cellspacing="0" class="form-inputs" style="width: 670px">
                    <tbody>
                        <tr>
                            <td style="padding-left: 5px; font-weight: bold">
                                Serie
                            </td>
                            <td>
                                <asp:TextBox ID="txtCTSerie" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True"></asp:TextBox>
                            </td>
                            <td style="padding-left: 5px; font-weight: bold">
                                Numero
                            </td>
                            <td>
                                <asp:TextBox ID="txtCTNumero" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-left: 5px; font-weight: bold">
                                Razon Social
                            </td>
                            <td colspan="3">
                                <asp:TextBox ID="txtCTRazonSocial" runat="server" Width="250px" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="linea-button">
                <asp:Button ID="btnBuscarConCT" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    Font-Names="Arial" Font-Bold="True" Width="120" />
            </div>
        </div>
        <div id="div_grvConCTVenta" style="padding-top: 5px;">
            <asp:GridView ID="grvConCTVenta" runat="server" AutoGenerateColumns="False" border="0"
                CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="670px">
                <Columns>
                    <asp:TemplateField HeaderText="Numero">
                        <ItemTemplate>
                            <asp:Label ID="lblNVNumero" runat="server" Text='<%# Bind("Numero") %>'></asp:Label>
                            <asp:HiddenField ID="hdnCodNtVenta" runat="server" Value='<%# Bind("CodProforma") %>' />
                            <asp:HiddenField ID="hdnCodNtFormaPago" runat="server" Value='<%# Bind("CodFormaPago") %>' />
                        </ItemTemplate>
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Right" />
                    </asp:TemplateField>
                    <asp:BoundField DataField="Fecha" HeaderText="Fecha">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Center" />
                    </asp:BoundField>
                    <asp:TemplateField HeaderText="Cliente">
                        <ItemTemplate>
                            <asp:Label ID="lblClienteCon" runat="server" Text='<%# Bind("RazonSocial") %>'></asp:Label>
                        </ItemTemplate>
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Left" />
                    </asp:TemplateField>
                    <asp:BoundField DataField="Total" HeaderText="Total">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Right" />
                    </asp:BoundField>
                    <asp:BoundField DataField="Moneda" HeaderText="Moneda">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Left" />
                    </asp:BoundField>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <asp:ImageButton ID="imgSelecCot" runat="server" ImageUrl="~/Asset/images/ok.gif"
                                OnClientClick="F_ElegirCotizacion(this); return false;" ToolTip="Elegir" />
                        </ItemTemplate>
                        <ItemStyle Width="20px" />
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
        </div>
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
    <input id="hfCodCtaCte" type="hidden" value="0" />
    <input id="hfCodCtaCteConsulta" type="hidden" value="0" />
    <input id="hfCodigoTemporal" type="hidden" value="0" />
    <input id="hfCodDocumentoVenta" type="hidden" value="0" />
    <input id="hfNotaPedido" type="hidden" value="0" />
    <input id="hfCodUsuario" type="hidden" value="0" />
    <input id="hfCodDepartamento" type="hidden" value="0" />
    <input id="hfCodProvincia" type="hidden" value="0" />
    <input id="hfCodDistrito" type="hidden" value="0" />
    <input id="hfCodProforma" type="hidden" value="0" />
    <input id="hfCodTraslado" type="hidden" value="0" />
    <input id="hfCodDireccion" type="hidden" value="0" />
    <input id="hfPartida" type="hidden" value="" />
    <input id="hfCodDocumentoRef" type="hidden" value="0" />
    <input id="hfCodTipoDocRef" type="hidden" value="0" />
    <input id="hfCodFormaPagoRef" type="hidden" value="0" />
    <input id="hfCodTransportista" type="hidden" value="0" />
    <input id="hfCodProforma2" type="hidden" value="0" />
    <input id="hfCodLetra" type="hidden" value="0" />
    <input id="hfCodDocumentoVentaAnterior" type="hidden" value="0" />
    <input id="hfCodCtaCteProforma" type="hidden" value="0" />
    <input id="hftransportista" type="hidden" value="0" />
    <input id="hfCodDepartamentoTransportista" type="hidden" value="0" />
    <input id="hfCodProvinciaTransportista" type="hidden" value="0" />
    <input id="hfCodDistritoTransportista" type="hidden" value="0" />
    <input id="hfCodDireccionTransportista" type="hidden" value="0" />
    <input id="hfPlaca" type="hidden" value="0" />
    <input id="hfMarca" type="hidden" value="0" />
    <input id="hfLicencia" type="hidden" value="0" />
    <input id="hfBultos" type="hidden" value="0" />
    <input id="hfPeso" type="hidden" value="0" />
    <input id="hfCodTipoDocAnulacion" type="hidden" value="0" />
    <input id="hfCodDocumentoVentaAnulacion" type="hidden" value="0" />
    <input id="hfClienteAnulacion" type="hidden" value="0" />
    <input id="hfNumeroAnulacion" type="hidden" value="0" />

</asp:Content>
