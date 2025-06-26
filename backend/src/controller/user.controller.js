import prisma from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { convertToUserPublic } from "../utils/userUtils.js";
import { success } from "zod/v4";

export const createUser = async (req, res, next) => {
  try {
    const { username, password, email, phoneNumber, name, lastName, age } =
      req.body;
    const passwordHashed = await bcrypt.hash(password, 10);
    const newUser = await prisma.users.create({
      data: {
        username: username,
        password: passwordHashed,
        email: email,
        phoneNumber: phoneNumber,
        name: name,
        lastName: lastName,
        age: age,
      },
    });
    return res.json(convertToUserPublic(newUser));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error interno al crear el usuario" });
  }
};

export const getAllUsers = async (req, res, next) => {
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

export const getOneUser = async (req, res, next) => {
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

export const deleteUserSelected = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(403)
        .json({ error: "Acceso denegado. Debes iniciar sesion primero" });
    }
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

export const updateUserSelected = async (req, res, next) => {
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
        id: req.params.id,
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

export const loginUser = async (req, res, next) => {
  const { username } = req.body;
  const accessToken = jwt.sign({ username }, "123", { expiresIn: "1h" });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60,
  });
  return res.json("Sesion iniciada correctamente!");
};

export const dashboardProtected = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken)
    return res
      .status(403)
      .json({ error: "Acceso denegado. Debes iniciar sesion primero" });
  try {
    const data = jwt.verify(accessToken, "123");
    return res
      .status(200)
      .json(`Hola ${data.username}. Estamos accediendo a la dashboard...`);
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ error: "Acceso denegado. Debes iniciar sesion primero" });
  }
};

export const logoutUser = (req, res, next) => {
  res.clearCookie("accessToken");
  return res.json("Logout realizado con exito!");
};
