using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
    public class CajaFisicaCN
    {
        CajaFisicaCD obj = new CajaFisicaCD();

        public DataTable F_dtCajaFisica_Listar(int CodEstado, int CodAlmacen, int CodEmpresa)
        {
            try
            {
                return obj.F_CajaFisica_Listar(CodEstado, CodAlmacen, CodEmpresa);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }



        public List<CajaFisicaCE> F_CajaFisica_Listar(int CodEstado, int Opcional)
        {
            try
            {
                DataTable dtDatos = obj.F_CajaFisica_Listar(CodEstado,0,0);
                List<CajaFisicaCE> lDatos = new List<CajaFisicaCE>();

                if (Opcional == 1)
                    lDatos.Add(new CajaFisicaCE()
                    {
                        CodCajaFisica = 0,
                        Descripcion = "--SELECCIONE--",
                    });

                foreach (DataRow r in dtDatos.Rows)
                {
                    lDatos.Add(new CajaFisicaCE()
                    {
                        CodCajaFisica = Convert.ToInt32(r["CodCajaFisica"].ToString()),
                        Descripcion = r["Descripcion"].ToString(),
                    });
                }

                return lDatos;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }



        public List<CajaFisicaCE> F_CajaFisica_Listar(int CodEstado, int Opcional, int CodEmpresa)
        {
            try
            {
                DataTable dtDatos = obj.F_CajaFisica_Listar(CodEstado, 0, CodEmpresa);
                List<CajaFisicaCE> lDatos = new List<CajaFisicaCE>();

                if (Opcional == 1)
                    lDatos.Add(new CajaFisicaCE()
                    {
                        CodCajaFisica = 0,
                        Descripcion = "--SELECCIONE--",
                    });

                foreach (DataRow r in dtDatos.Rows)
                {
                    lDatos.Add(new CajaFisicaCE()
                    {
                        CodCajaFisica = Convert.ToInt32(r["CodCajaFisica"].ToString()),
                        Descripcion = r["Descripcion"].ToString(),
                    });
                }

                return lDatos;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

    }
}
