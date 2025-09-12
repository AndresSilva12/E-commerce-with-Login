export const handleAuth = (data, setIsAuthenticated, navigate) => {
    if (data.error === "Debe iniciar sesión"){
        setIsAuthenticated(false);
        navigate("/login");
    }
    throw new Error (data.error)
}