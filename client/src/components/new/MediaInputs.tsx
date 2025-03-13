import React, { useState } from "react";
import IconClose from "../../icons/IconClose";
import IconLocation from "../../icons/IconLocation";
import ContactsInput from "./ContactsInput";
import ImageInput from "./ImageInput";
import Map from "./Map";

interface IMediaInputs {
    form: any;
    setForm: React.Dispatch<React.SetStateAction<any>>;
    setField: (field: string, value: any) => void;
    locationError: string | null;
    setLocationError: React.Dispatch<React.SetStateAction<string | null>>;
    imageError: string | null;
    setImageError: React.Dispatch<React.SetStateAction<string | null>>;
}

const MediaInputs = ({
    form,
    setForm,
    setField,
    locationError,
    setLocationError,
    imageError,
    setImageError,
}: IMediaInputs) => {
    const [map, setMap] = useState<boolean>(false);

    return (
        <section className="flex flex-col items-center gap-8 w-[400px] md:w-full">
            <div className="flex flex-col gap-8 md:flex-row md:flex-wrap md:justify-center md:items-center">
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
            </div>

            {/* contacts input */}
            <div>
                <p className="pb-1 font-medium text-xl">Contacts</p>

                <ContactsInput contacts={form.contacts} setForm={setForm} />
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
    );
};

export default MediaInputs;
