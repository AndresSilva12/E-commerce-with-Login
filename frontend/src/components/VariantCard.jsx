function VariantCard({ variant, onEdit, onDelete, errors }) {
    return (
        <div className="flex items-center justify-center gap-4">
            {errors.variants && errors.variants[variant.code] && <span className="text-red-600">{errors.variants[variant.code].message}</span>}
            <p>Code: {variant.code}</p>
            <p>Size: {variant.size}</p>
            <p>Color: {variant.color}</p>
            <p>Stock: {variant.stock}</p>
            {variant.image && <img
                src={typeof variant.image === 'string' ? variant.image : URL.createObjectURL(variant.image)}
                className="w-20 h-20 object-cover"
            />}
            <button onClick={() => onEdit(variant)}>Editar</button>
            <button onClick={() => onDelete(variant)}>Eliminar</button>
        </div>
    )
}

export default VariantCard;