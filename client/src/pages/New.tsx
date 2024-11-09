import { useState } from "react";
import RadioInput from "../components/new/RadioInput";
import LocationsData from "../assets/countries.json";
import { ICountry, TImage } from "../types/types";
import SelectInput from "../components/new/SelectInput";
import NumberInput from "../components/new/NumberInput";
import CheckboxInput from "../components/new/CheckboxInput";
import ImageInput from "../components/new/ImageInput";
import { TContacts } from "../types/types";
import { LatLng } from "leaflet";
import IconClose from "../icons/IconClose";
import IconLocation from "../icons/IconLocation";
import Map from "../components/new/Map";
import ContactsInput from "../components/new/ContactsInput";

const New = () => {
    const [mode, setMode] = useState<string>("rent");
    const [category, setCategory] = useState<string>("residential");
    const [country, setCountry] = useState<string>("ae");
    const [city, setCity] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [area, setArea] = useState<number>(0);
    const [beds, setBeds] = useState<number>(0);
    const [baths, setBaths] = useState<number>(0);
    const [age, setAge] = useState<number>(0);
    const [furnished, setFurnished] = useState<boolean>(false);
    const [balcony, setBalcony] = useState<boolean>(false);
    const [elevator, setElevator] = useState<boolean>(false);
    const [parking, setParking] = useState<boolean>(false);
    const [security, setSecurity] = useState<boolean>(false);

    const [images, setImages] = useState<TImage[]>([]);
    const [position, setPosition] = useState<LatLng | null>(null);
    const [map, setMap] = useState<boolean>(false);

    const [contacts, setContacts] = useState<TContacts>({
        phones: [],
        emails: [],
        links: [],
    });

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
                        />
                    </label>

                    <label htmlFor="description">
                        <p className="pb-1 font-medium text-xl">Description</p>
                        <textarea
                            rows={4}
                            placeholder="Property description"
                            id="title"
                            className="py-1 px-3 rounded-md w-full"
                        />
                    </label>

                    <RadioInput
                        options={[
                            { label: "For rent", title: "rent" },
                            { label: "For sale", title: "sell" },
                        ]}
                        selection={mode}
                        setSelection={setMode}
                    />

                    <RadioInput
                        options={[
                            { label: "Residential", title: "residential" },
                            { label: "Commercial", title: "commercial" },
                        ]}
                        selection={category}
                        setSelection={setCategory}
                    />

                    <div className="flex justify-between">
                        <SelectInput
                            title="country"
                            value={country}
                            setValue={setCountry}
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
                            value={city}
                            setValue={setCity}
                        >
                            <>
                                <option>--Select City--</option>
                                {LocationsData.find(
                                    (item) =>
                                        item.code2.toLowerCase().trim() ===
                                        country.toLowerCase().trim()
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
                                value={price}
                                onChange={(e) =>
                                    setPrice(e.target.valueAsNumber)
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
                                value={area}
                                onChange={(e) =>
                                    setArea(e.target.valueAsNumber)
                                }
                            />
                        </label>
                    </div>

                    <div className="flex justify-between">
                        <NumberInput
                            title="Beds"
                            value={beds}
                            setValue={setBeds}
                        />
                        <NumberInput
                            title="Baths"
                            value={baths}
                            setValue={setBaths}
                        />
                        <NumberInput
                            title="Age"
                            value={age}
                            setValue={setAge}
                        />
                    </div>

                    <div className="flex flex-wrap gap-y-6 gap-x-24 justify-center">
                        <CheckboxInput
                            title="Furnished"
                            checked={furnished}
                            setChecked={setFurnished}
                        />
                        <CheckboxInput
                            title="Balcony"
                            checked={balcony}
                            setChecked={setBalcony}
                        />
                        <CheckboxInput
                            title="Elevator"
                            checked={elevator}
                            setChecked={setElevator}
                        />
                        <CheckboxInput
                            title="Parking"
                            checked={parking}
                            setChecked={setParking}
                        />
                        <CheckboxInput
                            title="Security"
                            checked={security}
                            setChecked={setSecurity}
                        />
                    </div>
                </section>

                <section className="flex flex-col gap-8 w-[400px]">
                    {/* image input */}
                    <div>
                        <p className="pb-1 font-medium text-xl">Images</p>

                        <div className="w-[240px]">
                            <ImageInput images={images} setImages={setImages} />
                        </div>
                    </div>

                    {/* location input */}
                    <div>
                        <p className="pb-1 font-medium text-xl">Location</p>
                        <button
                            type="button"
                            onClick={() => setMap(true)}
                            className="w-[240px] h-[160px] mb-6 bg-slate-300 rounded-2xl overflow-hidden flex justify-center items-center transition opacity-80 hover:opacity-100 cursor-pointer"
                            title="Select Location"
                        >
                            {position === null ? (
                                <IconLocation className="text-5xl text-gray-600" />
                            ) : (
                                <Map
                                    key={position.lat + position.lng}
                                    position={position}
                                    setPosition={setPosition}
                                    picker={false}
                                />
                            )}
                        </button>
                    </div>

                    {/* contacts input */}
                    <div>
                        <p className="pb-1 font-medium text-xl">Contacts</p>

                        <ContactsInput
                            contacts={contacts}
                            setContacts={setContacts}
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
                                    position={position}
                                    setPosition={setPosition}
                                />
                            </div>
                        </div>
                    )}
                </section>
            </form>

            {/* submit form */}
            <button
                title="Post Property"
                className="bg-theme-1 w-[240px] py-3 rounded-xl font-bold text-xl text-white mt-12 relative left-1/2 -translate-x-1/2 transition hover:scale-[1.01]"
            >
                Post Property
            </button>
        </main>
    );
};

export default New;
