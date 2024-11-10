import { useState } from "react";
import { LatLng } from "leaflet";
import LocationsData from "../assets/countries.json";
import { ICountry, TImage, TContacts } from "../types/types";

// icons
import IconClose from "../icons/IconClose";
import IconLocation from "../icons/IconLocation";

// components
import RadioInput from "../components/new/RadioInput";
import SelectInput from "../components/new/SelectInput";
import NumberInput from "../components/new/NumberInput";
import CheckboxInput from "../components/new/CheckboxInput";
import ImageInput from "../components/new/ImageInput";
import Map from "../components/new/Map";
import ContactsInput from "../components/new/ContactsInput";
import useAxios from "../hooks/useAxios";
import IconLoader2 from "../icons/IconLoader2";
import { useNavigate } from "react-router-dom";

const New = () => {
    const initialState = {
        title: "",
        description: "",
        mode: "rent",
        category: "residential",
        country: "ae",
        city: "",
        price: 0,
        area: 0,
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

    const axios = useAxios();
    const navigate = useNavigate();

    const [form, setForm] = useState(initialState);
    const [map, setMap] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // errors
    const [titleError, setTitleError] = useState<string | null>(null);
    const [descriptionError, setDescriptionError] = useState<string | null>(
        null
    );
    const [cityError, setCityError] = useState<string | null>(null);
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
                setDescriptionError("Description is required");
                error = true;
            }
            if (form.description.length > 1000) {
                setDescriptionError(
                    "Description cannot exceed 1000 characters"
                );
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
                    images: undefined,
                })
            );

            // append images
            form.images.forEach((image: TImage) => {
                formData.append("images", image.file);
            });

            // send request
            const response = await axios.post("/properties/new", formData);

            if (response.status === 200) {
                navigate(`/property/${response.data.property._id.toString()}`);
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

    return (
        <main className="w-[80%] m-auto pb-32">
            <h1 className="my-10 font-bold text-3xl">Post New Property</h1>

            <form className="flex justify-between">
                <section className="flex flex-col gap-8 w-[400px]">
                    <label htmlFor="title">
                        <p className="pb-1 font-medium text-xl">Title</p>
                        <input
                            type="text"
                            placeholder="Property title"
                            id="title"
                            className="py-1 px-3 rounded-md w-full"
                            value={form.title}
                            onChange={(e) => setField("title", e.target.value)}
                        />
                        <p className="text-sm text-error-1 mt-1 empty:mt-0">
                            {titleError}
                        </p>
                    </label>

                    <label htmlFor="description">
                        <p className="pb-1 font-medium text-xl">Description</p>
                        <textarea
                            rows={4}
                            placeholder="Property description"
                            id="description"
                            className="py-1 px-3 rounded-md w-full"
                            value={form.description}
                            onChange={(e) =>
                                setField("description", e.target.value)
                            }
                        />
                        <p className="text-sm text-error-1 mt-1 empty:mt-0">
                            {descriptionError}
                        </p>
                    </label>

                    <RadioInput
                        options={[
                            { label: "For rent", title: "rent" },
                            { label: "For sale", title: "sale" },
                        ]}
                        selection={form.mode}
                        setSelection={(value) => setField("mode", value)}
                    />

                    <RadioInput
                        options={[
                            { label: "Residential", title: "residential" },
                            { label: "Commercial", title: "commercial" },
                        ]}
                        selection={form.category}
                        setSelection={(value) => setField("category", value)}
                    />

                    <div className="flex justify-between">
                        <SelectInput
                            title="country"
                            value={form.country}
                            setValue={(value) => setField("country", value)}
                        >
                            {LocationsData.map((country: ICountry) => (
                                <option
                                    key={country.code2.toLowerCase().trim()}
                                    value={country.code2.toLowerCase().trim()}
                                >
                                    {country.name}
                                </option>
                            ))}
                        </SelectInput>

                        <SelectInput
                            title="city"
                            value={form.city}
                            setValue={(value) => setField("city", value)}
                            error={cityError}
                            setError={setCityError}
                        >
                            <>
                                <option value="">--Select City--</option>
                                {LocationsData.find(
                                    (item) =>
                                        item.code2.toLowerCase().trim() ===
                                        form.country.toLowerCase().trim()
                                )?.states.map((state) => (
                                    <option
                                        key={state.code.toLowerCase().trim()}
                                        value={state.code.toLowerCase().trim()}
                                    >
                                        {state.name}
                                    </option>
                                ))}
                            </>
                        </SelectInput>
                    </div>

                    <div className="flex justify-between">
                        <label htmlFor="price" className="flex-[0.45]">
                            <p className="pb-1 font-medium text-xl">Price</p>
                            <input
                                type="number"
                                placeholder="Property price"
                                id="price"
                                className="py-1 px-3 rounded-md w-full"
                                value={form.price}
                                onChange={(e) =>
                                    setField("price", e.target.valueAsNumber)
                                }
                            />
                        </label>

                        <label htmlFor="area" className="flex-[0.45]">
                            <p className="pb-1 font-medium text-xl">Area</p>
                            <input
                                type="number"
                                placeholder="Property area"
                                id="area"
                                className="py-1 px-3 rounded-md w-full"
                                value={form.area}
                                onChange={(e) =>
                                    setField("area", e.target.valueAsNumber)
                                }
                            />
                        </label>
                    </div>

                    <div className="flex justify-between">
                        <NumberInput
                            title="Beds"
                            value={form.beds}
                            setValue={(value) => setField("beds", value)}
                        />
                        <NumberInput
                            title="Baths"
                            value={form.baths}
                            setValue={(value) => setField("baths", value)}
                        />
                        <NumberInput
                            title="Age"
                            value={form.age}
                            setValue={(value) => setField("age", value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-y-6 gap-x-24 justify-center">
                        <CheckboxInput
                            title="Furnished"
                            checked={form.furnished}
                            setChecked={(value: any) =>
                                setField("furnished", value)
                            }
                        />
                        <CheckboxInput
                            title="Balcony"
                            checked={form.balcony}
                            setChecked={(value: any) =>
                                setField("balcony", value)
                            }
                        />
                        <CheckboxInput
                            title="Elevator"
                            checked={form.elevator}
                            setChecked={(value: any) =>
                                setField("elevator", value)
                            }
                        />
                        <CheckboxInput
                            title="Parking"
                            checked={form.parking}
                            setChecked={(value: any) =>
                                setField("parking", value)
                            }
                        />
                        <CheckboxInput
                            title="Security"
                            checked={form.security}
                            setChecked={(value: any) =>
                                setField("security", value)
                            }
                        />
                    </div>
                </section>

                <section className="flex flex-col gap-8 w-[400px]">
                    {/* image input */}
                    <div>
                        <p className="pb-1 font-medium text-xl">Images</p>

                        <div className="w-[240px]">
                            <ImageInput
                                images={form.images}
                                setImages={(value: any) =>
                                    setField("images", value)
                                }
                                error={imageError}
                                setError={setImageError}
                            />
                        </div>
                    </div>

                    {/* location input */}
                    <div className="w-[240px]">
                        <p className="pb-1 font-medium text-xl">Location</p>
                        <button
                            type="button"
                            onClick={() => {
                                setMap(true);
                                setLocationError(null);
                            }}
                            className="w-full h-[160px] mb-6 bg-slate-300 rounded-2xl overflow-hidden flex justify-center items-center transition opacity-80 hover:opacity-100 cursor-pointer"
                            title="Select Location"
                        >
                            {form.location === null ? (
                                <IconLocation className="text-5xl text-gray-600" />
                            ) : (
                                <Map
                                    key={form.location.lat + form.location.lng}
                                    location={form.location}
                                    setLocation={(value: any) =>
                                        setField("location", value)
                                    }
                                    picker={false}
                                />
                            )}
                        </button>
                        <p className="mb-6 mt-2 empty:mt-0 bg-error-2 text-error-1 text-sm px-2 py-2 empty:p-0 text-center rounded-md">
                            {locationError}
                        </p>
                    </div>

                    {/* contacts input */}
                    <div>
                        <p className="pb-1 font-medium text-xl">Contacts</p>

                        <ContactsInput
                            contacts={form.contacts}
                            setForm={setForm}
                        />
                    </div>

                    {/* map popup */}
                    {map && (
                        <div className="fixed z-10 inset-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-70">
                            {/* close popup */}
                            <button
                                type="button"
                                className="absolute top-5 right-5"
                                onClick={() => setMap(false)}
                                title="Close [ESC]"
                            >
                                <IconClose className="text-white text-4xl" />
                            </button>

                            <div className="w-[80%] h-[80%] rounded-2xl overflow-hidden">
                                <Map
                                    location={form.location}
                                    setLocation={(value: any) =>
                                        setField("location", value)
                                    }
                                />
                            </div>
                        </div>
                    )}
                </section>
            </form>

            {/* submit form */}
            <button
                title="Post Property"
                className="bg-theme-1 w-[240px] h-[50px] rounded-xl font-bold text-xl text-white mt-12 relative left-1/2 -translate-x-1/2 transition hover:scale-[1.01] flex justify-center items-center disabled:opacity-50 disabled:pointer-events-none"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <IconLoader2 className="animate-spin text-3xl" />
                ) : (
                    "Post Property"
                )}
            </button>
        </main>
    );
};

export default New;
