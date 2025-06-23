import { useState } from "react";
import ProductFormModal from "../components/ProductFormModal";
import { ToastContainer } from "react-toastify";
import { useProducts } from "../context/ProductContext";

function ProductsPage () {
    const [modal, setModal] = useState(false)
    const [modalCreate, setModalCreate] = useState(false)
    const [productUpdate, setProductUpdate] = useState(null)
    const {products, deleteProduct} = useProducts()


    const onSubmit = () => {
        setProductUpdate(null)
        setModal(false)
    }

    const handleUpdate = (product) => {
        setProductUpdate(product)
        setModalCreate(false)
        setModal(true)
    }

    const handleCreate = () => {
        setProductUpdate('')
        setModalCreate(true)
        setModal(true)
    }
    return(
        <>
            <div className="m-10 bg-neutral-900 p-5">
                {products.map((product)=> (
                    <div key={product.id} className="flex justify-between items-center mb-5">
                        <div className= "flex justify-between items-center gap-5">
                            <p>Nombre: {product.name}</p>
                            <p>Marca: {product.brand}</p>
                        </div>
                        <div className= "flex justify-between items-center">
                            <p>Precio de compra: {product.purchasePrice}</p>
                            <p>Precio de venta: {product.salePrice}</p>
                        </div>
                        {product.variants && product.variants.map((variant)=> (
                            <div key={variant.id}>
                                <p>Code {variant.code}</p>
                            </div>
                        ))}
                        <button className="bg-green-900" onClick={() => {handleUpdate(product)}}>Editar</button>
                        <button className="bg-red-900" onClick={() => {deleteProduct(product.id)}}>Eliminar</button>
                    </div>
                ))}
            </div>
            <button className="fixed bottom-0 right-0 p-2 bg-blue-600 rounded-full" onClick={handleCreate}>+</button>
            {modal && (<ProductFormModal modalCreate={modalCreate} productUpdate={productUpdate} onClose={() => {setModal(false)}} onSubmit={() =>{onSubmit()}}/>)}
            
            <ToastContainer/>
        </>
    )
}

export default ProductsPage;