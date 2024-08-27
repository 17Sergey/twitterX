export type UserType = {
    _id: string;
    fullName: string;
    username: string;
    profileImg: string;
    coverImg: string;
    bio: string;
    link: string;
    following: Array<string>;
    followers: Array<string>;
};

export type PostType = {
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
