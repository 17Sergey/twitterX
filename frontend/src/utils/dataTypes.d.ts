export type UserType = {
    _id: string;
    fullName: string;
    username: string;
    profileImg: string;
    coverImg: string;
    email: string;
    bio: string;
    link: string;
    following: Array<string>;
    followers: Array<string>;
    createdAt: string;
};

export type UserProfileType = {
    _id: string;
    fullName: string;
    username: string;
    profileImg: string;
    coverImg: string;
    email: string;
    bio: string;
    link: string;
    following: Array<string>;
    followers: Array<string>;
    posts: number;
    createdAt: string;
};

export type PostType = {
    createdAt: string;
    _id: string;
    text: string;
    img?: string;
    user: {
        _id: string;
        username: string;
        profileImg: string;
        fullName: string;
    };
    comments: Array<{
        _id: string;
        text: string;
        user: {
            username: string;
            profileImg: string;
            fullName: string;
        };
    }>;
    likes: Array<string>;
};

export type NotificationType = {
    _id: string;
    from: {
        _id: string;
        username: string;
        profileImg: string;
    };
    type: string;
};
