type SignUpFormData = {
    email: string;
    username: string;
    fullName: string;
    password: string;
};
async function signUp(dataToSend: SignUpFormData) {
    const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
}

type LogInFormData = {
    username: string;
    password: string;
};

async function logIn(dataToSend: LogInFormData) {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
}

async function logOut() {
    const res = await fetch("/api/auth/logout", {
        method: "POST",
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
}

export const apiHandler = {
    signUp,
    logIn,
    logOut,
};
