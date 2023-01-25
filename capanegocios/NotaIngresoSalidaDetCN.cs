using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;


namespace CapaNegocios
{
  public class NotaIngresoSalidaDetCN
    {
      NotaIngresoSalidaDetCD obj = new NotaIngresoSalidaDetCD();

        public DataTable F_NotaIngresoSalidaDet_Select(NotaIngresoSalidaDetCE objEntidadBE)
        {

            try
            {

                return obj.F_NotaIngresoSalidaDet_Select(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_NotaIngresoSalidaDet_NotaPedido(NotaIngresoSalidaDetCE objEntidadBE)
        {

            try
            {

                return obj.F_NotaIngresoSalidaDet_NotaPedido(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_NotaIngresoSalidaDet_Select_OC(NotaIngresoSalidaDetCE objEntidadBE)
        {

            try
            {

                return obj.F_NotaIngresoSalidaDet_Select_OC(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LISTAPRECIOSMILAGROSEXCEL_Select_NUEVO(NotaIngresoSalidaDetCE objEntidadBE)
        {

            try
            {

                return obj.F_LISTAPRECIOSMILAGROSEXCEL_Select_NUEVO(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable pa_LISTAPRECIOSMILAGROSEXCEL_Select_ELIMINADOS(NotaIngresoSalidaDetCE objEntidadBE)
        {

            try
            {

                return obj.pa_LISTAPRECIOSMILAGROSEXCEL_Select_ELIMINADOS(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaDet_Select_GuiaExterna(NotaIngresoSalidaDetCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaDet_Select_GuiaExterna(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public String F_DocumentoVentaDet_Select_GuiaExterna_Faltantes(NotaIngresoSalidaDetCE objEntidadBE)
        {

            try
            {
                String Faltantes = "";
                DataTable dtFaltantes = obj.F_DocumentoVentaDet_Select_GuiaExterna_Faltantes(objEntidadBE);

                foreach (DataRow r in dtFaltantes.Rows) {
                    string Codigo = r["Codigo"].ToString();
                    string descripcion = r["Producto"].ToString();
                    Faltantes = Faltantes + Codigo + ", ";
                }

                return Faltantes;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        
    }
}
