const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (roles) {
	return function (req, res, next) {
		if (req.method === "OPTIONS") {
			next();
		}

		try {
			const token = req.headers.authorization.split(" ")[1];
			if (!token) {
				return res.status(403).json({ message: "Пользователь не авторизован" });
			}
			const { roles: userRoles } = jwt.verify(token, config.get("accessSecret"));
			let hasRole = false;

			userRoles.forEach((role) => {
				if (roles.includes(role)) {
					hasRole = true;
				}
			});
			if (!hasRole) {
				return res.status(403).json({ message: "У Вас нет доступа" });
			}
			next();
		} catch (e) {
			return res.status(403).json({ message: "Пользователь не авторизован" });
		}
	};
};
