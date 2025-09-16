import prisma from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { convertToUserPublic } from "../utils/userUtils.js";

export const createUser = async (req, res) => {
  try {
    const { username, password, email, phoneNumber, name, lastName, age } = req.body;
    const passwordHashed = await bcrypt.hash(password, 10);

    const countAdmin = await prisma.users.count({
      where: {
        role: "ADMIN"
      }
    })
    const newRole = countAdmin < process.env.MAX_ADMINS_AT_START ? "ADMIN" : "USER"
    const newUser = await prisma.users.create({
      data: {
        username: username,
        password: passwordHashed,
        email: email,
        phoneNumber: phoneNumber,
        name: name,
        lastName: lastName,
        age: age,
        role: newRole
      },
    });
    return res.json(convertToUserPublic(newUser));
  } catch (error) {
    return res.status(500).json({ error: "Error interno al crear el usuario" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    const usersPublic = users.map((user) => convertToUserPublic(user));
    return res.json(usersPublic);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error interno al traer los usuarios" });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: req.params.id,
      },
    });
    return res.json(convertToUserPublic(user));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error interno al intentar traer el usuario" });
  }
};

export const deleteUserSelected = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') return res.status(403).json({error: "No cuenta con los permisos para eliminar este usuario"})
    const userDeleted = await prisma.users.delete({
      where: {
        id: req.params.id,
      },
    });
    const isAccountDeleted = jwt.verify(accessToken, "123");
    if (isAccountDeleted.username === userDeleted.username) {
      res.clearCookie("accessToken");
      return res.status(200).json({
        logout: true,
        message: "Cuenta eliminada y sesión cerrada",
      });
    }
    return res.json(convertToUserPublic(userDeleted));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error interno durante la eliminacion de usuario" });
  }
};

export const updateMyUser = async (req, res) => {
  try {
    const { username, password, email, phoneNumber, name, lastName, age } =
      req.body;
    const dataToUpdate = {};
    if (username) dataToUpdate.username = username;
    if (password) dataToUpdate.password = await bcrypt.hash(password, 10);
    if (email) dataToUpdate.email = email;
    if (phoneNumber) dataToUpdate.phoneNumber = phoneNumber;
    if (name) dataToUpdate.name = name;
    if (lastName) dataToUpdate.lastName = lastName;
    if (age) dataToUpdate.age = age;

    const userUpdated = await prisma.users.update({
      where: {
        id: req.user.id,
      },
      data: dataToUpdate,
    });
    return res.json(convertToUserPublic(userUpdated));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error interno durante la actualizacion de usuario" });
  }
};

export const deleteMyUser = async (req, res) => {
  try {
    const userDeleted = await prisma.users.delete({
      where: {
        id: req.user.id
      }
    })
    if (userDeleted) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.status(200).json({
        logout: true,
        message: "Cuenta eliminada y sesión cerrada",
      });
    }
  } catch (error) {
    console.log(error)
  }
}

export const getCurrentUser = async(req, res) => {
  const {id, role} = req.user
  const user = await prisma.users.findFirst({
    where: {
      id: id
    }
  })
  if (role !== user.role) return res.status(403).json({error: "Error. Los datos de sesión no coinciden"})
  const publicUser = convertToUserPublic(user)
  res.status(200).json(publicUser)
};


export const loginUser = async (req, res) => {
  const { id, role } = req.body;
  const accessToken = jwt.sign({ id : id, role: role}, process.env.JWT_ACCESS_SECRET, { expiresIn: "12m" });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 12,
  });

  const refreshToken = jwt.sign({ id: id, role: role}, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d"})
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7
  })
  return res.json(req.body);
};

export const refreshSesion = async (req, res) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken){
    return res.status(400).json({error: "Acceso denegado. Debe iniciar sesión primero"})
  }
  try{
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    const newAccessToken = jwt.sign({id : payload.id, role: payload.role}, process.env.JWT_ACCESS_SECRET, { expiresIn: "12m"})
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 12
    })
    return res.json("Sesion refrescada correctamente!")
  } catch (error) {
    return res.status(401).json({error: "Refresh token inválido o expirado"})
  }
}

export const logoutUser = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.json("Logout realizado con exito!");
};
