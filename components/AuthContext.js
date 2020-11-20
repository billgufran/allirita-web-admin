import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
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
	const [user, setUser] = useLocalStorage("user", true);

	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = url => {
			if (url !== "/login" && !user) {
				router.push("/login");
			}
		};

		if (router.pathname !== "/login" && user === null) {
			router.push("/login");
		}

		router.events.on("routeChangeStart", handleRouteChange);
		return () => {
			router.events.off("routeChangeStart", handleRouteChange);
		};
	}, [user]);

	const login = async (email, password) => {
		const res = await api.post(
			"https://projects.upanastudio.com/allirita-api/login",
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

	const value = {
		login,
		logout,
		isAuthenticated: !!user,
		user,
	};

	return (
		<AuthContext.Provider value={value}>
			{props.children}
		</AuthContext.Provider>
	);
}