using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
    public class TCEmpresaCN
    {
        TCEmpresaCD obj = new TCEmpresaCD();
        public DataTable Listar()
        {
            DataTable dta_consulta = null;
            dta_consulta = obj.Listar();
            return dta_consulta;
        }

        public TCEmpresaCE F_TCEmpresa_Insert(TCEmpresaCE objEntidadBE)
        {
            try
            {

                return obj.F_TCEmpresa_Insert(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public TCEmpresaCE F_TCEmpresa_Update(TCEmpresaCE objEntidadBE)
        {
            try
            {

                return obj.F_TCEmpresa_Update(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public DataTable F_TCEmpresa_Listar(TCEmpresaCE objEntidadBE)
        {

            try
            {

                return obj.F_TCEmpresa_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public bool F_EliminarImagen_Temporal(int ID_TemporalImagen, out string str_mensaje_operacion)
        {
            return obj.F_EliminarImagen_Temporal(ID_TemporalImagen, out str_mensaje_operacion);
        }

        public string F_ConsultarUltimaImagenTemp(out string str_mensaje_operacion)
        {
            return obj.F_ConsultarUltimaImagenTemp(out str_mensaje_operacion);
        }

        public bool F_AgregarImagen(TCEmpresaCE objEntidadCE)
        {
            return obj.F_AgregarImagen(objEntidadCE);
        }



        public DataTable F_DatosDocumento_Descarga(int CodDocumentoVenta)
        {

            try
            {

                return obj.F_DatosDocumento_Descarga(CodDocumentoVenta);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public string RutaFacturadorPorCodEmpresa(int CodEmpresa)
        {
            string Ruta = "";

            try
            {
                Ruta = obj.F_RutaFacturadorPorCodEmpresa(CodEmpresa).Rows[0][0].ToString();
            }
            catch (Exception ex) { }

            return Ruta;
        }

    }
}
