import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useProducts } from "../context/ProductContext";
import ProductModal from "../components/ProductModal";

function ProductsPage() {
    const [modal, setModal] = useState(false)
    const [productUpdate, setProductUpdate] = useState(null)
    const { products, deleteProduct } = useProducts()

    const onSubmit = () => {
        setProductUpdate(null)
        setModal(false)
    }

    const handleUpdate = (product) => {
        setProductUpdate(product)
        setModal(true)
    }

    const handleCreate = () => {
        setProductUpdate(null)
        setModal(true)
    }

    return (
        <>
            <div className="m-10 bg-neutral-900 p-5">
                {products.map((product) => (
                    <div key={product.id} >
                        <div className="flex justify-between items-center mb-5">
                            <div className="flex justify-between items-center gap-5">
                                <p>Nombre:<br />{product.name}</p>
                                <p>Marca:<br />{product.brand}</p>
                            </div>
                            <div className="flex justify-between items-center gap-5">
                                <p>Precio de compra:<br />${product.purchasePrice}</p>
                                <p>Precio de venta:<br />${product.salePrice}</p>
                            </div>
                            <button className="bg-green-900" onClick={() => { handleUpdate(product) }}>Editar</button>
                            <button className="bg-red-900" onClick={() => { deleteProduct(product.id) }}>Eliminar</button>
                        </div>

                        {product.variants && product.variants.map((variant) => (
                            <div key={variant.id} className="flex justify-center gap-3 bg-neutral-700 m-1">
                                <p>Code: {variant.code}</p>
                                <p>Size: {variant.size}</p>
                                <p>Color: {variant.color}</p>
                                <p>Stock: {variant.stock}</p>
                                {variant.image && <img src={variant.image} className="w-20 h-20 object-cover" />}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button className="fixed bottom-0 right-0 p-2 bg-blue-600 rounded-full" onClick={handleCreate}>+</button>
            {modal && (<ProductModal productUpdate={productUpdate} onClose={() => { setModal(false) }} onSubmit={() => { onSubmit() }} />)}

            <ToastContainer />
        </>
    )
}

export default ProductsPage;