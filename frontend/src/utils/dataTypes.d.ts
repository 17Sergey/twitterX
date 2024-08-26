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
