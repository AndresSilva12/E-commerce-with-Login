import {toast} from 'react-toastify'

export const notify = (type,message) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    })
}