import {toaster } from "../components/ui/toaster"

export const toast = (title, type) => {
  toaster.dismiss()
  toaster.create({
    title: `${title}`,
    type: type || "success",
    duration: 1000
  })
}