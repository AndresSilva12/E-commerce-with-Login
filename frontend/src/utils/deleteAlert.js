import Swal from "sweetalert2";

export const deleteAlert = async ({ deleteFunction, type }) => {
  const result = await Swal.fire({
    title: `Estas seguro que deseas eliminar ${
      type === "Product" ? "éste producto" : "ésta variante"
    }?`,
    text: "No puedes revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, elimínalo!",
  });
  if (result.isConfirmed) {
    await deleteFunction();
    Swal.fire({
      title: "Eliminado!",
      text: `Tu ${
        type === "Product" ? "producto" : "variante"
      } ha sido eliminado!.`,
      icon: "success",
    });
  }
};
