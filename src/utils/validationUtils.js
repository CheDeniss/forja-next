
export const validateEmail = (email) => {
    if (!email.trim()) {
        return "errors.emailRequired"; // "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        return "errors.invalidEmail"; // "Invalid email address"
    }
    return ""; // Немає помилки
};

export const validatePassword = (password) => {
    if (!password.trim()) {
        return "errors.passwordRequired"; // "Password is required"
    } else if (password.length < 8) {
        return "errors.passwordLength"; // "Password must be at least 8 characters long"
    } else if (!/[A-Z]/.test(password)) {
        return "errors.passwordUppercase"; // "Password must contain at least one uppercase letter"
    } else if (!/[a-z]/.test(password)) {
        return "errors.passwordLowercase"; // "Password must contain at least one lowercase letter"
    } else if (!/[0-9]/.test(password)) {
        return "errors.passwordNumber"; // "Password must contain at least one number"
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return "errors.passwordSpecial"; // "Password must contain at least one special character"
    }
    return ""; // Немає помилки
};

export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword.trim()) {
        return "errors.confirmPasswordRequired"; // "Confirm password is required"
    } else if (password !== confirmPassword) {
        return "errors.confirmPasswordMismatch"; // "Passwords do not match"
    }
    return ""; // Немає помилки
};