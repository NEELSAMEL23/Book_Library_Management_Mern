import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import
import { getProfileService, loginService, registerService, logoutService } from "../Services/AuthService";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // ✅ hook

    // Load user profile on app start
    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getProfileService();
                if (data && data._id) setUser(data);
                else setUser(null);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    // Login
    const login = async (email, password) => {
        const data = await loginService({ email, password });
        if (data && data._id) {
            setUser(data);
            navigate("/books"); // ✅ navigate to dashboard after login
        }
        return data;
    };

    // Register
    const register = async (formData) => {
        const data = await registerService(formData);
        if (data && data._id) {
            setUser(data);
            navigate("/books"); // ✅ navigate to dashboard after register
        }
        return data;
    };

    // Logout
    const logout = async () => {
        try {
            await logoutService();
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setUser(null);
            navigate("/auth/login"); // ✅ navigate to login after logout
        }
    };

    // Refresh profile
    const refreshProfile = async () => {
        try {
            const data = await getProfileService();
            setUser(data);
        } catch (err) {
            console.error("Failed to refresh profile:", err);
            setUser(null);
        }
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                login,
                register,
                logout,
                refreshProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
