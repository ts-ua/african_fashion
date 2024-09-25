"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { ImSearch } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "../common/Input";
import ImageSwiper from "../GoodDetails/ImageSwiper";
import { useTheme } from "next-themes";
import { url } from "inspector";

// Sample image URLs for the carousel
const carouselImages = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
];

interface GoodSearchForm {
    text: string;
}

const GoodSearch = () => {
    const { theme } = useTheme();
    const router = useRouter();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<GoodSearchForm>();

    const onSubmit = (data: GoodSearchForm) => {
        router.push(`/goods/search?text=${data.text}`);
    };

    const backgroundImage = theme === "dark"
        ? "url('/background.jpg')"
        : "url('/background1.jpg')";
    return (
        <section
            className=" mt-16 p-5 text-center bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center min-h-screen"
            style={{ backgroundImage }}
        >
            <div className="hero" >
                <h2 className="font-bold text-[60px] xl:text-[85px] text-white" style={{ textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
                    Welcome to Iwu {" "}
                    <span className="text-green-500">
                        African Fashion
                    </span>
                </h2>
                <p className=" p-8 text-white text-[32px] xl:text-[38px] max-w-3xl mx-auto font-[800]">
                    <span className="text-green-500">
                        Home of the latest{" "}
                    </span>
                    African Fashion.
                </p>
            </div>
            <div className="w-full h-full">
                <ImageSwiper imagesUrl={carouselImages} />
            </div>

            <div className="flex flex-col items-center justify-center my-4 w-full max-w-5xl mx-auto rounded-xl">
                {errors.text && (
                    <span className="mb-2 font-medium text-xs text-red-400 dark:text-red-300 mx-auto md:mr-auto md:ml-0">
                        {errors.text.message}
                    </span>
                )}
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full">
                    <Input
                        placeholder="Search..."
                        autoComplete="off"
                        error={!!errors.text}
                        {...register("text", {
                            required: {
                                value: true,
                                message: "Digite o destino no campo de pesquisa!",
                            },
                        })}
                    />

                    <Button
                        color="secondary"
                        variant="shadow"
                        endContent={<ImSearch size={16} />}
                        className="w-full md:max-w-[10rem]"
                        onClick={() => handleSubmit(onSubmit)()}
                    >
                        Search
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default GoodSearch;
