"use client";
import React, { useState, useEffect } from "react";
import './style.css'
import { Button } from "@nextui-org/react";
import { ImSearch } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "../common/Input";
import ImageSwiper from "../GoodDetails/ImageSwiper";
import { useTheme } from "next-themes";

// Sample image URLs for the carousel
const carouselImages = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
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

    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);
    const fullText = "Welcome to Iwu African Fashion";
    const typingSpeed = 100;

    useEffect(() => {
        const handleTyping = () => {
            if (!isDeleting && index < fullText.length) {
                setDisplayedText((prev) => prev + fullText[index]);
                setIndex((prevIndex) => prevIndex + 1);
            } else if (isDeleting && index > 0) {
                setDisplayedText((prev) => prev.slice(0, -1));
                setIndex((prevIndex) => prevIndex - 1);
            } else if (index === fullText.length) {
                //Start deleting after the full text is typed
                setTimeout(() => setIsDeleting(true), 1000);
                //Pause for 1 second before deleting
            } else if (isDeleting && index === 0) {
                //Start typing again after the full deletion
                setIsDeleting(false)
            }
        };

        const typingInterval = setInterval(handleTyping, typingSpeed)
        return () => clearInterval(typingInterval);//Cleanup interval on unmount
    }, [index, isDeleting])

    return (
        <section
            className=" mt-16 p-5 text-center bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center min-h-screen"
            style={{ backgroundImage }}
        >
            <div className="hero" >
                <h2 className="font-bold text-[60px] xl:text-[85px] text-white" style={{ textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
                    {displayedText}
                    {index < fullText.length && <span className="text-green-500">|</span>}
                </h2>
                <div className="sliding-text">
                    <p className="p-8 text-white text-[32px] xl:text-[38px] max-w-3xl mx-auto font-[800] sliding-text-reveal">
                        <span className="text-green-500">Home of the latest{" "}</span>
                        African Fashion
                    </p>
                </div>
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
                                message: "Please enter a search term!",
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
