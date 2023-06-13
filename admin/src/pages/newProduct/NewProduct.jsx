import { useState } from "react"
import "./newProduct.css"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addProducts } from "../../redux/apiCall";
import { useDispatch } from "react-redux";

export default function NewProduct() {

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([])
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const handleCat = (e) => {
        setCat(e.target.value.split(","))
    }

    const handleClick = (e) => {
        e.preventDefault();
        const fileName = new Date() + file.name
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    default:
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    console.log({...inputs,img:downloadURL,categories:cat});
                    const product = { ...inputs, img: downloadURL, categories: cat };
                    addProducts(product,dispatch)
                });
            }
        );


    }

    return (
        <div className="newProduct">
            <h1 className="newProductTitle">New Product</h1>
            <form className="newProductForm">

                <div className="newProductItem">
                    <label >Image</label>
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>

                <div className="newProductItem">
                    <label >Title</label>
                    <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange} />
                </div>
                <div className="newProductItem">
                    <label >Price</label>
                    <input name="price" type="number" placeholder="100" onChange={handleChange} />
                </div>
                <div className="newProductItem">
                    <label >Categories</label>
                    <input type="text" placeholder="jeans,skirt" onChange={handleCat} />
                </div>
                <div className="newProductItem">
                    <label >Description</label>
                    <input name="desc" type="text" placeholder="description..." onChange={handleChange} />
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
