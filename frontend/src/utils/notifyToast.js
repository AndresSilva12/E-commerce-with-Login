import {toast} from 'react-toastify'

export const notify = (type,message) => {
    toast[type](message, {
      position: "bottom-left",
      autoClose: 1700,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    })
}