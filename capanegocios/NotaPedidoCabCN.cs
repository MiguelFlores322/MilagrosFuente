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
    public class NotaPedidoCabCN
    {

        NotaPedidoCD objCN = new NotaPedidoCD();
        public NotaPedidoCabCE F_ProformaCab_Obtener(int codproforma)
        {
            ProformaCabCD obj = new ProformaCabCD();
            var objProf = new NotaPedidoCabCE();
            try
            {

                var dtcon = obj.F_ProformaCab_ListarXCodigo(codproforma);
                objProf.CodCtaCte = Convert.ToInt32(dtcon.Rows[0]["CodCtaCte"].ToString());
                objProf.CodEmpresa = Convert.ToInt32(dtcon.Rows[0]["CodEmpresa"].ToString());

                objProf.CodSede = Convert.ToInt32(dtcon.Rows[0]["CodSede"].ToString());
                objProf.Serie = dtcon.Rows[0]["Serie"].ToString();
                objProf.Numero = dtcon.Rows[0]["Numero"].ToString();
                objProf.FechaEmision = Convert.ToDateTime(dtcon.Rows[0]["FechaEmision"].ToString());
                objProf.Vencimiento = Convert.ToDateTime(dtcon.Rows[0]["Vencimiento"].ToString());
                objProf.CodMoneda = Convert.ToInt32(dtcon.Rows[0]["CodMoneda"].ToString());
                objProf.Atencion = dtcon.Rows[0]["Atencion"].ToString();
                objProf.Referencia = dtcon.Rows[0]["Referencia"].ToString();
                objProf.SubTotal = Convert.ToDecimal(dtcon.Rows[0]["SubTotal"].ToString());
                objProf.Igv = Convert.ToDecimal(dtcon.Rows[0]["Igv"].ToString());
                objProf.Total = Convert.ToDecimal(dtcon.Rows[0]["Total"].ToString());
                objProf.RazonSocial = dtcon.Rows[0]["RazonSocial"].ToString();
                objProf.Empresa = dtcon.Rows[0]["Empresa"].ToString();
                objProf.CodTasa = Convert.ToInt32(dtcon.Rows[0]["CodTasa"].ToString());
                objProf.TipoCambio = Convert.ToDecimal(dtcon.Rows[0]["TipoCambio"].ToString());
                objProf.Descuento1 = Convert.ToDecimal(dtcon.Rows[0]["Descuento1"].ToString());
                objProf.Descuento2 = Convert.ToDecimal(dtcon.Rows[0]["Descuento2"].ToString());
                objProf.Descuento3 = Convert.ToDecimal(dtcon.Rows[0]["Descuento3"].ToString());

                objProf.ListaNotaPedidoDet = new List<NotaPedidoDetCE>();

                var dtdet = obj.F_ProformaCab_Select_Detalle(codproforma);
                var de = new NotaPedidoDetCE();

                foreach (DataRow fila in dtdet.Rows)
                {
                    de = new NotaPedidoDetCE();
                    de.CodDetalleNotaPedido = 0;//Convert.ToInt32(fila["ID"].ToString());
                    de.CodDetalle = 0;// Convert.ToInt32(fila["ID"].ToString());
                    de.CodArticulo = Convert.ToInt32(fila["CodProducto"].ToString());
                    de.CodigoProducto = fila["Codigo"].ToString();
                    de.Descripcion = fila["Descripcion"].ToString();
                    de.Producto = fila["Descripcion"].ToString();
                    de.Cantidad = Convert.ToDecimal(fila["Cantidad"].ToString());
                    de.Precio = Convert.ToDecimal(fila["Precio"].ToString());
                    de.PrecioOrig = Convert.ToDecimal(fila["PrecioOrig"].ToString());
                    de.Importe = Convert.ToDecimal(fila["Importe"].ToString());
                    de.UM = fila["UM"].ToString();
                    de.Descuento1 = "0.00 %";
                    de.Descuento2 = "0.00 %";
                    objProf.ListaNotaPedidoDet.Add(de);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return objProf;
        }

        public NotaPedidoCabCE F_NotaPedidoCab_Obtener(int codnotapedido)
        {
            var objNt = new NotaPedidoCabCE();
            try
            {
                var dtcon = objCN.F_NotaPedidoCab_ListarXCodigo(codnotapedido);
                objNt.CodCtaCte = Convert.ToInt32(dtcon.Rows[0]["CodCtaCte"].ToString());
                objNt.CodEmpresa = Convert.ToInt32(dtcon.Rows[0]["CodEmpresa"].ToString());
                objNt.CodSede = Convert.ToInt32(dtcon.Rows[0]["CodSede"].ToString());
                objNt.Serie = dtcon.Rows[0]["Serie"].ToString();
                objNt.Numero = dtcon.Rows[0]["Numero"].ToString();
                objNt.FechaEmision = Convert.ToDateTime(dtcon.Rows[0]["FechaEmision"].ToString());
                objNt.Vencimiento = Convert.ToDateTime(dtcon.Rows[0]["Vencimiento"].ToString());
                objNt.CodMoneda = Convert.ToInt32(dtcon.Rows[0]["CodMoneda"].ToString());
                objNt.Atencion = dtcon.Rows[0]["Atencion"].ToString();
                objNt.Referencia = dtcon.Rows[0]["Referencia"].ToString();
                objNt.SubTotal = Convert.ToDecimal(dtcon.Rows[0]["SubTotal"].ToString());
                objNt.Igv = Convert.ToDecimal(dtcon.Rows[0]["Igv"].ToString());
                objNt.Total = Convert.ToDecimal(dtcon.Rows[0]["Total"].ToString());
                objNt.RazonSocial = dtcon.Rows[0]["RazonSocial"].ToString();
                objNt.Empresa = dtcon.Rows[0]["Empresa"].ToString();
                objNt.CodTasa = Convert.ToInt32(dtcon.Rows[0]["CodTasa"].ToString());
                objNt.TipoCambio = Convert.ToDecimal(dtcon.Rows[0]["TipoCambio"].ToString());
                objNt.Descuento1 = Convert.ToDecimal(dtcon.Rows[0]["Descuento1"].ToString());
                objNt.Descuento2 = Convert.ToDecimal(dtcon.Rows[0]["Descuento2"].ToString());
                objNt.Descuento3 = Convert.ToDecimal(dtcon.Rows[0]["Descuento3"].ToString());
                objNt.Descuento4 = Convert.ToDecimal(dtcon.Rows[0]["Descuento4"].ToString());
                objNt.CodVenApr  = Convert.ToInt32(dtcon.Rows[0]["CodVendAprobado"].ToString());
                objNt.CodVenCerr = Convert.ToInt32(dtcon.Rows[0]["CodVendCerrado"].ToString());
                objNt.CodVenPre  = Convert.ToInt32(dtcon.Rows[0]["CodVendPreparado"].ToString());
                objNt.CodEstado  = Convert.ToInt32(dtcon.Rows[0]["CodEstado"].ToString());
                objNt.CodTipoDoc = Convert.ToInt32(dtcon.Rows[0]["CodTipoDoc"].ToString());
                objNt.Bultos = Convert.ToInt32(dtcon.Rows[0]["Bultos"].ToString());
                objNt.ValIgv = dtcon.Rows[0].IsNull("ValIgv") ? (decimal?) null : (decimal?) dtcon.Rows[0]["ValIgv"];
                objNt.NotaVenta = Convert.ToBoolean(dtcon.Rows[0]["NotaVenta"]);
                objNt.NroRuc = dtcon.Rows[0]["NroRuc"].ToString();
                objNt.Direccion = dtcon.Rows[0]["Direccion"].ToString();
                objNt.CodAlmacenFisico = Convert.ToInt32(dtcon.Rows[0]["CodAlmacenFisico"].ToString());
                try { objNt.DespachoFecha = Convert.ToDateTime(dtcon.Rows[0]["DespachoFecha"].ToString()); }
                catch (Exception EXXX) { }
                objNt.DespachoFechaStr = dtcon.Rows[0]["DespachoFechaStr"].ToString();
                objNt.DespachoChofer = dtcon.Rows[0]["DespachoChofer"].ToString();
                objNt.DespachoNroGuias = dtcon.Rows[0]["DespachoNroGuias"].ToString();
                objNt.DespachoNroBultos = dtcon.Rows[0]["DespachoNroBultos"].ToString();
                objNt.DespachoObservacion = dtcon.Rows[0]["DespachoObservacion"].ToString();
                try { objNt.DespachoCodTransportista = Convert.ToInt32(dtcon.Rows[0]["DespachoCodTransportista"].ToString()); }
                catch (Exception EXXX) { }
                objNt.DespachoTransportista = dtcon.Rows[0]["DespachoTransportista"].ToString();
                try { objNt.DespachoCodUsuario = Convert.ToInt32(dtcon.Rows[0]["DespachoCodUsuario"].ToString()); }
                catch (Exception EXXX) { }
                objNt.DespachoUsuario = dtcon.Rows[0]["DespachoUsuario"].ToString();
                try { objNt.DespachoFechaRegistro = Convert.ToDateTime(dtcon.Rows[0]["DespachoFechaRegistro"].ToString()); }
                catch (Exception EXXX) { }
                objNt.DespachoFechaRegistroStr = dtcon.Rows[0]["DespachoFechaRegistroStr"].ToString();

                objNt.ListaNotaPedidoDet = new List<NotaPedidoDetCE>();

                var dtdet = objCN.F_NotaPedidoCab_Select_Detalle(codnotapedido);
                var de = new NotaPedidoDetCE();

                foreach (DataRow fila in dtdet.Rows)
                {
                    de = new NotaPedidoDetCE();
                    de.CodDetalleNotaPedido = Convert.ToInt32(fila["ID"].ToString());
                    de.CodDetalle = Convert.ToInt32(fila["ID"].ToString());
                    de.CodArticulo = Convert.ToInt32(fila["CodProducto"].ToString());
                    de.CodigoProducto = fila["Codigo"].ToString();
                    de.Descripcion = fila["Descripcion"].ToString();
                    de.Producto = fila["Descripcion"].ToString();
                    de.Cantidad = Convert.ToDecimal(fila["Cantidad"].ToString());
                    de.Precio = Convert.ToDecimal(fila["Precio"].ToString());
                    de.PrecioOrig = Convert.ToDecimal(fila["PrecioOrig"].ToString());
                    de.Importe = Convert.ToDecimal(fila["Importe"].ToString());
                    de.Descuento1 = fila["Descuento1"].ToString();
                    de.Descuento2 = fila["Descuento2"].ToString();
                    de.Descuento3 = fila["Descuento3"].ToString();
                    de.Descuento4 = fila["Descuento4"].ToString();
                    de.UM = fila["UM"].ToString();
                    de.NroItem = Convert.ToInt32(fila["NroItem"].ToString());
                    de.Acuenta = 0;
                    de.CodDetalleOC =0;
                    de.CodTipoDoc = 0;
                    objNt.ListaNotaPedidoDet.Add(de);                     
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return objNt;
        }

        public bool F_NotaPedido_Insert(NotaPedidoCabCE objEntidadBE)
        {
            var retorno = false;
            using (TransactionScope tx = new TransactionScope())
            {
                try
                {
                    if (objEntidadBE.CodVenCerr != 0)
                    {
                        objEntidadBE.CodEstado = 8;
                    }
                    else if (objEntidadBE.CodVenApr != 0)
                    {
                        objEntidadBE.CodEstado = 15;
                    }
                    else if (objEntidadBE.CodVenPre != 0)
                    {
                        objEntidadBE.CodEstado = 4;
                    }

                    retorno = objCN.F_NotaPedido_Insert(objEntidadBE);

                    if (retorno)
                    {
                        TCCorrelativoCE objNum = new TCCorrelativoCE();
                        var num = int.Parse(objEntidadBE.Numero) + 1;
                        objNum.CodSede = objEntidadBE.CodSede;
                        objNum.CodEmpresa = objEntidadBE.CodEmpresa;
                        objNum.CodTipoDoc = 17;
                        objNum.CodUsuario = objEntidadBE.CodUsuario;
                        objNum.NumDoc = "00000000" + num.ToString();
                        objNum.NumDoc = objNum.NumDoc.Substring(objNum.NumDoc.Length - 7);
                        objNum.SerieDoc = objEntidadBE.Serie;

                        objNum = new TCCorrelativoCN().F_TCCorrelativo_Edicion(objNum);
                    }

                    tx.Complete();
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
            return retorno;
        }

        public bool F_NotaPedido_TemporalInsert(NotaPedidoCabCE objEntidadBE)
        {
            var retorno = false;
            using (TransactionScope tx = new TransactionScope())
            {
                try
                {

                    retorno = objCN.F_NotaPedido_Insert(objEntidadBE);

                    tx.Complete();
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
            return retorno;
        }

        /// <summary>
        /// Procedimiento para insertar en la tabla TemporalFacturacionCab y 
        /// TemporalFacturacionDet, las lineas del detalle de la NP, con el 
        /// fin de cuando se vaya a generar la visualización, no seta lento
        /// </summary>
        /// <param name="objEntidadBE"></param>
        /// <returns></returns>
        public bool F_NotaPedidoCab_TemporalInsert(Int32 CodNotaPedido, Int32 CodTemporalBorrar, 
                                                    Int32 MaxRows, out Int32 CodigoNuevo)
        {
            var retorno = false;
            using (TransactionScope tx = new TransactionScope())
            {
                try
                {

                    retorno = objCN.F_NotaPedidoCab_TemporalInsert(CodNotaPedido, CodTemporalBorrar, MaxRows,
                                                                     out CodigoNuevo);

                    tx.Complete();
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
            return retorno;
        }

        public bool F_NotaPedidoDet_TemporalEliminar(Int32 CodDocumentoVenta, Int32 CodDetalle)
        {
            var retorno = false;
            using (TransactionScope tx = new TransactionScope())
            {
                try
                {

                    retorno = objCN.F_NotaPedidoDet_EliminarTemporal(CodDocumentoVenta, CodDetalle);

                    tx.Complete();
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
            return retorno;
        }

        public bool F_NotaPedidoDet_TemporalUpdate(NotaPedidoDetCE ObjEntidad)
        {
            var retorno = false;
            using (TransactionScope tx = new TransactionScope())
            {
                try
                {

                    retorno = objCN.F_NotaPedidoDet_TemporalUpdate(ObjEntidad);

                    tx.Complete();
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
            return retorno;
        }



        public bool F_NotaPedido_Editar(NotaPedidoCabCE objEntidadBE)
        {
            var retorno = false;
            using (TransactionScope tx = new TransactionScope())
            {
                try
                {
                    var numerar = objEntidadBE.CodEstado == 14 ? true : false;

                    //if (objEntidadBE.CodVenCerr != 0)
                    //{
                    //    objEntidadBE.CodEstado = 8;
                    //}
                    //else if (objEntidadBE.CodVenApr != 0)
                    //{
                    //    objEntidadBE.CodEstado = 15;
                    //}
                    //else if (objEntidadBE.CodVenPre != 0)
                    //{
                    //    objEntidadBE.CodEstado = 4;
                    //}

                    retorno = objCN.F_NotaPedido_Editar(objEntidadBE);

                    //if (numerar)
                    //{
                    //    TCCorrelativoCE objNum = new TCCorrelativoCE();
                    //    var num = int.Parse(objEntidadBE.Numero) + 1;
                    //    objNum.CodSede = objEntidadBE.CodSede;
                    //    objNum.CodEmpresa = objEntidadBE.CodEmpresa;
                    //    objNum.CodTipoDoc = 17;
                    //    objNum.CodUsuario = objEntidadBE.CodUsuario;
                    //    objNum.NumDoc = "00000000" + num.ToString();
                    //    objNum.NumDoc = objNum.NumDoc.Substring(objNum.NumDoc.Length - 7);
                    //    objNum.SerieDoc = objEntidadBE.Serie;

                    //    objNum = new TCCorrelativoCN().F_TCCorrelativo_Edicion(objNum);
                    //}

                    if (retorno) tx.Complete();
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
            return retorno;
        }



        public DataTable F_NotaPedido_Select(NotaPedidoCabCE objEntidadBE)
        {
            try
            {
                return objCN.F_NotaPedido_Select(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public DataTable F_NotaPedidoCab_VistaPreliminar(NotaPedidoCabCE objEntidadBE)
        {

            try
            {

                return objCN.F_NotaPedidoCab_VistaPreliminar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_NotaPedidoCab_VistaPreliminar_Stickers(NotaPedidoCabCE objEntidadBE)
        {

            try
            {

                return objCN.F_NotaPedidoCab_VistaPreliminar_Stickers(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public NotaPedidoCabCE F_NotaPedidoCab_Anulacion(NotaPedidoCabCE objEntidadBE)
        {
            try
            {
                return objCN.F_NotaPedidoCab_Anulacion(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_NotaPedidoCab_Consultar(int codempresa, int codsede, int CodTipoDoc, string serie = "", string numero = "", string referencia = "")
        {

            try
            {
                return objCN.F_NotaPedidoCab_Consultar(codempresa, codsede, CodTipoDoc, serie, numero, referencia);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_NotaPedidoCab_ListarXCodigo(int codNotaPedido)
        {
            try
            {
                return objCN.F_NotaPedidoCab_ListarXCodigo(codNotaPedido);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public DataTable F_NotaPedidoCab_Select_Detalle(int codNotaPedido)
        {
            try
            {
                return objCN.F_NotaPedidoCab_Select_Detalle(codNotaPedido);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public DataTable F_NotaPedidoDet_SelectxCodigo(int codNotaPedido)
        {
            try
            {
                return objCN.F_NotaPedidoDet_SelectxCodigo(codNotaPedido);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public bool F_NotaPedido_AtenderFactura(int codNotaPedido, int codNotaVenta, DateTime fechaFacturacion)
        {
            try
            {
                return objCN.F_NotaPedido_AtenderFactura(codNotaPedido, codNotaVenta, fechaFacturacion);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public NotaPedidoDetCE F_NotaPedidoCab_Obtener_Detalle(int codnpdet)
        {

            try
            {
                return objCN.F_NotaPedidoCab_Obtener_Detalle(codnpdet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool F_EditarNotaPedidoDet(NotaPedidoDetCE obj)
        {

            try
            {
                return objCN.F_EditarNotaPedidoDet(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool F_NotaPedidoCerrar(int codNotaPedido, DateTime fechaCierre, int codVendedor, int CodEstado, int CodVendPreparado, int CodVendAprobado, int CodTransportista, int CodUsuarioCredito)
        {

            try
            {
                return objCN.F_NotaPedidoCerrar(codNotaPedido, fechaCierre, codVendedor, CodEstado, CodVendPreparado, CodVendAprobado, CodTransportista, CodUsuarioCredito);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool F_ActualizarDespacho(int CodNotaPedido, DateTime DespachoFecha,  string DespachoChofer,  string DespachoNroGuias,  
                string DespachoNroBultos,  string DespachoObservacion,  int DespachoCodTransportista,  int CodEstado,  int DespachoCodUsuario)
        {

            try
            {
                return objCN.F_ActualizarDespacho(CodNotaPedido, DespachoFecha, DespachoChofer, DespachoNroGuias,
                                                DespachoNroBultos, DespachoObservacion, DespachoCodTransportista, CodEstado, DespachoCodUsuario);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public bool F_NotaPedido_FlagImpresionServicio(int CodNotaPedido, string IP, string Impresora, string FormatoReporte)
        {
            var retorno = false;
            using (TransactionScope tx = new TransactionScope())
            {
                try
                {

                    retorno = objCN.F_NotaPedido_FlagImpresionServicio(CodNotaPedido, IP, Impresora, FormatoReporte);

                    tx.Complete();
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
            return retorno;
        }

    }
}
