export const generateActivationCode = (): string => {
	let code = "";

	for (let i = 0; i < 5; i++) {
		code += Math.floor(Math.random() * 6);
	}

	return code;
};

export const validateUsernameCharacters = (text: string): boolean => {
	const letters = "qwertyuiopasdfghjklzxcvbnm";
	const allowedCharacters = letters + letters.toUpperCase() + "1234567890_";

	return text
		.split("")
		.every((char: string) => allowedCharacters.includes(char));
};
