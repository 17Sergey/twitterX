async function getSuggestedUsers() {
    const res = await fetch(`/api/users/suggested`);

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
}

export const usersAPI = {
    getSuggestedUsers,
};
