import { ReactSortable } from "react-sortablejs";
import { TImage } from "../../types/types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { set } from "zod";

interface IImageInput {
    images: TImage[];
    setImages: React.Dispatch<React.SetStateAction<TImage[]>>;
}

interface IDeleteButton {
    top: number;
    left: number;
    id: string | null;
}

const ImageInput = ({ images, setImages }: IImageInput) => {
    const [deleteButton, setDeleteButton] = useState<IDeleteButton>({
        top: 0,
        left: 0,
        id: null,
    });

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const newImages = Array.from(e.target.files);
        const imagesObject = newImages.map((image) => ({
            id: crypto.randomUUID(),
            url: URL.createObjectURL(image),
        }));

        setImages([...images, ...imagesObject]);
    };

    const handleContextMenu = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        e.preventDefault();

        setDeleteButton({
            top: e.clientY,
            left: e.clientX,
            id: e.currentTarget.id,
        });
    };

    const removeImage = (imageId: string) => {
        const imageIndex = images.findIndex((img) => img.id === imageId);

        if (imageIndex === -1) return;

        const newImages = [...images];
        newImages.splice(imageIndex, 1);

        setImages(newImages);
    };

    useEffect(() => {
        const closeContextMenu = () => {
            setDeleteButton((prev) => ({ ...prev, id: null }));
        };

        const handleContextMenuEnter = (e: KeyboardEvent) => {
            if (!deleteButton.id) return;

            if (e.key === "Enter") {
                removeImage(deleteButton.id!);
                setDeleteButton((prev) => ({ ...prev, id: null }));
            }
        };

        window.addEventListener("click", closeContextMenu);
        window.addEventListener("keydown", handleContextMenuEnter);

        return () => {
            window.removeEventListener("click", closeContextMenu);
            window.removeEventListener("keydown", handleContextMenuEnter);
        };
    }, [setDeleteButton, removeImage, deleteButton]);

    return (
        <>
            <label
                htmlFor="image"
                className="w-full h-[160px] mb-6 bg-slate-300 rounded-2xl flex justify-center items-center transition opacity-80 hover:opacity-100 cursor-pointer"
                title="Add Image"
            >
                <p className="text-7xl text-gray-600">+</p>
                <input
                    id="image"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleAddImage(e)}
                />
            </label>

            {deleteButton.id && (
                <button
                    className="fixed bg-error-1 text-white px-2 py-1 rounded-lg text-sm transition hover:opacity-80"
                    style={{
                        top: deleteButton.top,
                        left: deleteButton.left,
                    }}
                    onClick={() => removeImage(deleteButton.id!)}
                >
                    Delete image
                </button>
            )}

            <ReactSortable
                ghostClass="opacity-50"
                list={images}
                setList={setImages}
                handle=".sort-handle"
                className="flex flex-wrap justify-between w-full gap-y-6"
            >
                {images &&
                    images.map((image, index) => (
                        <div key={image.id}>
                            <img
                                key={image.id}
                                id={image.id}
                                src={image.url}
                                alt="Property Image"
                                className={clsx(
                                    "sort-handle shadow-md w-[100px] h-[100px] object-cover rounded-md",
                                    index === 0 ? "border-theme-1 border-2" : ""
                                )}
                                title={
                                    index === 0
                                        ? "Main Image"
                                        : "Property Image"
                                }
                                onContextMenu={(e) => handleContextMenu(e)}
                            />
                        </div>
                    ))}
            </ReactSortable>
        </>
    );
};

export default ImageInput;
