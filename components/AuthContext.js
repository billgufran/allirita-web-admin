import { useRouter } from "next/router";
import { createContext, useState } from "react";
import api from "../services/api";

//Custom hooks to set localStorage
function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const setValue = value => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.log(error);
		}
	};
	return [storedValue, setValue];
}

export const AuthContext = createContext();

export default function AuthProvider(props) {

	//	CHANGE THIS TO NULL BEFORE PROD
	const [user, setUser] = useLocalStorage("user", null);

	const router = useRouter();

	//redirect if not logged in
	// useEffect(() => {
	// 	const handleRouteChange = url => {
	// 		if (url !== "/login" && url !== "/signup" && !user) {
	// 			router.push("/login");
	// 		}
	// 	};

	// 	if (router.pathname !== "/login" && router.pathname !== "/signup" && user === null) {
	// 		router.push("/login");
	// 	}

	// 	router.events.on("routeChangeStart", handleRouteChange);
	// 	return () => {
	// 		router.events.off("routeChangeStart", handleRouteChange);
	// 	};
	// }, [user]);


	const login = async (email, password) => {
		const res = await api.post(
			"/login",
			{
				email,
				password,
			}
		);
		setUser({email, token: res.data.token});
      api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
	};

	const logout = () => {
		setUser(null);
		delete api.defaults.headers.Authorization;
	};

	const signUp = (name, email, password) => {
		api.post(
			"/register",
			{
				name,
				email,
				password,
			}
		);
	}

	const value = {
		login,
		logout,
		isAuthenticated: !!user,
		user,
		signUp,
	};

	return (
		<AuthContext.Provider value={value}>
			{props.children}
		</AuthContext.Provider>
	);
}