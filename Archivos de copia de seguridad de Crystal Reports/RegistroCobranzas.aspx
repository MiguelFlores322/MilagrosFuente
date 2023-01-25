<%@ Page Title="Cobranzas" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="RegistroCobranzas.aspx.cs" Inherits="SistemaInventario.CuentasPorCobrar.RegistroCobranzas" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"
        type="text/javascript"></script>
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript" language="javascript"
        charset="UTF-8"></script>
    <script type="text/javascript" language="javascript" src="RegistroCobranzas.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/toars/toastr.min.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/toars/toastr.min.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo" style="width: 1250px">
        CUENTAS POR COBRAR</div>
    <div id="divTabs" style="width: 1250px">
        <ul>
            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
            <li id="liConsulta"><a href="#tabConsulta" onclick="getContentTab();">Consulta</a></li>
        </ul>
        <div id="tabRegistro">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 1205px">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    CONSULTA
                </div>
                <div>
                    <table>
                        <tr>
                            <td style="font-weight: bold">
                                Razon Social
                            </td>
                            <td>
                                <table>
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtProveedor" runat="server" Width="459px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td style="padding-left: 25px;">
                                            <asp:CheckBox ID="chkFiltroFecha" runat="server" Text="Fechas" Font-Bold="True" />
                                        </td>
                                        <td style="font-weight: bold; padding-left: 10px">
                                            del
                                        </td>
                                        <td style="padding-left: 5px">
                                            <asp:TextBox ID="txtFiltroFechaDesde" runat="server" Width="55" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            al
                                        </td>
                                        <td style="padding-left: 5px">
                                            <asp:TextBox ID="txtFiltroFechaHasta" runat="server" Width="55" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-left: 10px;">
                                <asp:CheckBox ID="chkFiltroMonto" runat="server" Text="Monto" Font-Bold="True" />
                            </td>
                            <td>
                                <table>
                                    <tr>
                                        <td style="font-weight: bold">
                                            de
                                        </td>
                                        <td style="padding-left: 3px">
                                            <asp:TextBox ID="txtFiltroMontoDesde" runat="server" Width="55" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" ReadOnly="False"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold; padding-left: 10px">
                                            a
                                        </td>
                                        <td style="padding-left: 3px">
                                            <asp:TextBox ID="txtFiltroMontoHasta" runat="server" Width="55" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" ReadOnly="False"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold; padding-left: 20px">
                                            Moneda
                                        </td>
                                        <td>
                                            <div id="div_FiltroMoneda">
                                                <asp:DropDownList ID="ddlFiltroMoneda" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="77">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold; padding-left: 24px">
                                            Estado
                                        </td>
                                        <td>
                                            <div id="divFiltroEstado">
                                                <asp:DropDownList ID="ddlFiltroEstado" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="77">
                                                    <asp:ListItem Value="0">TODOS</asp:ListItem>
                                                    <asp:ListItem Value="1">DEUDA</asp:ListItem>
                                                    <asp:ListItem Value="2">VENCIDOS</asp:ListItem>
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="padding-left: 26px">
                                            <asp:Button ID="btnLimpiarFiltros" runat="server" Text="Limpiar Filtros" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                                Font-Names="Arial" Font-Bold="True" Width="120px" />
                                        </td>
                                        <td>
                                            <asp:Button ID="btnFiltrar" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                                Font-Names="Arial" Font-Bold="True" Width="120px" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    REGISTRO DE COBRANZAS
                </div>
                <div>
                    <table cellpadding="0" cellspacing="0" class="form-inputs" width="750">
                        <tr>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="font-weight: bold">
                                            Emision
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtEmision" runat="server" Width="55px" CssClass="Jq-ui-dtp" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            CAJA
                                        </td>
                                        <td style="padding-left: 39px;">
                                            <div id="div_CajaFisica">
                                                <asp:DropDownList ID="ddlCajaFisica" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="115">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold;">
                                            Medio Pago
                                        </td>
                                        <td>
                                            <div id="div_MedioPago">
                                                <asp:DropDownList ID="ddlMedioPago" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="90">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td>
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: bold">
                                                        Banco
                                                    </td>
                                                    <td>
                                                        <div id="div_Banco">
                                                            <asp:DropDownList ID="ddlBanco" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" Width="130px">
                                                            </asp:DropDownList>
                                                        </div>
                                                    </td>
                                                    <td style="font-weight: bold">
                                                        Cuenta
                                                    </td>
                                                    <td>
                                                        <div id="div_Cuenta">
                                                            <asp:DropDownList ID="ddlCuenta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" Width="120px">
                                                            </asp:DropDownList>
                                                        </div>
                                                    </td>
                                                    <td style="font-weight: bold">
                                                        Nro Operacion
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtNroOperacion" runat="server" Width="120px" Font-Names="Arial"
                                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold">
                                                        Fecha
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtOperacion" runat="server" Width="55px" CssClass="Jq-ui-dtp" Font-Names="Arial"
                                                            ForeColor="Blue" Font-Bold="True" Enabled="False"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="font-weight: bold; padding-left: 5px; display: none;">
                                            Responsable
                                        </td>
                                        <td style="padding-left: 15px; display: none;">
                                            <asp:TextBox ID="txtResponsable" runat="server" Width="200px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td style="padding-left: 2px; font-weight: bold; display: none;">
                                            PAGADOR
                                        </td>
                                        <td style="padding-left: 5px; display: none;">
                                            <asp:TextBox ID="txtPagador" runat="server" Width="200px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="font-weight: bold;">
                                            tc
                                        </td>
                                        <td style="padding-left: 31px;">
                                            <asp:TextBox ID="txtTC" runat="server" Width="55px" Font-Names="Arial" ForeColor="Blue"
                                                CssClass="Derecha" Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold;">
                                            Moneda
                                        </td>
                                        <td style="padding-left: 22px;">
                                            <div id="div_moneda">
                                                <asp:DropDownList ID="ddlMoneda" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="115">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold;">
                                            Ingresado
                                        </td>
                                        <td style="padding-left: 6px">
                                            <asp:TextBox ID="txtCobroOperacion" runat="server" Width="86px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" CssClass="Derecha" Text="0.00"></asp:TextBox>
                                        </td>
                                        <td>
                                            <div id="div_tipoDevolucion">
                                                <asp:DropDownList ID="ddlTipoDevolucion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="80px">
                                                    <asp:ListItem Value="1">Vuelto</asp:ListItem>
                                                    <asp:ListItem Value="2">EXCESO</asp:ListItem>
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td>
                                            <div id="div_Vuelto">
                                                <asp:DropDownList ID="ddlVuelto" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="89px">
                                                    <asp:ListItem Value="1" Text="S./ 0.00" Selected></asp:ListItem>
                                                    <asp:ListItem Value="2" Text="USD 0.00"></asp:ListItem>
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold;">
                                            Tasa
                                        </td>
                                        <td style="padding-left: 16px">
                                            <asp:TextBox ID="txtTasa" runat="server" Width="86px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" CssClass="Derecha" Text="0.00"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr id="td_DatosBancarios" style="display: none">
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:CheckBox ID="chkImprimir" runat="server" Text="Imprimir" Font-Bold="True" Style="display: none;" />
                    <asp:Button ID="btnNuevo" runat="server" Text="Limpiar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />
                    <asp:Button ID="btnNotaVenta" runat="server" Text="Nota de Venta" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" Visible="false" />
                    <asp:Button ID="btnAgregarFactura" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" Visible="false" />
                    <asp:Button ID="btnEliminarFactura" runat="server" Text="Eliminar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" Style="display: none;" />
                    <asp:Button ID="btnAgregarLetra" runat="server" Text="Agregar LETRA" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" Style="display: none;" />
                    <asp:Button ID="btnEliminarLetra" runat="server" Text="Eliminar LETRA" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" Style="display: none;" />
                    <asp:Button ID="btnCobranzas" runat="server" Text="Agregar Pagos" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" Style="display: none;" />
                    <asp:Button ID="btnCobranzasEliminar" runat="server" Text="Eliminar Pagos" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" Style="display: none;" />
                    <asp:Button ID="btnGrabar" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />
                </div>
            </div>
            <div style="padding-top: 5px;">
                <table cellpadding="0" cellspacing="0">
                    <tr>
                        <td valign="top">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                FACTURAS | BOLETAS | NOTA DE CREDITO | NOTA DE VENTA | LETRAS POR COBRAR
                            </div>
                            <div>
                                <table width="600px">
                              <%--      <tr align="right">
                                        <td style="font-weight: bold">
                                        </td>
                                        <td style="padding-left: 2px;">
                                            <table>--%>
                                    <tr>
                                        <td>    
                                            <div style="text-align: left; width: 109%; color: Black; font-weight: bold">
                                                Cantidad de registros
                                                <asp:Label ID="lblRegistroCobranza" runat="server" Text="0"></asp:Label>
                                            </div>
                                        </td>
                                        <td style="padding-left: 250px; font-weight: bold">
                                            total Acuenta
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtTotalCobranza" runat="server" Width="112px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                        </td>
                                    </tr>
                                         <%--   </table>
                                        </td>
                                    </tr>--%>
                                </table>
                            </div>
                            <div id="div_grvFacturaCobranzas" style="padding-top: 1px;">
                                <asp:GridView ID="grvFacturaCobranzas" runat="server" AutoGenerateColumns="False"
                                    border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                    Width="600px" OnRowDataBound="grvFacturaCobranzas_RowDataBound">
                                    <Columns>
                                        <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:CheckBox runat="server" ID="chkEditar" CssClass="chkDelete" Text="" onclick="F_EdicionDetalle(this.id, 'C');" />
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Factura" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblFactura" Text='<%# Bind("Factura") %>'  CssClass="detallesart2"></asp:Label>
                                                <asp:HiddenField ID="hfCodFacturaDet" runat="server" Value='<%# Bind("CodFacturaDet") %>' />
                                                <asp:HiddenField ID="hfCodigoFactura" runat="server" Value='<%# Bind("CodigoFactura") %>' />
                                                <asp:HiddenField ID="hfEmision" runat="server" Value='<%# Bind("Emision") %>' />
                                                <asp:HiddenField ID="hfVencimiento" runat="server" Value='<%# Bind("Vencimiento") %>' />
                                                <asp:HiddenField ID="hfTotalFactura" runat="server" Value='<%# Bind("TotalFactura") %>' />
                                                <asp:HiddenField ID="hfSaldo" runat="server" Value='<%# Bind("Saldo") %>' />
                                                <asp:HiddenField ID="hfAcuenta" runat="server" Value='<%# Bind("Acuenta") %>' />
                                                <asp:HiddenField ID="hfCodMoneda" runat="server" Value='<%# Bind("CodMoneda") %>' />
                                                <asp:HiddenField ID="hfMoneda" runat="server" Value='<%# Bind("Moneda") %>' />
                                                <asp:HiddenField ID="hfTC" runat="server" Value='<%# Bind("TC") %>' />
                                                <asp:HiddenField ID="hfSoles" runat="server" Value='0' />
                                                <asp:HiddenField ID="hfDolares" runat="server" Value='0' />
                                                <asp:HiddenField ID="hfCodTipoDoc" runat="server" Value='<%# Bind("CodTipoDoc") %>' />
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Emision" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblEmision" Text='<%# Bind("Emision") %>'></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Vcto" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblVencimiento" Text='<%# Bind("Vencimiento") %>'></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Total" ItemStyle-HorizontalAlign="Right">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblTotal" Text=''></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Saldo" ItemStyle-HorizontalAlign="Right">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblSaldo" Text=''></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Acuenta" ItemStyle-HorizontalAlign="Right">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblAcuenta" Text=''></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Saldo Nuevo" ItemStyle-HorizontalAlign="Right">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblSaldoNuevo" Text='0.00'></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="TC" ItemStyle-HorizontalAlign="Right">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblTC" Text='<%# Bind("TC") %>'></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                    </Columns>
                                </asp:GridView>
                            </div>
                        </td>
                        <td style="padding-left: 5px;" valign="top">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                FACTURAS | NOTA DE CREDITO | LETRAS POR PAGAR
                            </div>
                            <div>
                                <table width="600px">
                                    <%-- <tr align="right">
                                        <td style="font-weight: bold">
                                        </td>
                                        <td style="padding-left: 2px;">
                                            <table>--%>
                                    <tr>
                                        <td>
                                            <div style="text-align: left; width: 109%; color: Black; font-weight: bold">
                                                Cantidad de registros
                                                <asp:Label ID="lblRegistroPagados" runat="server" Text="0"></asp:Label>
                                            </div>
                                        </td>
                                        <td style="padding-left: 250px; font-weight: bold">
                                            total Acuenta
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtTotalDeuda" runat="server" Width="112px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <%-- </table>
                                        </td>
                                    </tr>--%>
                                </table>
                            </div>
                                
                            <div id="div_grvFacturaPagos" style="padding-top: 1px;">
                                <asp:GridView ID="grvFacturaPagos" runat="server" AutoGenerateColumns="False" border="0"
                                    CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="600px"
                                    OnRowDataBound="grvFacturaPagos_RowDataBound">
                                    <Columns>
                                        <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:CheckBox runat="server" ID="chkEditar" CssClass="chkDelete" Text="" onclick="F_EdicionDetalle(this.id, 'P');" />
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Factura" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblFactura" Text='<%# Bind("Factura") %>' CssClass="detallesart3"></asp:Label>
                                                <asp:HiddenField ID="hfCodFacturaDet" runat="server" Value='<%# Bind("CodFacturaDet") %>' />
                                                <asp:HiddenField ID="hfCodigoFactura" runat="server" Value='<%# Bind("CodigoFactura") %>' />
                                                <asp:HiddenField ID="hfEmision" runat="server" Value='<%# Bind("Emision") %>' />
                                                <asp:HiddenField ID="hfVencimiento" runat="server" Value='<%# Bind("Vencimiento") %>' />
                                                <asp:HiddenField ID="hfTotalFactura" runat="server" Value='<%# Bind("TotalFactura") %>' />
                                                <asp:HiddenField ID="hfSaldo" runat="server" Value='<%# Bind("Saldo") %>' />
                                                <asp:HiddenField ID="hfAcuenta" runat="server" Value='<%# Bind("Acuenta") %>' />
                                                <asp:HiddenField ID="hfCodMoneda" runat="server" Value='<%# Bind("CodMoneda") %>' />
                                                <asp:HiddenField ID="hfMoneda" runat="server" Value='<%# Bind("Moneda") %>' />
                                                <asp:HiddenField ID="hfTC" runat="server" Value='<%# Bind("TC") %>' />
                                                <asp:HiddenField ID="hfSoles" runat="server" Value='0' />
                                                <asp:HiddenField ID="hfDolares" runat="server" Value='0' />
                                                <asp:HiddenField ID="hfCodTipoDoc" runat="server" Value='<%# Bind("CodTipoDoc") %>' />
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Emision" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblEmision" Text='<%# Bind("Emision") %>'></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Vcto" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblVencimiento" Text='<%# Bind("Vencimiento") %>'></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Total" ItemStyle-HorizontalAlign="Right">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblTotal" Text=''></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Saldo" ItemStyle-HorizontalAlign="Right">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblSaldo" Text=''></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Acuenta" ItemStyle-HorizontalAlign="Right">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblAcuenta" Text=''></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Saldo Nuevo" ItemStyle-HorizontalAlign="Right">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblSaldoNuevo" Text='0.00'></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="TC" ItemStyle-HorizontalAlign="Right">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblTC" Text='<%# Bind("TC") %>'></asp:Label>
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
        <div id="tabConsulta">
            <div id='divConsulta' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all"
                style="width: 1200px">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    Criterio de busqueda
                </div>
                <div class="ui-jqdialog-content">
                    <table cellpadding="0" cellspacing="0" class="form-inputs">
                        <tbody>
                            <tr>
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
                                    <asp:CheckBox ID="chkNumero" runat="server" Text="Numero" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:TextBox ID="txtNumeroConsulta" runat="server" Width="70" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkCliente" runat="server" Text="Cliente" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:TextBox ID="txtProveedorConsulta" runat="server" Width="400" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold;">
                                    Medio Pago
                                </td>
                                <td>
                                    <div id="div_MedioPagoConsulta">
                                        <asp:DropDownList ID="ddlMedioPagoConsulta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="90">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                                <td style="font-weight: bold">
                                    CAJA
                                </td>
                                <td>
                                    <div id="div_CajaFisicaConsulta">
                                        <asp:DropDownList ID="ddlCajaFisicaConsulta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="115">
                                        </asp:DropDownList>
                                    </div>
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
            <div id="div_consulta" style="padding-top: 5PX;">
                <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" border="0"
                    CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="1200px"
                    OnRowDataBound="grvConsulta_RowDataBound">
                    <Columns>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgEditar" ImageUrl="~/Asset/images/btnEdit.gif"
                                    ToolTip="EDICION COBRANZA" OnClientClick="F_EditarMedioPago(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgAnularDocumento" ImageUrl="~/Asset/images/EliminarBtn.png"
                                    ToolTip="ELIMINAR COBRANZA" OnClientClick="F_AnularPopUP(this); return false;" />
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
                                            <asp:BoundField DataField="Documento" HeaderText="DOCUMENTO">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Center" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Numero" HeaderText="NUMERO">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Center" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Monto" HeaderText="MONTO">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Right" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="OPeracion" HeaderText="OPERACION">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Center" />
                                            </asp:BoundField>
                                        </Columns>
                                    </asp:GridView>
                                </asp:Panel>
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
                        <asp:TemplateField HeaderText="Nro Operacion">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblNroOperacion" Text='<%# Bind("NroOperacion") %>'  ></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Medio" HeaderText="Medio Pago">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Cliente">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblProveedor" Text='<%# Bind("Proveedor") %>' CssClass="detallesart"></asp:Label>
                                <asp:HiddenField ID="hfCodigo" runat="server" Value='<%# Bind("ID") %>' />
                                <asp:HiddenField ID="hfCodMedioPago" runat="server" Value='<%# Bind("CodMedioPago") %>' />
                                <asp:HiddenField ID="hfCodBanco" runat="server" Value='<%# Bind("CodBanco") %>' />
                                <asp:HiddenField ID="hfCodCtaBancaria" runat="server" Value='<%# Bind("CodCtaBancaria") %>' />
                                <asp:HiddenField ID="hfObservacion" runat="server" Value='<%# Bind("ObservacionMedioPago") %>' />
                                <asp:HiddenField ID="hfComision" runat="server" Value='<%# Bind("Comision") %>' />
                                <asp:HiddenField ID="hfCodCajaFisica" runat="server" Value='<%# Bind("CodCajaFisica") %>' />
                                <asp:HiddenField ID="hfCodMoneda" runat="server" Value='<%# Bind("CodMoneda") %>' />
                                <asp:HiddenField ID="hfDetalleCargado" runat="server" Value='0' />
                                <asp:HiddenField ID="hfDetalleCargadoObservacion" runat="server" Value='0' />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Banco">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblBanco" Text='<%# Bind("Banco") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Cuenta">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblCuenta" Text='<%# Bind("Cuenta") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Emision">
                            <ItemStyle HorizontalAlign="Center" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblFecha" Text='<%# Bind("Emision") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Moneda" HeaderText="Moneda">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:BoundField DataField="TC" HeaderText="TC">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Operacion" HeaderText="Ingresado" DataFormatString="{0:N2}">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" BackColor="Cyan" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Cobranza" HeaderText="Cobranza" DataFormatString="{0:N2}">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Deuda" HeaderText="Deuda" DataFormatString="{0:N2}">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Vuelto" HeaderText="Exceso" DataFormatString="{0:N2}">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Responsable" HeaderText="Responsable">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Caja" HeaderText="Caja">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                    </Columns>
                </asp:GridView>
            </div>
        </div>
    </div>
    <div id="divConsultaFactura" style="display: none;">
        <div class="ui-jqdialog-content">
            <table width="360">
                <tr>
                    <td>
                        <asp:Button ID="btnAgregar" runat="server" Text="Agregar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                    </td>
                </tr>
            </table>
        </div>
        <div id="div_grvConsultaFactura" style="padding-top: 5PX;">
        </div>
        <asp:GridView ID="grvConsultaFactura" runat="server" AutoGenerateColumns="False"
            border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
            Width="400">
            <Columns>
                <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                    <ItemTemplate>
                        <asp:CheckBox runat="server" ID="chkOK" CssClass="chkSi" Text="" />
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="ID">
                    <ItemStyle HorizontalAlign="Right" />
                    <ItemTemplate>
                        <asp:Label runat="server" ID="lblCodigo" Text='<%# Bind("Codigo") %>'></asp:Label>
                        <asp:HiddenField ID="hfCodMoneda" runat="server" Value='<%# Bind("CodMoneda") %>' />
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Numero">
                    <ItemStyle HorizontalAlign="Left" />
                    <ItemTemplate>
                        <asp:Label runat="server" ID="lblFactura" Text='<%# Bind("Factura") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Emision">
                    <ItemStyle HorizontalAlign="Center" />
                    <ItemTemplate>
                        <asp:Label runat="server" ID="lblEmision" Text='<%# Bind("Emision") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Soles">
                    <ItemStyle HorizontalAlign="Right" />
                    <ItemTemplate>
                        <asp:Label runat="server" ID="lblSoles" Text='<%# Bind("Soles") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Dolares">
                    <ItemStyle HorizontalAlign="Right" />
                    <ItemTemplate>
                        <asp:Label runat="server" ID="lblDolares" Text='<%# Bind("Dolares") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="TC">
                    <ItemStyle HorizontalAlign="Center" />
                    <ItemTemplate>
                        <asp:Label runat="server" ID="lblTC" Text='<%# Bind("TC") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
            </Columns>
        </asp:GridView>
    </div>
    <div id="div_EdicionMedioPago" style="display: none;">
        <div class="ui-jqdialog-content">
            <table cellpadding="0" cellspacing="0" class="form-inputs">
                <tr>
                    <td style="font-weight: bold">
                        Emision
                    </td>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:TextBox ID="txtEmisionEdicion" runat="server" Width="55px" CssClass="Jq-ui-dtp"
                                        Font-Names="Arial" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold">
                                    CAJA
                                </td>
                                <td style="padding-left: 5px;">
                                    <div id="div_CajaFisicaEdicion">
                                        <asp:DropDownList ID="ddlCajaFisicaEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="115">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                                <td style="font-weight: bold;">
                                    Medio Pago
                                </td>
                                <td>
                                    <div id="div_MedioPagoEdicion">
                                        <asp:DropDownList ID="ddlMedioPagoEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="90">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        Banco
                    </td>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <div id="div_BancoEdicion" style="padding-left: 0px">
                                        <asp:DropDownList ID="ddlBancoEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="156px">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                                <td style="padding-left: 1px; font-weight: bold">
                                    Nro Cta
                                </td>
                                <td style="padding-left: 16px">
                                    <div id="div_CuentaEdicion">
                                        <asp:DropDownList ID="ddlCuentaEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="156px">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 3px; font-weight: bold">
                        Nro Operacion
                    </td>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-left: 2px;" colspan='3'>
                                    <asp:TextBox ID="txtNroOperacionEdicion" runat="server" Width="372px" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 3px; font-weight: bold">
                        Observacion
                    </td>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-left: 2px;" colspan='3'>
                                    <asp:TextBox ID="txtObservacion" runat="server" Width="372px" Height="120px" TextMode="MultiLine"
                                        Font-Names="Arial" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr style="display: none">
                    <td style="padding-left: 3px; font-weight: bold">
                    </td>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:CheckBox ID="chkSComision" runat="server" Text="S/Comision" Checked="True" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkCComision" runat="server" Text="C/Comision" Font-Bold="True" />
                                </td>
                                <td style="padding-left: 3px; font-weight: bold">
                                    Comision
                                </td>
                                <td style="padding-left: 16px;" colspan='3'>
                                    <asp:TextBox ID="txtComision" runat="server" Width="60px" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr align="right">
                    <td colspan="4">
                        <asp:Button ID="btnEdicionMedioPago" runat="server" Text="grabar" Width="120px" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="div_EdicionSaldos" style="display: none;">
        <div class="ui-jqdialog-content">
            <table cellpadding="0" cellspacing="0" class="form-inputs">
                <tr>
                    <td style="font-weight: bold;">
                        Documento
                    </td>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:TextBox ID="txtFacturaEdicion" runat="server" Width="110px" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" Enabled="false"></asp:TextBox>
                                </td>
                                <td style="padding-left: 5px; font-weight: bold">
                                    Monto
                                </td>
                                <td style="padding-left: 38px;">
                                    <asp:TextBox ID="txtTotalFacturaEdicion" runat="server" Width="110px" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" Enabled="false" CssClass="Derecha"></asp:TextBox>
                                </td>
                                <td style="padding-left: 1px; font-weight: bold">
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        Saldo
                    </td>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:TextBox ID="txtSaldoEdicion" runat="server" Width="110px" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" Enabled="false" CssClass="Derecha"></asp:TextBox>
                                </td>
                                <td style="padding-left: 5px; font-weight: bold">
                                    Acuenta
                                </td>
                                <td style="padding-left: 26px">
                                    <asp:TextBox ID="txtAcuentaEdicion" runat="server" Width="110px" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" CssClass="Derecha"></asp:TextBox>
                                </td>
                                <td style="padding-left: 1px; font-weight: bold">
                                    <asp:Label ID="lblMonedaEdicion" runat="server"></asp:Label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        TC
                    </td>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:TextBox ID="txtTCEdicion" runat="server" Width="110px" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Enabled="true" CssClass="Derecha"></asp:TextBox>
                                </td>
                                <td style="padding-left: 5px; font-weight: bold">
                                    Nuevo saldo
                                </td>
                                <td>
                                    <asp:TextBox ID="txtNuevoSaldoEdicion" runat="server" Width="110px" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" Enabled="false" CssClass="Derecha"></asp:TextBox>
                                </td>
                                <td style="padding-left: 1px; font-weight: bold">
                                    <asp:Label ID="lblMonedaEdicion2" runat="server"></asp:Label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr align="right">
                    <td colspan="4">
                        <asp:Button ID="btnGrabarEditar" runat="server" Text="grabar" Width="120px" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" />
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <div id="div_Anulacion" style="display: none;">
        <div class="ui-jqdialog-content">
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td style="font-weight: bold">
                        ¿ PORQUE LO ESTAS ELIMINANDO ?
                    </td>
                  
                </tr>
                <tr>
                  <td>
                           <asp:TextBox ID="txtObservacionAnulacion" runat="server" Width="450px" Font-Names="Arial"
                        ForeColor="Blue" Font-Bold="True" TextMode="MultiLine" Height="80"></asp:TextBox>
                    </td>
                 
                </tr>
                <tr>
                   <td style="font-weight: bold;padding-top:5px;"  align="right">
                        <asp:Button ID="btnAnular" runat="server" Text="ELIMINAR" class="ui-button ui-widget
    ui-state-default ui-corner-all ui-button-text-only" Font-Names="Arial" Font-Bold="True" Width="120" />
                    </td>
                </tr>
            </table>
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
    <input id="hfCodCobranza" type="hidden" value="0" />
    <input id="hfCliente" type="hidden" value="" />
    <input id="hfCodCtaCte" type="hidden" value="0" />
    <input id="hfCodCtaCteConsulta" type="hidden" value="0" />
    <input id="hfCobranzas" type="hidden" value="0" />
    <input id="hfCodigoTemporal" type="hidden" value="0" />
    <input id="hfCodigoTemporalPago" type="hidden" value="0" />
    <input id="hfMoneda" type="hidden" value="0" />
    <input id="hfNotaVenta" type="hidden" value="0" />
    <input id="hfCodFacturaDet" type="hidden" value="" />
    <input id="hfCodMonedaEdicion" type="hidden" value="0" />
    <input id="hfSoles" type="hidden" value="0" />
    <input id="hfDolares" type="hidden" value="0" />
    <input id="hfCodTipoDoc" type="hidden" value="0" />
    <input id="hfCodMedioPagoEdicion" type="hidden" value="0" />
    <input id="hfCodBancoEdicion" type="hidden" value="0" />
    <input id="hfCodCuentaEdicion" type="hidden" value="0" />
    <input id="hfCodCajaFisicaEdicion" type="hidden" value="0" />
    <input id="hfCodTipoDocAnulacion" type="hidden" value="0" />
    <input id="hfCodDocumentoVentaAnulacion" type="hidden" value="0" />
    <input id="hfClienteAnulacion" type="hidden" value="0" />
    <input id="hfNumeroAnulacion" type="hidden" value="0" />
    <input id="hfid" type="hidden" value="0" />
</asp:Content>
