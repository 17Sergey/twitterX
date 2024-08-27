import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import XSvg from "../../components/svgs/XSvg";

import { MdPassword } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { authAPI } from "../../api/authAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const queryClient = useQueryClient();

    const { mutate, isError, isPending } = useMutation({
        mutationFn: authAPI.logIn,
        onSuccess: () => {
            toast.success("Logged in successfully");
            queryClient.invalidateQueries({ queryKey: ["userAuth"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(formData);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-screen justify-center md:items-center relative top-2/4 p-8">
            <div className="lg:w-80 md:w-60 w-24 mb-4 lg:mr-36 md:mr-24">
                <XSvg className="w-full fill-[--theme-accent]" />
            </div>
            <div className="lg:-mt-8">
                <h1 className="text-4xl text-[--theme-accent] font-extrabold mb-4">Let's go.</h1>
                <form onSubmit={handleSubmit}>
                    <label className="input input-bordered rounded mb-4 flex items-center gap-2 w-full">
                        <FaUser />
                        <input
                            type="text"
                            className="grow"
                            placeholder="Username"
                            name="username"
                            onChange={handleInputChange}
                            value={formData.username}
                        />
                    </label>
                    <label className="input input-bordered rounded mb-4 flex items-center gap-2">
                        <MdPassword />
                        <input
                            type="password"
                            className="grow"
                            placeholder="Password"
                            name="password"
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </label>
                    {isError && <p className="text-error mb-4 text-center">Something went wrong</p>}
                    <button className="btn btn-primary w-full rounded-full text-[--theme-accent] font-medium text-base">
                        {isPending && <LoadingSpinner className="loading-xs" />}
                        Log in
                    </button>
                    <p className="mb-4 text-base font-thin divider divider-neutral">
                        Need to create an account?
                    </p>
                    <Link to="/signup">
                        <button className="btn btn-outline btn-primary w-full rounded-full font-medium text-base">
                            Sign up
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};
export default LoginPage;
