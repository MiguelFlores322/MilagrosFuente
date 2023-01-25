using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;
namespace CapaNegocios
{
    public class ProformaCabCN
    {
        ProformaCabCD obj = new ProformaCabCD();

        public ProformaCabCE F_Proformas_Insert(ProformaCabCE objEntidadBE)
        {
            try
            {

                return obj.F_Proformas_Insert(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_ProformaCab_VistaPreliminar(ProformaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_ProformaCab_VistaPreliminar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_ProformaCab_Select(ProformaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_ProformaCab_Select(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_ProformaCab_Select_Detalle(int codprof)
        {

            try
            {

                return obj.F_ProformaCab_Select_Detalle(codprof);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_ProformaCab_ListarXCodigo(int codProf)
        {
            try
            {
                return obj.F_ProformaCab_ListarXCodigo(codProf);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public ProformaCabCE F_ProformaDet_InsertTemporal(ProformaCabCE objEntidadBE)
        {
            try
            {

                return obj.F_ProformaDet_InsertTemporal(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public ProformaCabCE F_ProformaCab_Anulacion(ProformaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_ProformaCab_Anulacion(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_ProformaCab_Consultar(int codsede, string serie = "", string numero = "", string referencia = "")
        {
            try
            {
                return obj.F_ProformaCab_Consultar(codsede, serie, numero, referencia);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_ProformaCab_Consultar2( DateTime Desde , DateTime Hasta,int codsede, string serie = "", string numero = "", int CodCtaCte = 0)
        {
            try
            {
                return obj.F_ProformaCab_Consultar2(Desde, Hasta,codsede, serie, numero, CodCtaCte);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public ProformaCabCE F_ProformaCab_Obtener(int codproforma)
        {
            var objProf = new ProformaCabCE();
            try
            {

                var dtcon = obj.F_ProformaCab_ListarXCodigo(codproforma);
                objProf.CodCtaCte = Convert.ToInt32(dtcon.Rows[0]["CodCtaCte"].ToString());
                objProf.CodEmpresa = Convert.ToInt32(dtcon.Rows[0]["CodEmpresa"].ToString());
                objProf.CodSede = Convert.ToInt32(dtcon.Rows[0]["CodSede"].ToString());
                objProf.Serie = dtcon.Rows[0]["Serie"].ToString();
                objProf.Numero = dtcon.Rows[0]["Numero"].ToString();
                objProf.FechaEmision = Convert.ToDateTime( dtcon.Rows[0]["FechaEmision"].ToString());
                objProf.Vencimiento = Convert.ToDateTime(dtcon.Rows[0]["Vencimiento"].ToString());
                objProf.CodMoneda = Convert.ToInt32(dtcon.Rows[0]["CodMoneda"].ToString());
                objProf.Atencion = dtcon.Rows[0]["Atencion"].ToString();
                objProf.Referencia = dtcon.Rows[0]["Referencia"].ToString();
                objProf.SubTotal = Convert.ToDecimal(dtcon.Rows[0]["SubTotal"].ToString());
                objProf.Igv = Convert.ToDecimal(dtcon.Rows[0]["Igv"].ToString());
                objProf.Total = Convert.ToDecimal(dtcon.Rows[0]["Total"].ToString());
                objProf.ListaProformaDet = new List<Proformadet>();

                var dtdet = obj.F_ProformaCab_Select_Detalle(codproforma);
                var de = new Proformadet();

                foreach (DataRow fila in dtdet.Rows)
                {
                    de = new Proformadet();
                    de.CodDetalleProforma = Convert.ToInt32(fila["ID"].ToString());
                    de.CodArticulo = Convert.ToInt32(fila["CodProducto"].ToString());
                    de.CodigoProducto = fila["Codigo"].ToString();
                    de.Descripcion = fila["Descripcion"].ToString();
                    de.Cantidad = Convert.ToDecimal(fila["Cantidad"].ToString());
                    de.Precio = Convert.ToDecimal(fila["Precio"].ToString());
                    de.Importe = Convert.ToDecimal(fila["Importe"].ToString());
                    de.UM = fila["UM"].ToString();
                    objProf.ListaProformaDet.Add(de);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return objProf;
        }

        public DataTable F_DocumentoVentaCab_Consulta_Proforma(int CodSede, string Serie, string Numero, int CodCliente,DateTime Desde,DateTime Hasta)
        {
            try
            {
                return obj.F_DocumentoVentaCab_Consulta_Proforma(CodSede, Serie, Numero, CodCliente, Desde,Hasta);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public DataTable F_NotaIngresoSalidaCab_IMPRESION_TICKET(ProformaCabCE objEntidadBE)
        {
            try
            {
                return obj.F_NotaIngresoSalidaCab_IMPRESION_TICKET(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
    }
}
