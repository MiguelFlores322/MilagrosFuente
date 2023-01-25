using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
    public class MaestraCN
    {
        MaestraCD obj = new MaestraCD();
        public string ObtenerValor(int codMaestraDet)
        {
            var valor = "";
            valor = obj.ObtenerValor(codMaestraDet);
            return valor;
        }

        public DataTable Listar()
        {
            DataTable dta_consulta = null;
            dta_consulta = obj.Listar();
            return dta_consulta;
        }

        public DataTable ListarDetalle(int codMaestra)
        {
            DataTable dta_consulta = null;
            dta_consulta = obj.ListarDetalle(codMaestra);
            return dta_consulta;
        }

        public bool EditarDetalle(MaestraDetalleCE obje)
        {
            bool retorno = false;
            retorno = obj.EditarDetalle(obje);
            return retorno;
        }

    }
}
