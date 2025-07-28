function VariantCard({ variant, onEdit, onDelete, errors }) {
    return (
        <div>
            {errors.variants && errors.variants[variant.code] && <span>{errors.variants[variant.code].message}</span>}
            <p>Code: {variant.code}</p>
            <p>Size: {variant.size}</p>
            <p>Color: {variant.color}</p>
            <p>Stock: {variant.stock}</p>
            {variant.image && <img
                src={typeof variant.image === 'string' ? variant.image : URL.createObjectURL(variant.image)}
            />}
            <button onClick={() => onEdit(variant)}>Editar</button>
            <button onClick={() => onDelete(variant)}>Eliminar</button>
        </div>
    )
}

export default VariantCard;