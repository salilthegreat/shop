import "./productList.css"
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import {deleteProducts, getProducts} from "../../redux/apiCall"

export default function ProductList() {

    const dispatch = useDispatch();
    const products = useSelector((state)=>state.product.products)

    useEffect(()=>{
        getProducts(dispatch)
    },[dispatch])

    const handleDelete = (id) => {
        deleteProducts(id,dispatch)
    }

    const columns = [
        { field: "_id", headerName: "ID", width: 230 },
        {
            field: "product", headerName: "Product", width: 200, renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.img} alt="" />
                        {params.row.name}
                    </div>
                )
            }
        },
        { field: "inStock", headerName: "Stock", width: 200 },
        { field: "title", headerName: "Title", width: 200 },
        {
            field: "price",
            headerName: "Price",
            width: 200,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/product/" + params?.row?._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row._id)} />
                    </>
                )
            }
        }
    ];

    return (
          <div className="productList">
            {products &&
            <DataGrid
                rows={products}
                getRowId={row=>row?._id}
                columns={columns}
                disableRowSelectionOnClick
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 8 },
                    },
                }}
                pageSizeOptions={[5,8,10]}
                checkboxSelection
            />
            }
        </div>
    )
}
