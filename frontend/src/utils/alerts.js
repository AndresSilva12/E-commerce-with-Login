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

export const lossAlert = async () => {
  const result = await Swal.fire({
    title: 'Estás seguro que deseas continuar?',
    text: "Esta acción puede generar pérdidas en el sistema",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, sé lo que hago!",
  })
  if (!result.isConfirmed) {
    return {success: false}
  }
  return {success: true}
}

export const logoutAlert = async ({logoutFunction}) => {
  const result = await Swal.fire({
    title: "Está seguro que desea cerrar sesión?",
    text: "Deberá volver a iniciar sesión!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Cerrar Sesión!",
    cancelButtonText: 'Cancelar'
  })

  if (result.isConfirmed) {
    await logoutFunction()
  }
}