import { useState } from "react";

export function useUser() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch("http://localhost:3000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  const createUser = async (formUser, setError, notify, navigate) => {
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formUser),
      });
      const data = await res.json();

      if (!res.ok) {
        for (const [field, message] of Object.entries(data.errors)) {
          setError(field, {
            type: "server",
            message: message,
          });
        }
        notify("error", "Ya se encontró un usuario con estos datos");
        return;
      }

      fetchUsers();
      notify("success", "Usuario creado con éxito!");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id, setIsAuthenticated, navigate) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (data.logout) {
        setIsAuthenticated(false);
        navigate("/");
      }

      fetchUsers();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const updateUser = (formUser, id, setError) => {
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(formUser),
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw data.errors;
          });
        return res.json();
      })
      .then((data) => {
        fetchUsers();
        console.log("Usuario actualizado con exito! ", data);
      })
      .catch((errors) => {
        for (const [field, message] of Object.entries(errors)) {
          setError(field, {
            type: "server",
            message: message,
          });
        }
      });
  };

  const userLogin = async (
    formLoginData,
    setIsAuthenticated,
    navigate,
    setError
  ) => {
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
    navigate("/");
  };

  const userLogout = ({ setIsAuthenticated }) => {
    fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(false);
      });
  };

  return {
    users,
    fetchUsers,
    createUser,
    deleteUser,
    updateUser,
    userLogin,
    userLogout,
  };
}
