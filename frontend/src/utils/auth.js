import { toast } from "./notifyToast";

export const handleAuth = (res, data, setIsAuthenticated, navigate) => {
    if (res.status === 401){
        setIsAuthenticated(false);
        if (navigate) navigate("/login");
        return true
    } else if (res.status === 403){
        toast(`${data.error}` || "No tiene permiso para realizar esta acción", "error")
        return true
    }
    return false
}