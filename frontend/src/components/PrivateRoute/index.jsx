import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const nav = useNavigate();
    const [isLogged, setIsLogged] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            nav('/login')
            return
        }

        setIsLogged(true)
    }, []);

    if (isLogged === null) {
        return <div>Загрузка...</div>;
    }

    if (!isLogged) {
        return null
    }

    return children
}
