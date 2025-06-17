import { updateProductSchema } from '../../../validation/productSchema.js'
import { useProducts } from '../hooks/useProducts.js'
import ProductForm from './ProductForm.jsx'

function ProductModal({productUpdate, onClose, onUpdate}) {
    const {updateProduct} = useProducts()

    const onSubmit = (data) => {
        updateProduct(data, productUpdate)
        onUpdate()
    }

    return productUpdate ? (
        <div className='flex flex-col h-screen w-screen fixed top-0 left-0' style={{backgroundColor: 'rgb(0,0,0,0.6)'}}>
            <button onClick={onClose}>X</button>
            <ProductForm schema={updateProductSchema} action="Actualizar" onSubmit={onSubmit} defaultValues={productUpdate}/>
        </div>
    ): (<></>)
}

export default ProductModal;