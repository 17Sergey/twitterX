async function getPosts(endpoint: string) {
    const res = await fetch(endpoint);

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
}

async function deletePost(postId: string) {
    const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
}

type CreatePostDataType = {
    text: string;
    img: string | null;
};

async function createPost({ text, img }: CreatePostDataType) {
    const res = await fetch(`/api/posts/create`, {
        method: "POST",
        body: JSON.stringify({ text, img }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
}

async function likePost(postId: string) {
    const res = await fetch(`/api/posts/like/${postId}`, {
        method: "POST",
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
}

export const postsAPI = {
    getPosts,
    deletePost,
    createPost,
    likePost,
};
