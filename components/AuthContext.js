import { notification } from "antd";
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
	//	CHANGE THIS TO NULL BEFORE PROD
	const [user, setUser] = useLocalStorage("user", null);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	// === notifications instance
	const sessionExpiredNotification = () => {
		notification["warning"]({
			message: "Session Expired",
			description: "Your session has expired. Please re-login.",
		});
	};

	const loginFailedNotification = () => {
		notification["warning"]({
			message: "Login failed",
			description: "Your email/password is incorrect.",
		});
	};


	// === functions
	const login = async (email, password) => {
		try {
			setIsLoading(true);
			const res = await api.post("/akun/masuk", {
				email,
				password,
			});
			if (res.data.isError) {
				loginFailedNotification();
			} else {
				setUser({email, token: res.data.data.token, id_role: res.data.data.id_role});
				router.push("/content/list");
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
	};

	const signUp = (name, email, password) => {
		api.post("/register", {
			name,
			email,
			password,
		});
	};

	const checkToken = async () => {
		try {
			const res = await api.get("/akun", {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
		} catch (err) {
			logout();
			sessionExpiredNotification();
		}
	};

	// === Effect
	// redirect if not logged in
	useEffect(() => {
		const privateRoute =
			router.pathname !== "/login" &&
			router.pathname !== "/signup" &&
			router.pathname !== "/privacy" &&
			!user;

		if (privateRoute) {
			router.push("/login");
		}
	}, [user, router.pathname]);

	// constatntly check token validity
	useEffect(() => {
		// skip check token in specific page
		const privateRoute =
			router.pathname === "/" ||
			router.pathname === "/login" ||
			router.pathname === "/privacy"

		if (!privateRoute) {
			console.log("running")
			console.log(router.pathname)
			checkToken();
		}
	}, [router.pathname]);

	const value = {
		login,
		logout,
		signUp,
		checkToken,
		isLoading,
		user,
	};

	return (
		<AuthContext.Provider value={value}>
			{props.children}
		</AuthContext.Provider>
	);
}
