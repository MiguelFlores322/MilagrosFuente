using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;
using System.Transactions;

namespace CapaNegocios
{
    public class DocumentoVentaCabCN
    {
        DocumentoVentaCabCD obj = new DocumentoVentaCabCD();

        public DocumentoVentaCabCE F_COMISIONES_INSERT(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_COMISIONES_INSERT(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public DocumentoVentaCabCE F_ComisionesCab_CERRAR(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_ComisionesCab_CERRAR(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public DocumentoVentaCabCE F_COMISIONESDET_ACTUALIZAR(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_COMISIONESDET_ACTUALIZAR(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public DocumentoVentaCabCE F_TemporalFacturacionDet_Insert(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_TemporalFacturacionDet_Insert(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public DocumentoVentaCabCE F_TemporalFacturacionDetalle_Insert(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_TemporalFacturacionDetalle_Insert(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_TemporalFacturacionDetAlmacenFisico_Insert(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_TemporalFacturacionDetAlmacenFisico_Insert(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public bool F_TemporalFacturacionDet_ActuDesc(int codigo, decimal de1, decimal de2, decimal de3, decimal de4, ref string msgerror)
        {

            try
            {

                return obj.F_TemporalFacturacionDet_ActuDesc(codigo, de1, de2, de3, de4, ref msgerror);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_TemporalFacturacionDetalleAlmacenFisico_Insert(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_TemporalFacturacionDetalleAlmacenFisico_Insert(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_TemporalFacturacionDet_Listar(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_TemporalFacturacionDet_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_COMISIONES_CONSULTA_LOTES(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_COMISIONES_CONSULTA_LOTES(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_TemporalFacturacionDet_Eliminar(int codventa)
        {

            try
            {

                return obj.F_TemporalFacturacionDet_Eliminar(codventa);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_COMISIONESCAB_LISTAR(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_COMISIONESCAB_LISTAR(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool F_TemporalFacturacionDet_ActuCliente(int codigo, int codcliente, decimal de1, decimal de2, decimal de3, decimal de4, ref string msgerror)
        {
            try
            {
                return obj.F_TemporalFacturacionDet_ActuCliente(codigo, codcliente, de1, de2, de3, de4, ref msgerror);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_Validaciones(ref DocumentoVentaCabCE objEntidadBE)
        {
            try
            {

                String XmlDetalle = "";

                foreach (DocumentoVentaDetCE item in objEntidadBE.listaDet)
                {
                    XmlDetalle = XmlDetalle + "<D ";
                    XmlDetalle = XmlDetalle + " CodArticulo = '" + item.CodArticulo + "'";
                    XmlDetalle = XmlDetalle + " Cantidad = '" + item.Cantidad + "'";
                    XmlDetalle = XmlDetalle + " Precio = '" + item.Precio + "'";
                    XmlDetalle = XmlDetalle + " Costo = '" + item.Costo + "'";
                    XmlDetalle = XmlDetalle + " CodUndMedida = '" + item.CodUndMedida + "'";
                    XmlDetalle = XmlDetalle + " CodDetalle = '" + item.CodDetalle + "'";
                    XmlDetalle = XmlDetalle + " OC = '" + item.OC + "'";
                    XmlDetalle = XmlDetalle + " Descripcion = '" + item.Descripcion + "'";
                    XmlDetalle = XmlDetalle + " Acuenta = '" + item.Acuenta + "'";
                    XmlDetalle = XmlDetalle + " AcuentaNv = '" + item.AcuentaNv + "'";
                    XmlDetalle = XmlDetalle + " CodTipoDoc = '" + item.CodTipoDoc + "'";
                    XmlDetalle = XmlDetalle + " CodTipoDocDetalle = '" + item.CodTipoDocDetalle + "'";
                    XmlDetalle = XmlDetalle + " Importe = '" + item.Importe + "'";
                    XmlDetalle = XmlDetalle + " NroItem = '" + item.NroItem + "'";
                    XmlDetalle = XmlDetalle + " />";
                }

                XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";
                XmlDetalle = "<?xml version=" + '\u0022' + "1.0" + '\u0022' + " encoding=" + '\u0022' + "iso-8859-1" + '\u0022' + "?>" + XmlDetalle;

                objEntidadBE.XmlDetalle = XmlDetalle;

                return obj.F_DocumentoVentaCab_Validaciones(ref objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public DocumentoVentaCabCE F_DocumentoVenta_Insert(ref DocumentoVentaCabCE objEntidadBE)
        {
            using (TransactionScope tx = new TransactionScope())
            {
                try
                {
                    var b = obj.F_DocumentoVenta_Insert(ref objEntidadBE);

                    if (b)
                    {
                        TCCorrelativoCE objNum = new TCCorrelativoCE();
                        var num = int.Parse(objEntidadBE.NumeroDoc) + 1;
                        objNum.CodSede = objEntidadBE.CodSede;
                        objNum.CodEmpresa = objEntidadBE.CodEmpresa;
                        objNum.CodTipoDoc = objEntidadBE.CodTipoDoc;
                        objNum.CodUsuario = objEntidadBE.CodUsuario;
                        objNum.NumDoc = "00000000" + num.ToString();
                        objNum.NumDoc = objNum.NumDoc.Substring(objNum.NumDoc.Length - 7);
                        objNum.SerieDoc = objEntidadBE.SerieDoc;

                        objNum = new TCCorrelativoCN().F_TCCorrelativo_Edicion(objNum);
                    }

                    tx.Complete();

                    return objEntidadBE;
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
        }

        public DocumentoVentaCabCE F_DocumentoVentaCab(ref DocumentoVentaCabCE fact, int CodNotaPedido)
        {
            var msgerror = "";
            try
            {
                using (TransactionScope tx = new TransactionScope())
                {
                    //Verificar si existe el documento ya ingresado
                    if (fact.CodDocumentoVenta != 0 || ((!obj.F_FacturacionCab_Validacion(fact.CodEmpresa, fact.CodSede, fact.CodTipoDoc, fact.SerieDoc, fact.NumeroDoc)) | fact.CodDocumentoVentaAnterior != 0))
                    {
                        fact.CodMedioPago = 0;
                        if (fact.CodFormaPago == 1 | fact.CodFormaPago == 6 | fact.CodFormaPago == 7)
                            fact.CodEstado = 12;
                        else
                            fact.CodEstado = 6;
                        fact.FechaCancelacion = null;

                        if (fact.FlagNv == 0) fact.CodDocumentoRef = 0;

                        String XmlDetalle = "";

                        if (fact.NroRuc == "00000000000" | fact.NroRuc == "00000000")
                        {
                            fact.CodEstado = 3;
                        }
                        else
                        {
                            foreach (DocumentoVentaDetCE item in fact.listaDet)
                            {
                                XmlDetalle = XmlDetalle + "<D ";
                                XmlDetalle = XmlDetalle + " CodArticulo = '" + item.CodArticulo + "'";
                                XmlDetalle = XmlDetalle + " Cantidad = '" + item.Cantidad + "'";
                                XmlDetalle = XmlDetalle + " Precio = '" + item.Precio + "'";
                                XmlDetalle = XmlDetalle + " Costo = '" + item.Costo + "'";
                                XmlDetalle = XmlDetalle + " CodUndMedida = '" + item.CodUndMedida + "'";
                                XmlDetalle = XmlDetalle + " CodDetalle = '" + item.CodDetalle + "'";
                                XmlDetalle = XmlDetalle + " OC = '" + item.OC + "'";
                                XmlDetalle = XmlDetalle + " Descripcion = '" + item.Descripcion + "'";
                                XmlDetalle = XmlDetalle + " Acuenta = '" + item.Acuenta + "'";
                                XmlDetalle = XmlDetalle + " AcuentaNv = '" + item.AcuentaNv + "'";
                                XmlDetalle = XmlDetalle + " CodTipoDoc = '" + item.CodTipoDoc + "'";
                                XmlDetalle = XmlDetalle + " CodTipoDocDetalle = '" + item.CodTipoDocDetalle + "'";
                                XmlDetalle = XmlDetalle + " Importe = '" + item.Importe + "'";
                                XmlDetalle = XmlDetalle + " NroItem = '" + item.NroItem + "'";
                                XmlDetalle = XmlDetalle + " />";
                            }
                        }


                        XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";
                        XmlDetalle = "<?xml version=" + '\u0022' + "1.0" + '\u0022' + " encoding=" + '\u0022' + "iso-8859-1" + '\u0022' + "?>" + XmlDetalle;

                        fact.XmlDetalle = XmlDetalle;

                        var inserval = false;

                        if (fact.CodTipoDoc == 16)
                        {
                            inserval = obj.F_DocumentoVenta_Insert(ref fact);
                        }
                        else
                        {
                            inserval = obj.F_DocumentoVenta_Insert_Factura_Boleta(ref fact);
                        }


                        if (fact.NroRuc == "00000000000" | fact.NroRuc == "00000000") { }
                        else
                        {
                            foreach (DocumentoVentaDetCE item in fact.listaDet)
                            {
                                if (item.CodTipoDocDetalle == 16) //NotaVenta
                                {
                                    var detnv = new DocumentoVentaDetCN().F_ObtenerDocumentoDet(item.CodDetalle);
                                    detnv.CantidadEntregada += item.Cantidad;
                                    new DocumentoVentaDetCN().EditarDocumentoDet(detnv);
                                }
                                else if (item.CodTipoDocDetalle == 17) //NotaPedido
                                {
                                    var detnp = new NotaPedidoCabCN().F_NotaPedidoCab_Obtener_Detalle(item.CodDetalle);
                                    detnp.CantidadEntregada += item.Cantidad;
                                    new NotaPedidoCabCN().F_EditarNotaPedidoDet(detnp);
                                }
                            }


                            if (inserval && fact.FlagVistaPrevia == 0)
                            {
                                if (CodNotaPedido > 0) new NotaPedidoCabCN().F_NotaPedido_AtenderFactura(CodNotaPedido, fact.CodDocumentoVenta, fact.FechaEmision);

                                TCCorrelativoCE objNum = new TCCorrelativoCE();

                                //Incrementear el correlativo
                                var num = int.Parse(fact.NumeroDoc) + 1;
                                objNum.CodSede = fact.CodSede;
                                objNum.CodEmpresa = fact.CodEmpresa;
                                objNum.CodTipoDoc = fact.CodTipoDoc;
                                objNum.CodUsuario = fact.CodUsuario;
                                objNum.NumDoc = "00000000" + num.ToString();
                                objNum.NumDoc = objNum.NumDoc.Substring(objNum.NumDoc.Length - 8);
                                objNum.SerieDoc = fact.SerieDoc;

                                if (fact.CodDocumentoVentaAnterior == 0)
                                    objNum = new TCCorrelativoCN().F_TCCorrelativo_Edicion(objNum);

                                var guia = new TrasladosCabCE();

                                if (fact.FlagGuia == 1)
                                {
                                    guia.CodSede = fact.CodSede;
                                    guia.CodEmpresa = fact.CodEmpresa;
                                    guia.SerieDoc = fact.SerieGuia;
                                    guia.NumeroDoc = fact.NumeroGuia;
                                    guia.FechaEmision = fact.FechaEmision;
                                    guia.FechaTraslado = fact.FechaTraslado;
                                    guia.CodEstado = 5;
                                    guia.CodTipoOperacion = fact.CodTipoOperacion;
                                    guia.CodCtaCte = fact.CodCliente;
                                    guia.Partida = fact.Partida;
                                    guia.Destino = fact.Destino;
                                    guia.CodMotivoTraslado = 1;
                                    guia.CodDocumentoVenta = fact.CodDocumentoVenta;
                                    guia.Cliente = fact.Cliente;
                                    guia.CodUsuario = fact.CodUsuario;
                                    guia.CodTransportista = fact.CodTransportista;
                                    guia.Marca = fact.Marca;
                                    guia.Licencia = fact.Licencia;
                                    guia.NroBultos = fact.NroBultos;
                                    guia.Peso = fact.Peso;
                                    guia.DireccionTrans = fact.DireccionTransportista;
                                    guia.CodTipoDoc = 10;
                                    guia.CodAlmacenFisico = fact.CodAlmacenFisico;
                                    guia.CodDireccion = fact.CodDireccion;
                                    guia.CodDireccionTransportista = fact.CodDireccionTransportista;
                                    guia.CodDepartamentoTransportista = fact.CodDepartamentotransportista;
                                    guia.CodDistritoTransportista = fact.CodDistritoTransportista;
                                    guia.CodProvinciaTransportista = fact.CodProvinciaTransportista;
                                    guia.NroRucTranspostista = fact.NroRucTranspostista;

                                    XmlDetalle = "";
                                    foreach (DocumentoVentaDetCE item in fact.listaDet)
                                    {
                                        XmlDetalle = XmlDetalle + "<D ";
                                        XmlDetalle = XmlDetalle + " CodProducto = '" + item.CodArticulo + "'";
                                        XmlDetalle = XmlDetalle + " Cantidad = '" + item.Cantidad + "'";
                                        XmlDetalle = XmlDetalle + " CantidadEntrante = '" + item.Cantidad + "'";
                                        XmlDetalle = XmlDetalle + " CodUndMedida = '" + item.CodUndMedida + "'";
                                        XmlDetalle = XmlDetalle + " Costo = '" + item.Costo + "'";
                                        XmlDetalle = XmlDetalle + " Precio = '" + item.Precio + "'";
                                        XmlDetalle = XmlDetalle + " Descripcion = '" + item.Descripcion + "'";
                                        XmlDetalle = XmlDetalle + " CodDepartamento = '0'";
                                        XmlDetalle = XmlDetalle + " />";
                                    }

                                    XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";
                                    XmlDetalle = "<?xml version=" + '\u0022' + "1.0" + '\u0022' + " encoding=" + '\u0022' + "iso-8859-1" + '\u0022' + "?>" + XmlDetalle;

                                    guia.XmlDetalle = XmlDetalle;

                                    guia = new TrasladosCabCN().F_Traslados_Insert(guia);

                                    obj.F_DocumentoVenta_Edit_Traslado(fact.CodDocumentoVenta, guia.CodTraslado);

                                    //Incrementear el correlativo //hay que estar pilas aca
                                    num = int.Parse(guia.NumeroDoc) + 1;
                                    objNum.CodTipoDoc = guia.CodTipoDoc;
                                    objNum.SerieDoc = fact.SerieGuia;
                                    objNum.NumDoc = "00000000" + num.ToString();
                                    objNum.NumDoc = objNum.NumDoc.Substring(objNum.NumDoc.Length - 8);

                                    objNum = new TCCorrelativoCN().F_TCCorrelativo_Edicion(objNum);
                                }

                                if (fact.FlagNv == 0) //Si NO ES una factura que viene de Nota de Venta
                                {
                                    //Obtener el correlativo para NotaSalida
                                    objNum.CodTipoDoc = 11;
                                    objNum.FlagNotaSalida = 0;
                                    objNum.CodAlmacenFisico = fact.CodAlmacenFisico;
                                    objNum = new TCCorrelativoCN().F_TCCorrelativoAlmacenFisico_Select(objNum);

                                    var movsal = new NotaIngresoSalidaCabCE();

                                    movsal.CodTipoOperacion = fact.CodTipoOperacion;
                                    movsal.CodTipoDoc = 11;
                                    movsal.SerieDoc = objNum.SerieDoc;
                                    movsal.NumeroDoc = objNum.NumDoc;
                                    movsal.CodAlmacen = fact.CodSede;
                                    movsal.CodTipoDocSust = fact.CodTipoDoc;
                                    movsal.SerieDocSust = fact.SerieDoc;
                                    movsal.NumeroDocSust = fact.NumeroDoc;
                                    movsal.FechaIngreso = fact.FechaEmision;
                                    movsal.CodUsuario = fact.CodUsuario;
                                    movsal.CodEstado = fact.CodEstado;
                                    movsal.CodMoneda = fact.CodMoneda;
                                    movsal.CodCtaCte = fact.CodCliente;
                                    movsal.CodEmpresa = fact.CodEmpresa;
                                    movsal.ImpSubTotal = fact.SubTotal;
                                    movsal.ImpIGV = fact.Igv;
                                    movsal.Total = fact.Total;
                                    movsal.FechaEmision = fact.FechaEmision;
                                    movsal.Vencimiento = fact.FechaVencimiento;
                                    movsal.FlagPercepcion = 0;
                                    movsal.Afecto = 0;
                                    movsal.Documento = "";
                                    movsal.CodTasa = fact.CodTasa;
                                    movsal.CodTraslado = guia.CodTraslado;
                                    movsal.CodAlmacenFisico = guia.CodAlmacenFisico;
                                    movsal.TipoCambio = fact.TipoCambio;
                                    movsal.CodDocumentoVenta = fact.CodDocumentoVenta;
                                    movsal.CodNotaIngresoSalida = 0;
                                    if (guia.CodAlmacenFisico == 0)
                                        movsal.CodAlmacenFisico = fact.CodAlmacenFisico;
                                    if (fact.FlagGuia == 1)
                                    {
                                        movsal.CodTipoDocAnexo = 10;
                                        movsal.SerieDocAnexo = fact.SerieGuia;
                                        movsal.NumeroDocAnexo = fact.NumeroGuia;
                                        movsal.FechaAnexo = fact.FechaTraslado;
                                    }
                                    else
                                    {

                                        movsal.SerieDocAnexo = null;
                                        movsal.NumeroDocAnexo = null;

                                    }

                                    XmlDetalle = "";
                                    foreach (DocumentoVentaDetCE item in fact.listaDet)
                                    {
                                        XmlDetalle = XmlDetalle + "<D ";
                                        XmlDetalle = XmlDetalle + " CodArticulo = '" + item.CodArticulo + "'";
                                        XmlDetalle = XmlDetalle + " Cantidad = '" + item.Cantidad + "'";
                                        XmlDetalle = XmlDetalle + " CodUndMedida = '" + item.CodUndMedida + "'";
                                        XmlDetalle = XmlDetalle + " CostoProducto = '" + item.Costo + "'";
                                        XmlDetalle = XmlDetalle + " Precio = '" + item.Precio + "'";
                                        XmlDetalle = XmlDetalle + " CostoDescontado = '" + item.Costo + "'";
                                        XmlDetalle = XmlDetalle + " CantidadEntregada = '" + item.Cantidad + "'";
                                        XmlDetalle = XmlDetalle + " OC = ''";
                                        XmlDetalle = XmlDetalle + " CodDetalleOC = '0'";
                                        XmlDetalle = XmlDetalle + " CodTemporal = '0'";
                                        XmlDetalle = XmlDetalle + " />";
                                    }

                                    XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";
                                    XmlDetalle = "<?xml version=" + '\u0022' + "1.0" + '\u0022' + " encoding=" + '\u0022' + "iso-8859-1" + '\u0022' + "?>" + XmlDetalle;
                                    movsal.XmlDetalle = XmlDetalle;

                                    movsal = new NotaIngresoSalidaCabCN().F_NotaIngresoSalida_Insert(movsal);

                                    //Incrementear el correlativo
                                    num = int.Parse(objNum.NumDoc) + 1;
                                    objNum.NumDoc = "00000000" + num.ToString();
                                    objNum.NumDoc = objNum.NumDoc.Substring(objNum.NumDoc.Length - 8);

                                    objNum = new TCCorrelativoCN().F_TCCorrelativoFisico_Edicion(objNum);
                                }
                            }

                        }



                        msgerror = "Se Grabo Correctamente";
                        tx.Complete();
                    }
                    else
                    {
                        msgerror = "El documento se encuentra registrado";
                    }
                }
                fact.MsgError = msgerror;
                return fact;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_Insert(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_Insert(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_Insert_Factura_NV(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_Insert_Factura_NV(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_Insert_Factura_NONV(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_Insert_Factura_NONV(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_Listar(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_Anulacion(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_Anulacion(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_TemporalCodigoFacturaCab_Insert(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_TemporalCodigoFacturaCab_Insert(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_TemporalCodigoFacturaDet_Insert(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_TemporalCodigoFacturaDet_Insert(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_TemporalCodigoFacturaDet_Listar(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_TemporalCodigoFacturaDet_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_ConsultaCobranzas(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_ConsultaCobranzas(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_ConsultaCobranzas_Temporal_Edicion(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_ConsultaCobranzas_Temporal_Edicion(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_Cobranzas_RegistroCobranzas(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_Cobranzas_RegistroCobranzas(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_Cobranzas_RegistroCobranzas_Letras(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_Cobranzas_RegistroCobranzas_Letras(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_Cobranzas_Listar(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_Cobranzas_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_Cobranzas_Anulacion(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_Cobranzas_Anulacion(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_OperacionNC_Listar()
        {
            try
            {
                return obj.F_OperacionNC_Listar();

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_Impresion(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_Impresion(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_Impresion_NotaCredito(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_Impresion_NotaCredito(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_ImpresionVistaPreviaNP(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_ImpresionVistaPreviaNP(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_FacturaRetenciones(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_FacturaRetenciones(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_Retenciones_Insert(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_Retenciones_Insert(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_AnulacionRetencion(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_AnulacionRetencion(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_FacturacionNV(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_FacturacionNV(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_DevolucionNV(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_DevolucionNV(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_OCXFacturar(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_OCXFacturar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_DevolucionOC(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_DevolucionOC(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_Cobranzas_Reporte(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_Cobranzas_Reporte(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_ListarXCodigo(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_ListarXCodigo(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_DocumentoVentaDet_InsertTemporal(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaDet_InsertTemporal(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public bool F_DocumentoVentaDet_InsertTemporalVarios(string codfacturas, ref int codigo)
        {

            try
            {

                return obj.F_DocumentoVentaDet_InsertTemporalVarios(codfacturas, ref codigo);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public DataTable F_DocumentoVentaCab_ListarXCodigo_NotaCredito(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_ListarXCodigo_NotaCredito(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_NotaCredito_Insert(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_NotaCredito_Insert(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_DocumentoVentaCab_VentasDiarias(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_VentasDiarias(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_VentasUnidades(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_LGProductos_VentasUnidades(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_Ventas(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_Ventas(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_Letras(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_Letras(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_Comisiones_Listar(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_Comisiones_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_Vendedores_Listar(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_Vendedores_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_Eliminacion(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_Eliminacion(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_Comisiones_Insert(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_Comisiones_Insert(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_ConsultaCobranzas_NotaVenta(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_ConsultaCobranzas_NotaVenta(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_ComprobanteCaja_Eliminar(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_ComprobanteCaja_Eliminar(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public DocumentoVentaCabCE F_ComprobanteCaja_Anulacion(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_ComprobanteCaja_Anulacion(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_NVXFacturar(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_NVXFacturar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_Anulacion_NotaCredito(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_Anulacion_NotaCredito(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_Eliminacion_NotaCredito(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_Eliminacion_NotaCredito(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public DocumentoVentaCabCE F_CajaChica_Insertar(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_CajaChica_Insertar(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public DataTable F_CajaChicaDetalle_Reporte(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_CajaChicaDetalle_Reporte(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_CajaChica_Regenerar(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_CajaChica_Regenerar(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public DataTable F_OrdenCompra_Venta_Historial(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_OrdenCompra_Venta_Historial(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_HistorialVentaSunat(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_HistorialVentaSunat(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_CajaChica_Detalle(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_CajaChica_Detalle(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_Insert_NV_OC(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_Insert_NV_OC(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_CajaChicaDocumento_ListarFactura(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_CajaChicaDocumento_ListarFactura(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_CajaChica_Insertar_Liquidacion(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_CajaChica_Insertar_Liquidacion(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public DataTable F_CajaChicaDocumento_ComprobanteCancelacion(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_CajaChicaDocumento_ComprobanteCancelacion(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_ComprobanteCancelacion(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_ComprobanteCancelacion(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_ControlInternoAlmacenCab_IMPRESION(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_ControlInternoAlmacenCab_IMPRESION(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_ControlInternoAlmacenCab_Listar(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_ControlInternoAlmacenCab_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_NotaPedidoCab_Obtener(int codNotaPedido)
        {
            NotaPedidoCabCN obj = new NotaPedidoCabCN();
            var objProf = new DocumentoVentaCabCE();
            try
            {
                var dtcon = obj.F_NotaPedidoCab_ListarXCodigo(codNotaPedido);

                if (dtcon.Rows.Count > 0)
                {
                    objProf.CodCliente = Convert.ToInt32(dtcon.Rows[0]["CodCtaCte"].ToString());
                    objProf.CodEmpresa = Convert.ToInt32(dtcon.Rows[0]["CodEmpresa"].ToString());
                    objProf.CodSede = Convert.ToInt32(dtcon.Rows[0]["CodSede"].ToString());
                    objProf.FechaEmision = Convert.ToDateTime(dtcon.Rows[0]["FechaEmision"].ToString());
                    objProf.FechaVencimiento = Convert.ToDateTime(dtcon.Rows[0]["Vencimiento"].ToString());
                    objProf.CodMoneda = Convert.ToInt32(dtcon.Rows[0]["CodMoneda"].ToString());
                    objProf.SubTotal = Convert.ToDecimal(dtcon.Rows[0]["SubTotal"].ToString());
                    objProf.Igv = Convert.ToDecimal(dtcon.Rows[0]["Igv"].ToString());
                    objProf.Total = Convert.ToDecimal(dtcon.Rows[0]["Total"].ToString());
                    objProf.RazonSocial = dtcon.Rows[0]["RazonSocial"].ToString();
                    objProf.Empresa = dtcon.Rows[0]["Empresa"].ToString();
                    objProf.CodTasa = Convert.ToInt32(dtcon.Rows[0]["CodTasa"].ToString());
                    objProf.TipoCambio = Convert.ToDecimal(dtcon.Rows[0]["TipoCambio"].ToString());
                    objProf.Direccion = dtcon.Rows[0]["Direccion"].ToString();
                    objProf.CodDistrito = Convert.ToInt32(dtcon.Rows[0]["CodDistrito"].ToString());
                    objProf.CodProvincia = Convert.ToInt32(dtcon.Rows[0]["CodProvincia"].ToString());
                    objProf.CodDepartamento = Convert.ToInt32(dtcon.Rows[0]["CodDepartamento"].ToString());
                    objProf.Distrito = dtcon.Rows[0]["Distrito"].ToString();
                    objProf.NroRuc = dtcon.Rows[0]["NroRuc"].ToString();
                    objProf.NotaVenta = Convert.ToBoolean(dtcon.Rows[0]["NotaVenta"]);
                    objProf.CodDocumentoVenta = codNotaPedido;
                    objProf.Saldo = 0;
                    objProf.Acuenta = 0;
                    objProf.CodTransportista = Convert.ToInt32(dtcon.Rows[0]["CodTransportista"].ToString());
                    objProf.CodFormaPago = Convert.ToInt32(dtcon.Rows[0]["CodFormaPago"].ToString());
                    objProf.DireccionTransportista = dtcon.Rows[0]["DireccionTrans"].ToString();
                    objProf.Transportista = dtcon.Rows[0]["Transportista"].ToString();
                    objProf.NroBultos = Convert.ToString(dtcon.Rows[0]["Bultos"].ToString());
                    objProf.CodVendedor = Convert.ToInt32(dtcon.Rows[0]["CodVendedor"]);
                    objProf.CodAlmacenFisico = Convert.ToInt32(dtcon.Rows[0]["CodAlmacenFisico"]);
                }
                objProf.listaDet = new List<DocumentoVentaDetCE>();

                var dtdet = obj.F_NotaPedidoDet_SelectxCodigo(codNotaPedido);
                var de = new DocumentoVentaDetCE();

                foreach (DataRow fila in dtdet.Rows)
                {
                    de = new DocumentoVentaDetCE();
                    de.CodDetDocumentoVenta = 0;//Convert.ToInt32(fila["ID"].ToString());
                    //  de.Acuenta = Convert.ToDecimal(fila["Acuenta"].ToString());
                    de.CodArticulo = Convert.ToInt32(fila["CodProducto"].ToString());
                    de.NroItem = Convert.ToInt32(fila["NroItem"].ToString());
                    de.CodDetalle = Convert.ToInt32(fila["ID"].ToString());
                    de.CodigoProducto = fila["Codigo"].ToString();
                    de.Descripcion = fila["Descripcion"].ToString();
                    de.Producto = fila["Descripcion"].ToString();
                    de.Cantidad = Convert.ToDecimal(fila["Cantidad"].ToString());
                    de.Precio = Convert.ToDecimal(fila["Precio"].ToString());
                    de.Importe = Convert.ToDecimal(fila["Importe"].ToString());
                    de.Costo = Convert.ToDecimal(fila["Costo"].ToString());
                    de.UM = fila["UM"].ToString();
                    de.CodUndMedida = Convert.ToInt32(fila["CodUnidadVenta"].ToString());
                    de.CodigoSuperior = fila["CodigoSuperior"].ToString();
                    de.OC = fila["OC"].ToString();
                    de.CodTipoDocDetalle = 17;
                    objProf.listaDet.Add(de);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return objProf;
        }

        public DocumentoVentaCabCE F_NotaVentaCab_Obtener(int codNotaVenta, int codTipoDoc)
        {
            DocumentoVentaCabCD obj = new DocumentoVentaCabCD();
            var objProf = new DocumentoVentaCabCE();
            objProf.CodTipoDoc = codTipoDoc;
            objProf.CodDocumentoVenta = codNotaVenta;
            try
            {
                var dtcon = obj.F_DocumentoVentaCab_ListarXCodigo(objProf);
                objProf.CodCliente = Convert.ToInt32(dtcon.Rows[0]["CodCtaCte"].ToString());
                objProf.CodEmpresa = Convert.ToInt32(dtcon.Rows[0]["CodEmpresa"].ToString());
                objProf.CodSede = Convert.ToInt32(dtcon.Rows[0]["CodSede"].ToString());
                objProf.FechaEmision = Convert.ToDateTime(dtcon.Rows[0]["FechaEmision"].ToString());
                objProf.FechaVencimiento = Convert.ToDateTime(dtcon.Rows[0]["FechaVencimiento"].ToString());
                objProf.CodMoneda = Convert.ToInt32(dtcon.Rows[0]["CodMoneda"].ToString());
                objProf.SubTotal = Convert.ToDecimal(dtcon.Rows[0]["SubTotal"].ToString());
                objProf.Igv = Convert.ToDecimal(dtcon.Rows[0]["Igv"].ToString());
                objProf.Total = Convert.ToDecimal(dtcon.Rows[0]["Total"].ToString());
                objProf.RazonSocial = dtcon.Rows[0]["RazonSocial"].ToString();
                objProf.Empresa = dtcon.Rows[0]["Empresa"].ToString();
                objProf.CodTasa = Convert.ToInt32(dtcon.Rows[0]["CodTasa"].ToString());
                objProf.TipoCambio = Convert.ToDecimal(dtcon.Rows[0]["TipoCambio"].ToString());
                objProf.Direccion = dtcon.Rows[0]["Direccion"].ToString();
                objProf.CodDistrito = Convert.ToInt32(dtcon.Rows[0]["CodDistrito"].ToString());
                objProf.CodProvincia = Convert.ToInt32(dtcon.Rows[0]["CodProvincia"].ToString());
                objProf.CodDepartamento = Convert.ToInt32(dtcon.Rows[0]["CodDepartamento"].ToString());
                objProf.CodFormaPago = Convert.ToInt32(dtcon.Rows[0]["CodFormaPago"].ToString());
                objProf.Distrito = dtcon.Rows[0]["Distrito"].ToString();
                objProf.NroRuc = dtcon.Rows[0]["NroRuc"].ToString();
                objProf.Saldo = Convert.ToDecimal(dtcon.Rows[0]["Saldo"].ToString());
                objProf.CodVendedor = Convert.ToInt32(dtcon.Rows[0]["CodVendedor"].ToString());
                objProf.Observacion2 = Convert.ToString(dtcon.Rows[0]["Observacion2"].ToString());
                objProf.CodTipoDoc = Convert.ToInt32(dtcon.Rows[0]["CodTipoDoc"].ToString());
                objProf.CodTransportista=Convert.ToInt32(dtcon.Rows[0]["CodTransportista"].ToString());
                objProf.Placa = Convert.ToString(dtcon.Rows[0]["Placa"].ToString());
                objProf.Licencia = Convert.ToString(dtcon.Rows[0]["Licencia"].ToString());
                objProf.NroBultos = Convert.ToString(dtcon.Rows[0]["NroBultos"].ToString());
                objProf.Peso = Convert.ToString(dtcon.Rows[0]["Peso"].ToString());
                objProf.Marca = Convert.ToString(dtcon.Rows[0]["Marca"].ToString());
                objProf.NroOperacion = Convert.ToString(dtcon.Rows[0]["NroOperacion"].ToString());
                objProf.NroRucTranspostista = Convert.ToString(dtcon.Rows[0]["NroRucTransportista"].ToString());
                objProf.RazonSocialTransportista = Convert.ToString(dtcon.Rows[0]["RazonSocialtransportista"].ToString());
                objProf.CodDireccionTransportista = Convert.ToInt32(dtcon.Rows[0]["CodDireccionTransportista"].ToString());
                objProf.Celular = Convert.ToString(dtcon.Rows[0]["CELULAR"].ToString());
                objProf.Correo = Convert.ToString(dtcon.Rows[0]["CORREO"].ToString());
                try { objProf.FlagIncluyeIgv = Convert.ToInt32(dtcon.Rows[0]["FlagIncluyeIgv"].ToString()); }
                catch (Exception xxxx) { }

                objProf.listaDet = new List<DocumentoVentaDetCE>();

                var dtdet = obj.F_DocumentoVentaDet_ListarXCodigo(codNotaVenta, codTipoDoc);
                var de = new DocumentoVentaDetCE();

                foreach (DataRow fila in dtdet.Rows)
                {
                    de = new DocumentoVentaDetCE();
                    de.CodDetalle = Convert.ToInt32(fila["CodDetDocumentoVenta"].ToString());
                    de.CodArticulo = Convert.ToInt32(fila["CodProducto"].ToString());
                    de.CodigoProducto = fila["Codigo"].ToString();
                    de.Producto = fila["Descripcion"].ToString();
                    de.Cantidad = Convert.ToDecimal(fila["Cantidad"].ToString());
                    de.Faltante = Convert.ToDecimal(fila["Faltante"].ToString());
                    de.CostoProductoSoles = Convert.ToDecimal(fila["CostoProductoSoles"].ToString());
                    de.UM = fila["UM"].ToString();
                    de.Precio = Convert.ToDecimal(fila["Precio"].ToString());
                    de.Importe = Convert.ToDecimal(fila["Importe"].ToString());
                    de.Acuenta = Convert.ToDecimal(fila["Acuenta"].ToString());
                    de.CodTipoDoc = 0;
                    de.NroItem = Convert.ToInt32(fila["NroItem"]);
                    de.Costo = Convert.ToDecimal(fila["Costo"].ToString());
                    de.OC = fila["OC"].ToString(); //Documento de ref
                    de.CodDetalleOC = 0;
                    de.CodUM = Convert.ToInt32(fila["CodUndMedida"].ToString());
                    de.stock = Convert.ToDecimal(fila["stock"].ToString());
                    objProf.CodDocumentoVenta = Convert.ToInt32(fila["CodDocumentoVenta"]);
                    objProf.listaDet.Add(de);

                    //dta_consultadetalle.Columns.Add("CodDetalle", typeof(string));
                    //dta_consultadetalle.Columns.Add("CodArticulo", typeof(string));
                    //dta_consultadetalle.Columns.Add("CodigoProducto", typeof(string));
                    //dta_consultadetalle.Columns.Add("Producto", typeof(string));
                    //dta_consultadetalle.Columns.Add("Cantidad", typeof(string));
                    //dta_consultadetalle.Columns.Add("UM", typeof(string));
                    //dta_consultadetalle.Columns.Add("Precio", typeof(string));
                    //dta_consultadetalle.Columns.Add("Importe", typeof(string));
                    //dta_consultadetalle.Columns.Add("Acuenta", typeof(string));
                    //dta_consultadetalle.Columns.Add("CodTipoDoc", typeof(string));
                    //dta_consultadetalle.Columns.Add("NroItem", typeof(string));
                    //dta_consultadetalle.Columns.Add("Costo", typeof(string));
                    //dta_consultadetalle.Columns.Add("OC", typeof(string));
                    //dta_consultadetalle.Columns.Add("CodDetalleOC", typeof(string));
                    //dta_consultadetalle.Columns.Add("CodUM", typeof(string));
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return objProf;
        }

        public DataTable F_NotaVentaCab_Consultar(int codempresa, int codsede, string serie = "", string numero = "", string razonsocial = "")
        {

            try
            {
                return obj.F_NotaVentaCab_Consultar(codempresa, codsede, serie, numero, razonsocial);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool F_FacturacionCab_ElimiVistaPrevia(int codNotaVenta)
        {
            bool venta = false;
            try
            {
                venta = obj.F_FacturacionCab_ElimiVistaPrevia(codNotaVenta);
                return venta;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool F_FacturacionCab_ActuVistaPrevia(int codNotaVenta)
        {
            bool venta = false;
            try
            {
                venta = obj.F_FacturacionCab_ActuVistaPrevia(codNotaVenta);
                return venta;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_DocumentoVenta_Edit(DocumentoVentaCabCE objEntidadBE)
        {
            using (TransactionScope tx = new TransactionScope())
            {
                try
                {
                    var b = obj.F_DocumentoVenta_Edit(objEntidadBE);
                    if (b) tx.Complete();

                    return objEntidadBE;
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
        }

        public DataTable F_DocumentoVentaCab_Comisiones(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_Comisiones(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_NOTAPEDIDO_PEDIENTEFACTURACION()
        {
            try
            {
                return obj.F_NOTAPEDIDO_PEDIENTEFACTURACION();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_Cobranzas_Reporte_Cobrados(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_Cobranzas_Reporte_Cobrados(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_NotaPedidoDet_ListarAprobados(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_NotaPedidoDet_ListarAprobados(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_NotaPedidoDespachos_Listar(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_NotaPedidoDespachos_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_NotaPedidoCerrados_Listar(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_NotaPedidoCerrados_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_PROCEDIMIENTO_TRASLADAR(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_PROCEDIMIENTO_TRASLADAR(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_PROCEDIMIENTO(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_PROCEDIMIENTO(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_PROCEDIMIENTO2(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_PROCEDIMIENTO2(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_LetrasCab_Protesto(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_LetrasCab_Protesto(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_DocumentoVenta_Insert_Protesto(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVenta_Insert_Protesto(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_MovimientoCaja_REPORTE(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_MovimientoCaja_REPORTE(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DOCUMENTOVENTACAB_REPORTECOBRANZARESUMIDO(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DOCUMENTOVENTACAB_REPORTECOBRANZARESUMIDO(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_Impresion_Factura_Electronica(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_Impresion_Factura_Electronica(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_ReenvioMail(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_ReenvioMail(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_RegistroVentas_Excel(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_RegistroVentas_Excel(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_RegistroVentas_Proformas_Excel(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_RegistroVentas_Proformas_Excel(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_ListaPreciosExcel_ACTUALIZARPRODUCTOS(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_ListaPreciosExcel_ACTUALIZARPRODUCTOS(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_TCDireccion_LISTARXCLIENTE(int CodCtaCte)
        {
            try
            {
                return obj.F_TCDireccion_LISTARXCLIENTE(CodCtaCte);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_DocumentoVentaCab_VERIFICARNC(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_VERIFICARNC(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_NotaIngresoSalidaCab_VERIFICARNC(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_NotaIngresoSalidaCab_VERIFICARNC(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool F_DocumentoVentaCab_FlagImpresionServicio(int CodDocumentoVenta, string IP, string Impresora, string FormatoReporte)
        {
            var retorno = false;
            using (TransactionScope tx = new TransactionScope())
            {
                try
                {

                    retorno = obj.F_DocumentoVentaCab_FlagImpresionServicio(CodDocumentoVenta, IP, Impresora, FormatoReporte);

                    tx.Complete();
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
            return retorno;
        }
        //NUEVOS
        public DataTable F_ListaPreciosExcel_VALIDACIONES_NUEVOS(long IdExcel)
        {
            try
            {
                return obj.F_ListaPreciosExcel_VALIDACIONES_NUEVOS(IdExcel);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //ELIMINADOS
        public DataTable F_ListaPreciosExcel_VALIDACIONES_ELIMINADOS(long IdExcel)
        {
            try
            {
                return obj.F_ListaPreciosExcel_VALIDACIONES_ELIMINADOS(IdExcel);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        

        public DataTable F_DocumentoVentaCab_Comisiones_Resumen_Listar(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaCab_Comisiones_Resumen_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DOCUMENTOVENTACAB_COMISIONES_DETALLE(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DOCUMENTOVENTACAB_COMISIONES_DETALLE(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_COMISIONESDET_LISTAR(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_COMISIONESDET_LISTAR(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_COMISIONESCAB_ELIMINAR(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_COMISIONESCAB_ELIMINAR(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable PA_DeudasClientes_Letras(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.PA_DeudasClientes_Letras(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_TEMPORALFACTURACIONDET_ACTUALIZAR_MAYORISTAS(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_TEMPORALFACTURACIONDET_ACTUALIZAR_MAYORISTAS(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public DataTable F_DocumentoVentaCab_Impresion_Factura_Electronica_STICKER(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaCab_Impresion_Factura_Electronica_STICKER(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public DataTable F_DOCUMENTOVENTACAB_VENTAS_CONTABILIDAD_MILAGROS(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DOCUMENTOVENTACAB_VENTAS_CONTABILIDAD_MILAGROS(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public Cobranzas F_Pagos_Edicion_MedioPago(Cobranzas objEntidadBE)
        {
            try
            {
                return obj.F_Pagos_Edicion_MedioPago(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_TemporalCodigoCobranzaPagoDet_Listar(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_TemporalCodigoCobranzaPagoDet_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_TemporalCodigoCobranzasCab_Insert(FiltroCobranzas objEntidadBE)
        {

            try
            {

                return obj.F_TemporalCodigoCobranzasCab_Insert(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public Cobranzas F_Cobranzas_Edicion_MedioPago(Cobranzas objEntidadBE)
        {
            try
            {
                return obj.F_Cobranzas_Edicion_MedioPago(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DOCUMENTO_INVENTARIO_UNIDADES_FISICAS(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DOCUMENTO_INVENTARIO_UNIDADES_FISICAS(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DOCUMENTO_INVENTARIO_VALORIZADO(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DOCUMENTO_INVENTARIO_VALORIZADO(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DOCUMENTO_INVENTARIO_VALORIZADO_ALM(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DOCUMENTO_INVENTARIO_VALORIZADO_ALM(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DOCUMENTO_INVENTARIO_UNIDADES_FISICAS_ALM(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_DOCUMENTO_INVENTARIO_UNIDADES_FISICAS_ALM(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        // grafico
        public DataTable F_GRAFICO_ESTADISTICO_NET(int GraficoDesde, int GraficoHasta)
        {
            try
            {
                return obj.F_GRAFICO_ESTADISTICO_NET(GraficoDesde, GraficoHasta);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_ListaPreciosMilagrosExcel_ACTUALIZARPRODUCTOS(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_ListaPreciosMilagrosExcel_ACTUALIZARPRODUCTOS(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_ListaPreciosMilagrosExcel_ACTUALIZARPRODUCTOS_PASCANA(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_ListaPreciosMilagrosExcel_ACTUALIZARPRODUCTOS_PASCANA(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_DocumentoVentaCab_Ventas_Medio_pago(DocumentoVentaCabCE objEntidadVenta)
        {
            try
            {
                return obj.F_DocumentoVentaCab_Ventas_Medio_pago(objEntidadVenta);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaCabCE F_Tst_ArchivoCDR_FactElectronica(DocumentoVentaCabCE objEntidadBE)
        {

            try
            {
                objEntidadBE.ArchivoCDR = "NO HA SIDO PROCESADO";
                DataTable dtArchivoCDR = obj.F_Tst_ArchivoCDR_FactElectronica(objEntidadBE);
                if (dtArchivoCDR.Rows.Count > 0)
                    objEntidadBE.ArchivoCDR = dtArchivoCDR.Rows[0]["Archivo"].ToString();
                return objEntidadBE;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
