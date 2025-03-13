import { IProperty } from "../../types/types";
import LocationsData from "../../assets/countries.json";
import IconEmptyHeart from "../../icons/IconEmptyHeart";
import PriceCard from "../common/PriceCard";
import IconDelete from "../../icons/IconDelete";
import IconEdit from "../../icons/IconEdit";
import useAuthStore from "../../stores/auth.store";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";
import IconFilledHeart from "../../icons/IconFilledHeart";
import IconLoader2 from "../../icons/IconLoader2";

interface IPropertyHeader {
    property: IProperty;
    setCurrentImage: (image: number) => void;
}

const PropertyHeader = ({ property, setCurrentImage }: IPropertyHeader) => {
    const { auth, setAuth } = useAuthStore((state) => ({
        auth: state.auth,
        setAuth: state.setAuth,
    }));
    const navigate = useNavigate();
    const axios = useAxios();
    const [favored, setFavored] = useState<boolean>(
        !!auth?.user?.favorites.includes(property._id)
    );

    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

    const handleFavorite = async () => {
        if (!auth?.user) {
            navigate("/login");
            return;
        }

        setFavored((prev) => !prev);

        try {
            const response = await axios.patch("/users/favor", {
                propertyId: property._id,
            });

            if (response.status === 200) {
                setAuth({
                    ...auth,
                    user: {
                        ...auth.user,
                        favorites: response.data.favored
                            ? [...auth.user.favorites, property._id]
                            : auth.user.favorites.filter(
                                  (id) => id !== property._id
                              ),
                    },
                });
            }
        } catch (err) {
            console.error(err);
            setFavored((prev) => !prev);
        }
    };

    const handleDelete = async () => {
        setLoadingDelete(true);

        try {
            const response = await axios.delete(
                `/properties/property/${property._id}`
            );

            if (response.status === 200) {
                navigate(-1);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingDelete(false);
        }
    };

    return (
        <>
            <header className="flex justify-between md:flex-col mt-20 gap-4 md:w-[436px] md:mx-auto sm:w-full">
                {property.images.length > 0 && (
                    <div className="flex gap-4 xs:flex-col">
                        <img
                            src={`${
                                import.meta.env.VITE_API_URL
                            }/properties/image/${property.images[0]}`}
                            alt="Property Image"
                            className="w-[300px] h-[200px] lg:w-[210px] lg:h-[140px] md:w-[300px] md:h-[200px] xs:w-full xs:h-auto rounded-lg transition hover:scale-[1.03] cursor-pointer object-cover"
                            onClick={() => setCurrentImage(0)}
                        />

                        {property.images.length > 1 && (
                            <div className="flex flex-col gap-5 xs:flex-row xs:gap-0 xs:justify-between">
                                <img
                                    src={`${
                                        import.meta.env.VITE_API_URL
                                    }/properties/image/${property.images[1]}`}
                                    alt="Property Image"
                                    className="w-[120px] h-[90px] lg:w-[80px] lg:h-[60px] md:w-[120px] md:h-[90px] xs:w-[45%] xs:h-auto rounded transition hover:scale-[1.05] cursor-pointer object-cover"
                                    onClick={() => setCurrentImage(1)}
                                />

                                {property.images.length > 2 && (
                                    <div
                                        className="relative w-[120px] h-[90px] lg:w-[80px] lg:h-[60px] md:w-[120px] md:h-[90px] xs:w-[45%] xs:h-auto rounded overflow-hidden transition hover:scale-[1.05] cursor-pointer"
                                        onClick={() => setCurrentImage(2)}
                                    >
                                        <img
                                            src={`${
                                                import.meta.env.VITE_API_URL
                                            }/properties/image/${
                                                property.images[2]
                                            }`}
                                            alt="Property Image"
                                            className="w-full h-full object-cover"
                                        />

                                        {property.images.length > 3 && (
                                            <div className="bg-black/50 w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl flex justify-center items-center">
                                                <p>
                                                    +{" "}
                                                    {property.images.length - 2}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex-[1] flex flex-col justify-between">
                    <p className="font-bold text-2xl lg:text-xl">
                        {property.title}
                    </p>

                    <div>
                        <p>
                            {
                                LocationsData.find(
                                    (item) =>
                                        item.code2.toLowerCase() ===
                                        property.country
                                )?.name
                            }
                        </p>
                        <p>
                            {
                                LocationsData.find(
                                    (item) =>
                                        item.code2.toLowerCase() ===
                                        property.country
                                )?.states.find(
                                    (state) =>
                                        state.code.toLowerCase() ===
                                        property.city
                                )?.name
                            }
                        </p>
                    </div>

                    <PriceCard property={property} />
                </div>

                <div className="flex flex-col md:flex-row md:gap-5 gap-2 lg:gap-1 justify-center items-center">
                    {/* add to favorites */}
                    <button
                        className="text-3xl w-[50px] h-[50px] lg:text-xl lg:w-[40px] lg:h-[40px] flex justify-center items-center rounded-full transition hover:bg-gray-200"
                        title="Add to favorites"
                        onClick={handleFavorite}
                    >
                        {favored ? (
                            <IconFilledHeart className="text-error-1" />
                        ) : (
                            <IconEmptyHeart />
                        )}
                    </button>

                    {auth?.user && auth.user._id === property.owner._id && (
                        <>
                            {/* edit */}
                            <button
                                className="text-2xl w-[50px] h-[50px] lg:text-xl lg:w-[40px] lg:h-[40px] flex justify-center items-center rounded-full transition hover:bg-gray-200"
                                title="Edit Property"
                                onClick={() =>
                                    navigate(`/edit/${property._id}`)
                                }
                            >
                                {<IconEdit />}
                            </button>

                            {/* delete */}
                            <button
                                className="text-3xl w-[50px] h-[50px] lg:text-xl lg:w-[40px] lg:h-[40px] flex justify-center items-center rounded-full transition hover:bg-gray-200"
                                title="Delete Property"
                                onClick={() => setShowDelete(true)}
                            >
                                {<IconDelete />}
                            </button>
                        </>
                    )}
                </div>
            </header>

            {/* delete confirmation popup */}
            {showDelete && (
                <div className="fixed top-0 left-0 w-screen h-dvh z-10 bg-black/70 flex justify-center items-center">
                    <div className="w-[300px] bg-theme-2 rounded-lg p-3">
                        <p className="mb-3">
                            Are you sure you want to permanently delete this
                            property?
                        </p>

                        <div className="flex gap-4">
                            <button
                                className="bg-error-1 text-white w-[80px] h-[30px] text-center rounded-lg disabled:opacity-50 disabled:pointer-events-none flex justify-center items-center"
                                onClick={handleDelete}
                                disabled={loadingDelete}
                                title="Permanently delete"
                            >
                                {loadingDelete ? (
                                    <IconLoader2 className="animate-spin" />
                                ) : (
                                    "Delete"
                                )}
                            </button>
                            <button
                                className="w-[80px] h-[30px] text-center rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                                onClick={() => setShowDelete(false)}
                                disabled={loadingDelete}
                                title="Cancel"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PropertyHeader;
