import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";
import { TImage, TContacts } from "../types/types";
import useAxios from "../hooks/useAxios";
import IconLoader2 from "../icons/IconLoader2";
import MediaInputs from "../components/new/MediaInputs";
import FieldInputs from "../components/new/FieldInputs";

interface INew {
    edit?: boolean;
}

const New = ({ edit = false }: INew) => {
    const axios = useAxios();
    const navigate = useNavigate();
    const { id } = useParams();

    const initialState = {
        title: "",
        description: "",
        mode: "rent",
        category: "residential",
        country: "ae",
        city: "",
        price: "",
        area: "",
        frequency: "",
        currency: "",
        beds: 0,
        baths: 0,
        age: 0,
        furnished: false,
        balcony: false,
        elevator: false,
        parking: false,
        security: false,
        images: [] as TImage[],
        location: null as LatLng | null,
        contacts: {
            phones: [],
            emails: [],
            links: [],
        } as TContacts,
    };

    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState<boolean>(false);

    const [editLoading, setEditLoading] = useState<boolean>(true);
    const [editFound, setEditFound] = useState<boolean>(false);

    // errors
    const [titleError, setTitleError] = useState<string | null>(null);
    const [descError, setDescError] = useState<string | null>(null);
    const [cityError, setCityError] = useState<string | null>(null);
    const [priceError, setPriceError] = useState<string | null>(null);
    const [areaError, setAreaError] = useState<string | null>(null);
    const [freqError, setFreqError] = useState<string | null>(null);
    const [currencyError, setCurrencyError] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    const setField = (field: string, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            let error = false;

            // reset errors
            setTitleError(null);
            setDescError(null);
            setCityError(null);
            setLocationError(null);
            setPriceError(null);
            setAreaError(null);
            setFreqError(null);
            setCurrencyError(null);

            // verify fields
            if (form.title === "") {
                setTitleError("Title is required");
                error = true;
            }
            if (form.title.length > 100) {
                setTitleError("Title cannot exceed 100 characters");
                error = true;
            }
            if (form.description === "") {
                setDescError("Description is required");
                error = true;
            }
            if (form.description.length > 1000) {
                setDescError("Description cannot exceed 1000 characters");
                error = true;
            }
            if (form.city === "") {
                setCityError("City is required");
                error = true;
            }
            if (form.location === null) {
                setLocationError("Location is required");
                error = true;
            }
            if (form.price === "") {
                setPriceError("Price is required");
                error = true;
            }
            if (+form.price < 0) {
                setPriceError("Price cannot be negative");
                error = true;
            }
            if (form.area === "") {
                setAreaError("Area is required");
                error = true;
            }
            if (+form.area < 0) {
                setAreaError("Area cannot be negative");
                error = true;
            }
            if (form.frequency === "" && form.mode === "rent") {
                setFreqError("Pay Cycle is required");
                error = true;
            }
            if (form.currency === "") {
                setCurrencyError("Currency is required");
                error = true;
            }
            if (form.currency.length > 20) {
                setCurrencyError("Currency cannot exceed 20 characters");
                error = true;
            }

            if (error) {
                return scrollToTop();
            }

            // loading state
            setLoading(true);

            // append fields
            formData.append(
                "data",
                JSON.stringify({
                    ...form,
                    price: +form.price,
                    area: +form.area,
                    location:
                        form.location === null
                            ? null
                            : [form.location.lat, form.location.lng],
                    contacts: {
                        phones: form.contacts.phones.map((item) => item.value),
                        emails: form.contacts.emails.map((item) => item.value),
                        links: form.contacts.links.map((item) => ({
                            label: item.label,
                            url: item.url,
                        })),
                    },
                    images: form.images,
                })
            );

            // append images
            form.images.forEach((image: TImage) => {
                formData.append("images", image.file);
            });

            // send request
            let response;
            if (edit) {
                response = await axios.patch(
                    `/properties/edit/${id}`,
                    formData
                );
            } else {
                response = await axios.post("/properties/new", formData);
            }

            if (response.status === 200) {
                navigate(`/property/${response.data.propertyId.toString()}`);
            }
        } catch (err: any) {
            console.error(err);
            if (err.response.data.code === "IMAGE") {
                setImageError(err.response.data.error);
                scrollToTop();
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (edit) {
            (async () => {
                try {
                    const response = await axios.get(
                        `/properties/property/${id}`
                    );

                    if (response.status === 200) {
                        const property = response.data.property;

                        setForm({
                            ...property,
                            images: property.images.map((image: string) => ({
                                id: crypto.randomUUID(),
                                file: image as string,
                                type: "edit",
                            })) as TImage[],
                            location: new LatLng(
                                property.location[0],
                                property.location[1]
                            ),
                            contacts: {
                                phones: property.contacts.phones.map(
                                    (phone: string) => ({
                                        id: crypto.randomUUID(),
                                        value: phone,
                                    })
                                ),
                                emails: property.contacts.emails.map(
                                    (email: string) => ({
                                        id: crypto.randomUUID(),
                                        value: email,
                                    })
                                ),
                                links: property.contacts.links.map(
                                    (link: { label: string; url: string }) => ({
                                        id: crypto.randomUUID(),
                                        label: link.label,
                                        url: link.url,
                                    })
                                ),
                            },
                        });
                    }

                    setEditFound(true);
                } catch (err: any) {
                    console.error(err);
                } finally {
                    setEditLoading(false);
                }
            })();
        }
    }, []);

    if (edit && !editFound) {
        return (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {editLoading ? (
                    <IconLoader2 className="animate-spin text-5xl" />
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-2xl text-gray-400">
                            Property not found
                        </p>
                        <button
                            onClick={() => navigate(-1)}
                            className="text-blue-500"
                        >
                            Go back
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <main className="w-[80%] max-w-[860px] lg:w-[90%] m-auto pb-32">
            <h1 className="my-10 font-bold text-3xl xs:text-2xl">
                {edit ? "Edit" : "Post New"} Property
            </h1>

            <form className="flex justify-between md:flex-wrap gap-y-10">
                <FieldInputs
                    form={form}
                    setField={setField}
                    titleError={titleError}
                    descError={descError}
                    cityError={cityError}
                    setCityError={setCityError}
                    priceError={priceError}
                    areaError={areaError}
                    freqError={freqError}
                    currencyError={currencyError}
                />

                <MediaInputs
                    form={form}
                    setForm={setForm}
                    setField={setField}
                    locationError={locationError}
                    setLocationError={setLocationError}
                    imageError={imageError}
                    setImageError={setImageError}
                />
            </form>

            {/* submit form */}
            <button
                title={edit ? "Edit Property" : "Post Property"}
                className="bg-theme-1 w-[240px] h-[50px] rounded-xl font-bold text-xl text-white mt-12 relative left-1/2 -translate-x-1/2 transition hover:scale-[1.01] flex justify-center items-center disabled:opacity-50 disabled:pointer-events-none"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <IconLoader2 className="animate-spin text-3xl" />
                ) : edit ? (
                    "Edit Property"
                ) : (
                    "Post Property"
                )}
            </button>
        </main>
    );
};

export default New;
