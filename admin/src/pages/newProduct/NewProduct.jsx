import { useState } from "react"
import "./newProduct.css"

export default function NewProduct() {

    const[inputs,setInputs] = useState({});
    const[file,setFile] = useState(null);
    const[cat,setCat] = useState([])

    const handleChange = (e)=>{
        setInputs((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }
    const handleCat = (e)=>{
        setCat(e.target.value.split(","))
    }
    console.log(cat)

    const handleClick = (e) =>{
        e.preventDefault();
        
    }

  return (
    <div className="newProduct">
                    <h1 className="newProductTitle">New Product</h1>
            <form className="newProductForm">

            <div className="newProductItem">
                    <label >Image</label>
                    <input type="file" id="file" onChange={(e)=>setFile(e.target.files[0])} />
                </div>

                <div className="newProductItem">
                    <label >Title</label>
                    <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange}/>
                </div>
                <div className="newProductItem">
                    <label >Price</label>
                    <input name="price" type="number" placeholder="100" onChange={handleChange}/>
                </div>
                <div className="newProductItem">
                    <label >Categories</label>
                    <input type="text" placeholder="jeans,skirt" onChange={handleCat}/>
                </div>
                <div className="newProductItem">
                    <label >Description</label>
                    <input name="desc" type="text" placeholder="description..." onChange={handleChange}/>
                </div>
                <div className="newProductItem">
                    <label >Stock</label>
                    <select name="inStock" onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <button onClick={handleClick} className="newProductButton">Create</button>
            </form>
    </div>
  )
}
