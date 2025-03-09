function validation(values, existingUsernames) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/; // Requires special char
    const username_pattern = /^.{8,}$/; // At least 8 characters

    // Username Validation
    if (!values.username) {
        error.username = "Username should not be empty";
    } else if (!username_pattern.test(values.username)) {
        error.username = "Username must be at least 8 characters long";
    } else if (existingUsernames.includes(values.username)) {
        error.username = "Username is already taken";
    }

    // Email Validation
    if (!values.email) {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email address is invalid";
    }

    // Password Validation
    if (!values.password) {
        error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password must contain at least one lowercase, one uppercase, and one special character";
    }

    // Confirm Password Validation
    if (!values.confirmPassword) {
        error.confirmPassword = "Confirm Password should not be empty";
    } else if (values.confirmPassword !== values.password) {
        error.confirmPassword = "Passwords do not match";
    }

    return error;
}

export default validation;
