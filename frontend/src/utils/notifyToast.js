import {toaster } from "../components/ui/toaster"

export const toast = (title, type) => {
  toaster.create({
    title: `${title}`,
    type: type || "success",
    max: 2,
  })
}