const authReducer = (state = { isLoggedIn: false }, action) => {
	if (action.type === "login") {
		return {
			isLoggedIn: true,
		};
	}

	if (action.type === "logout") {
		return {
			isLoggedIn: false,
		};
	}
	return state;
};

export default authReducer;
