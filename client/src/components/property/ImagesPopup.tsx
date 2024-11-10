import IconChevronLeft from "../../icons/IconChevronLeft";
import IconChevronRight from "../../icons/IconChevronRight";
import IconClose from "../../icons/IconClose";

interface IImagesPopup {
    images: string[];
    currentImage: number | null;
    setCurrentImage: (image: number | null) => void;
    handleImageNav: (direction: "prev" | "next") => void;
}

const ImagesPopup = ({
    images,
    currentImage,
    setCurrentImage,
    handleImageNav,
}: IImagesPopup) => {
    return (
        <>
            {currentImage !== null && (
                <div className="fixed z-10 inset-0 bg-black bg-opacity-70 flex justify-center items-center">
                    {/* close button */}
                    <button
                        className="absolute top-5 right-5"
                        onClick={() => setCurrentImage(null)}
                        title="Close [ESC]"
                        type="button"
                    >
                        <IconClose className="text-white text-4xl" />
                    </button>

                    {/* left arrow */}
                    <button
                        className="mr-5 disabled:opacity-50"
                        onClick={() => handleImageNav("prev")}
                        disabled={currentImage === 0}
                        title="Previous [←]"
                        type="button"
                    >
                        <IconChevronLeft className="text-white text-4xl" />
                    </button>

                    {/* image */}
                    <div className="w-[60%] flex justify-center items-center">
                        <img
                            src={`${
                                import.meta.env.VITE_API_URL
                            }/properties/image/${images[currentImage]}`}
                            alt="Property Image"
                            className="rounded-lg"
                        />
                    </div>

                    {/* right arrow */}
                    <button
                        className="ml-5 disabled:opacity-50"
                        onClick={() => handleImageNav("next")}
                        disabled={currentImage === images.length - 1}
                        title="Next [→]"
                        type="button"
                    >
                        <IconChevronRight className="text-white text-4xl" />
                    </button>
                </div>
            )}
        </>
    );
};

export default ImagesPopup;
