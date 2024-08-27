async function getPosts(endpoint: string) {
    const res = await fetch(endpoint);

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
}

export const postsAPI = {
    getPosts,
};
