import { useContext, useState } from "react";
import {toast} from "../utils/notifyToast.js"
import { handleAuth } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export function useUser() {
  const navigate = useNavigate()
  const { setIsAuthenticated, setUser } = useContext(AuthContext)
  const [users, setUsers] = useState([]);

  const fetchUsers = async() => {
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include"
      })
      const data = await res.json()

      if (!res.ok){
        handleAuth(res, data, setIsAuthenticated, navigate)
        return
      }

      setUsers(data)
    } catch (error) {
      console.log(error.message)
    }

  };

  const createUser = async (formUser) => {
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formUser),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors){
          for (const [field, message] of Object.entries(data.errors)) {
            setError(field, {
              type: "server",
              message: message,
            });
          }
          toast("Usuario ya encontrado","error")
        }
        return;
      }

      setUsers(prev => [...prev, data])
      toast("usuario creado con exito!")
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok){
        const authError = handleAuth(res, data, setIsAuthenticated, navigate)
        if (!authError){
          toast("No puede eliminar una cuenta que ya tiene entradas o salidas registradas", "error")
        }
        return
      }

      if (data.logout) {
        setIsAuthenticated(false);
        navigate("/");
      }

      fetchUsers();
      toast("usuario eliminado con exito!")
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateMyUser = async(formUser, setError) => {
    try {
      const res = await fetch(`http://localhost:3000/api/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(formUser),
        credentials: "include"
      })
      const data = await res.json()
      
      if (!res.ok){
        const authError = handleAuth(res, data, setIsAuthenticated, navigate)
        if (!authError && data.errors){
          for (const [field, message] of Object.entries(data.errors)) {
            setError(field, {
              type: "server",
              message: message,
            });
          }
        }
        return
      }
  
      setUsers(prev => prev.map(u => u.id === id ? data : u))
      setUser(data)
      toast("usuario actualizado con exito!")
    } catch (error) {
      console.log(error.message) 
    }
  };

  const deleteMyUser = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/me',{
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json()

      if (!res.ok){
        handleAuth(res, data, setIsAuthenticated, navigate)
        return
      }

      if (data.logout) {
        setIsAuthenticated(false);
        navigate("/");
      }

    } catch (error) {
      console.log(error)
    }
  }

  const userLogin = async (formLoginData) => {
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formLoginData),
        credentials: "include",
      });
      const data = await res.json();
  
      if (!res.ok) {
        for (const [field, message] of Object.entries(data.errors)) {
          setError(field, {
            type: "server",
            message: message,
          });
        }
        return;
      }
  
      setIsAuthenticated(true);
      setUser(data)
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  };

  const userLogout = async() => {
    try {
      const res = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      })
      const data = await res.json()
      
      if (!res.ok){
        handleAuth(res, data, setIsAuthenticated, navigate)
        return
      }

      setIsAuthenticated(false);
      setUser(null)

    } catch (error) {
      console.log(error.message)
    }
  };

  const changeRol = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json()

      if (!res.ok){
        handleAuth(res, data, setIsAuthenticated, navigate)
        return
      }

      if (data.logout) {
        setIsAuthenticated(false);
        navigate("/");
      }

      toast("Rol de usuario cambiado con éxito!")
    } catch (error) {
      console.log(error.message)
    }
  }



  return {
    users,
    fetchUsers,
    createUser,
    deleteUser,
    updateMyUser,
    deleteMyUser,
    changeRol,
    userLogin,
    userLogout,
  };
}
