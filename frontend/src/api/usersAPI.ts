import { Nullable } from "../utils/dataTypes";

async function getSuggestedUsers() {
    const res = await fetch(`/api/users/suggested`);

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
}

async function getProfile(username: string) {
    const res = await fetch(`/api/users/profile/${username}`);

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
}

async function follow(userId: string) {
    const res = await fetch(`/api/users/follow/${userId}`, {
        method: "POST",
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
}

export type UpdateProfileDataType = {
    fullName: string;
    username: string;
    profileImg: string;
    coverImg: string;
    email: string;
    bio?: string;
    link?: string;
};

export type NullableUpdateProfileDataType = Nullable<UpdateProfileDataType>;

async function updateProfile(formData: NullableUpdateProfileDataType) {
    const res = await fetch(`/api/users/update`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
}

export const usersAPI = {
    getSuggestedUsers,
    follow,
    getProfile,
    updateProfile,
};
