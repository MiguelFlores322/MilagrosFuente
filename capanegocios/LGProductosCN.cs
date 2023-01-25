using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;


namespace CapaNegocios
{
 public   class LGProductosCN
    {
        LGProductosCD obj = new LGProductosCD();

        public DataTable F_LGProductos_Select_Ventas(LGProductosCE objEntidadBE)
        {

            try
            {

                return obj.F_LGProductos_Select_Ventas(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_Select(LGProductosCE objEntidadBE)
        {

            try
            {

                return obj.F_LGProductos_Select(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public LGProductosCE F_LGProductos_Insert(LGProductosCE objEntidadBE)
        {
            try
            {

                return obj.F_LGProductos_Insert(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public LGProductosCE F_LGProductos_Insert_Milagros(LGProductosCE objEntidadBE)
        {
            try
            {

                return obj.F_LGProductos_Insert_Milagros(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
     
        public LGProductosCE F_LGProductos_Update(LGProductosCE objEntidadBE)
        {
            try
            {

                return obj.F_LGProductos_Update(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public LGProductosCE F_LGProductos_Update_Milagros(LGProductosCE objEntidadBE)
        {
            try
            {

                return obj.F_LGProductos_Update_Milagros(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public LGProductosCE F_LGProductos_Eliminar(LGProductosCE objEntidadBE)
        {
            try
            {

                return obj.F_LGProductos_Eliminar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_Listar(LGProductosCE objEntidadBE)
        {

            try
            {

                return obj.F_LGProductos_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_Listar_Mantenimiento(LGProductosCE objEntidadBE)
        {

            try
            {

                return obj.F_LGProductos_Listar_Mantenimiento(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_Listar_Mantenimiento_Milagros(LGProductosCE objEntidadBE)
        {

            try
            {

                return obj.F_LGProductos_Listar_Mantenimiento_Milagros(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public List<LGProductosCE> F_LGProductos_Listar_Mantenimiento_Milagros2(LGProductosCE objFiltro)
        {

            DataRow rr = null;
            string paso = "";
            try
            {
                DataTable dta_Consulta = F_LGProductos_Listar_Mantenimiento_Milagros(objFiltro);

                List<LGProductosCE> lConsulta = new List<LGProductosCE>();

                foreach (DataRow r in dta_Consulta.Rows)
                {
                    rr = r;
                    LGProductosCE producto = new LGProductosCE();
                    producto.ID = Convert.ToInt32(r["ID"].ToString());
                    producto.CodProducto = Convert.ToInt32(r["ID"].ToString());

                    producto.CodigoProducto = r["CODIGO"].ToString();
                    paso = "100";
                    producto.DscProducto = r["DESCRIPCION"].ToString();
                    paso = "200";
                    producto.FlagBloqueoMayorista = Convert.ToInt32(r["FlagBloqueoMayorista"].ToString());
                    paso = "200";
                    
                    producto.CostoUniOriginal = Convert.ToDecimal(r["CostoUniProducto"].ToString());

                    producto.MargenMayoristaPorcentaje = r["MargenMayorista"].ToString();
                    producto.PrecioMayorista = Convert.ToDecimal(r["PrecioMayorista"].ToString());
                    producto.MargenPorcentaje = r["margen"].ToString();
                    producto.Precio = Convert.ToDecimal(r["precio"].ToString());

                    producto.MargenPorcentaje = r["Margen"].ToString();

                    producto.Acontenedores = Convert.ToDecimal(r["StockActual"].ToString());

                    

                    
                    producto.UM = r["UM"].ToString();
                    paso = "300";
              
                    producto.Estado = r["ESTADO"].ToString();
                    paso = "900";
                    paso = "1000";
                    producto.Moleta = Convert.ToDecimal(((r["Moleta"].ToString() == "") ? "0" : r["Moleta"].ToString()));
                    paso = "1100";
                    //producto.PermisoVerCosto = PermisoVerCosto;
                    paso = "1800";

                    lConsulta.Add(producto);

                }

                return lConsulta;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

     
        public DataTable F_LGProductos_Listar_Editar(LGProductosCE objEntidadBE)
        {

            try
            {

                return obj.F_LGProductos_Listar_Editar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_Listar_Editar_Milagros(LGProductosCE objEntidadBE)
        {

            try
            {

                return obj.F_LGProductos_Listar_Editar_Milagros(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_ConsultaMovimiento(LGProductosCE objEntidadBE)
        {

            try
            {

                return obj.F_LGProductos_ConsultaMovimiento(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_Select_Ajustes(LGProductosCE objEntidadBE)
        {

            try
            {

                return obj.F_LGProductos_Select_Ajustes(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public LGProductosCE F_LGProductos_Ajuste(LGProductosCE objEntidadBE)
        {
            try
            {

                return obj.F_LGProductos_Ajuste(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_Inventario_StockActual(LGProductosCE objEntidadBE)
        {
            try
            {

                return obj.F_LGProductos_Inventario_StockActual(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_InventarioPeriodo(LGProductosCE objEntidadBE)
        {
            try
            {

                return obj.F_LGProductos_InventarioPeriodo(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_KardexSunat(LGProductosCE objEntidadBE)
        {
            try
            {

                return obj.F_LGProductos_KardexSunat(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public LGProductosCE F_LGProductosServicios_Update(LGProductosCE objEntidadBE)
        {

            try
            {

                return obj.F_LGProductosServicios_Update(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_UltimoPrecio(LGProductosCE objEntidadBE)
        {
            try
            {

                return obj.F_LGProductos_UltimoPrecio(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_Select_Compras(LGProductosCE objEntidadBE)
        {

            try
            {

                return obj.F_LGProductos_Select_Compras(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_ListarProductosPrecios(LGProductosCE objEntidadBE)
        {

            try
            {

                return obj.F_LGProductos_ListarProductosPrecios(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public LGProductosCE F_LGProductos_ActualizarDatos(LGProductosCE objEntidadBE)
        {
            try
            {

                return obj.F_LGProductos_ActualizarDatos(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_ListarVentas_Descuento(LGProductosCE objEntidadBE)
        {

            try
            {

                return obj.F_LGProductos_ListarVentas_Descuento(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_LGProductos_ListarVentas_Descuento_Milagros(LGProductosCE objEntidadBE)
        {

            try
            {

                return obj.F_LGProductos_ListarVentas_Descuento_Milagros(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
     
        public DataTable F_LGProductos_Inventario_StockActual_Pivot(LGProductosCE objEntidadBE)
        {
            try
            {

                return obj.F_LGProductos_Inventario_StockActual_Pivot(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public LGProductosRelacionesCE F_LGProductosRelaciones_Insert(LGProductosRelacionesCE objEntidad)
        {
            return obj.F_LGProductosRelaciones_Insert(objEntidad);
        }

        public LGProductosRelacionesCE F_LGProductosRelaciones_Update(LGProductosRelacionesCE objEntidad)
        {
            return obj.F_LGProductosRelaciones_Update(objEntidad);
        }

        public LGProductosRelacionesCE F_LGProductosRelaciones_Eliminar(LGProductosRelacionesCE objEntidad)
        {
            return obj.F_LGProductosRelaciones_Eliminar(objEntidad);
        }

        public DataTable F_LGProductosRelaciones_Listar(LGProductosRelacionesCE objEntidad)
        {
            return obj.F_LGProductosRelaciones_Listar(objEntidad);
        }

        public DataTable F_DescargarImagen_CodProducto(LGProductosCE objEntidad)
        {
            return obj.F_DescargarImagen_CodProducto(objEntidad);
        }

        public DataTable F_DescargarDocumento_CP(LGProductosCE objEntidad)
        {
            return obj.F_DescargarDocumento_CP(objEntidad);
        }

        public DataTable F_AbrirImagen_CP(LGProductosCE objEntidadCE)
        {
            return obj.F_AbrirImagen_CP(objEntidadCE);
        }




        public bool F_AgregarImagen(LGProductosCE objEntidadCE)
        {
            return obj.F_AgregarImagen(objEntidadCE);
        }

        public string F_ConsultarUltimaImagenTemp(out string str_mensaje_operacion)
        {
            return obj.F_ConsultarUltimaImagenTemp(out str_mensaje_operacion);
        }

        public bool F_EliminarImagen_Temporal(int ID_TemporalImagen, out string str_mensaje_operacion)
        {
            return obj.F_EliminarImagen_Temporal(ID_TemporalImagen, out str_mensaje_operacion);
        }

        public bool F_EliminarImagen(int ID_TemporalImagen, out string str_mensaje_operacion)
        {
            return obj.F_EliminarImagen(ID_TemporalImagen, out str_mensaje_operacion);
        }




        public List<LGProductosCE> F_MarcaProducto_listar(int CodEstado, int FlagActivo)
        {
            try
            {
                DataTable dtDatos = obj.F_MarcaProducto_listar(CodEstado);
                List<LGProductosCE> lDatos = new List<LGProductosCE>();

                if (FlagActivo == 0)
                    lDatos.Add(new LGProductosCE()
                    {
                        CodMarcaProducto = 0,
                        DescripcionMarcaProducto = "--SELECCIONE MARCA--",

                    });
                foreach (DataRow r in dtDatos.Rows)
                {
                    lDatos.Add(new LGProductosCE()
                    {
                        CodMarcaProducto = Convert.ToInt32(r["CodMarcaProducto"].ToString()),
                        DescripcionMarcaProducto = r["DescripcionMarcaProducto"].ToString(),
                    });
                }

                return lDatos;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public DataTable F_ListarMarca_AutoComplete(LGProductosCE objEntidad)
        {
            try
            {

                return obj.F_ListarMarca_AutoComplete(objEntidad);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
