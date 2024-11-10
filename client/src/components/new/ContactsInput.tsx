import { useEffect, useRef, useState } from "react";
import IconDeleteFilled from "../../icons/IconDeleteFilled";
import { TContacts } from "../../types/types";
import { z } from "zod";

interface IContactsInput {
    contacts: TContacts;
    setForm: React.Dispatch<React.SetStateAction<any>>;
}

const ContactsInput = ({ contacts, setForm }: IContactsInput) => {
    const phoneInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const linkInput = useRef<HTMLInputElement>(null);
    const labelInput = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string | null>(null);

    const phoneSchema = z
        .string()
        .regex(
            /^(\+?\d{1,3})?[-.\s()]?(\d{3})[-.\s()]?(\d{3})[-.\s()]?(\d{4})$/,
            "Invalid phone number"
        );
    const emailSchema = z
        .string()
        .email("Invalid email address")
        .max(100, "Email too long (max 100 characters)");
    const linkSchema = z.object({
        url: z.string().url("Invalid URL"),
        label: z
            .string()
            .min(1, "Label cannot be empty")
            .max(30, "Label too long (max 30 characters)"),
    });

    const addContact = (type: string) => {
        if (type === "phone" && phoneInput.current?.value) {
            const phoneValidation = phoneSchema.safeParse(
                phoneInput.current.value
            );
            if (!phoneValidation.success) {
                showError(phoneValidation.error.errors[0].message);
                return;
            }

            setForm((prev: any) => ({
                ...prev,
                contacts: {
                    ...prev.contacts,
                    phones: [
                        ...prev.contacts.phones,
                        {
                            id: crypto.randomUUID(),
                            value: phoneInput.current!.value,
                        },
                    ],
                },
            }));

            phoneInput.current.value = "";
        } else if (type === "email" && emailInput.current?.value) {
            const emailValidation = emailSchema.safeParse(
                emailInput.current.value
            );
            if (!emailValidation.success) {
                showError(emailValidation.error.errors[0].message);
                return;
            }

            setForm((prev: any) => ({
                ...prev,
                contacts: {
                    ...prev.contacts,
                    emails: [
                        ...prev.contacts.emails,
                        {
                            id: crypto.randomUUID(),
                            value: emailInput.current!.value,
                        },
                    ],
                },
            }));

            emailInput.current.value = "";
        } else if (
            type === "link" &&
            linkInput.current?.value &&
            labelInput.current?.value
        ) {
            const linkValidation = linkSchema.safeParse({
                url: linkInput.current.value,
                label: labelInput.current.value,
            });
            if (!linkValidation.success) {
                showError(linkValidation.error.errors[0].message);
                return;
            }

            setForm((prev: any) => ({
                ...prev,
                contacts: {
                    ...prev.contacts,
                    links: [
                        ...prev.contacts.links,
                        {
                            id: crypto.randomUUID(),
                            label: labelInput.current!.value,
                            url: linkInput.current!.value,
                        },
                    ],
                },
            }));

            linkInput.current.value = "";
            labelInput.current.value = "";
        }
    };

    const removeContact = (type: string, id: string) => {
        setForm((prev: any) => ({
            ...prev,
            contacts: {
                ...prev.contacts,
                [type + "s"]: prev.contacts[type + "s"].filter(
                    (item: any) => item.id !== id
                ),
            },
        }));
    };

    const showError = (message: string) => {
        setError(message);
        setTimeout(() => {
            setError(null);
        }, 3000);
    };

    useEffect(() => {
        const handlePhoneEnter = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                addContact("phone");
            }
        };
        const handleEmailEnter = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                addContact("email");
            }
        };
        const handleLinkEnter = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                addContact("link");
            }
        };

        phoneInput.current?.addEventListener("keydown", handlePhoneEnter);
        emailInput.current?.addEventListener("keydown", handleEmailEnter);
        linkInput.current?.addEventListener("keydown", handleLinkEnter);
        labelInput.current?.addEventListener("keydown", handleLinkEnter);

        return () => {
            phoneInput.current?.removeEventListener(
                "keydown",
                handlePhoneEnter
            );
            emailInput.current?.removeEventListener(
                "keydown",
                handleEmailEnter
            );
            linkInput.current?.removeEventListener("keydown", handleLinkEnter);
            labelInput.current?.removeEventListener("keydown", handleLinkEnter);
        };
    }, []);

    return (
        <div className="flex flex-col gap-2">
            {error && <p className="text-error-1">{error}</p>}
            <div>
                <label htmlFor="phone" className="pb-1 font-medium text-md">
                    Phones
                </label>
                <div className="flex gap-2">
                    <input
                        type="tel"
                        placeholder="Phone number"
                        id="phone"
                        className="py-1 px-3 rounded-md"
                        ref={phoneInput}
                    />
                    <button
                        type="button"
                        className="py-1 px-3 rounded-md bg-slate-300 text-gray-600 font-bold transition opacity-80 hover:opacity-100"
                        onClick={() => addContact("phone")}
                    >
                        +
                    </button>
                </div>
                <div className="flex flex-col gap-1 mt-2 pl-2">
                    {contacts.phones.map((phone) => (
                        <div
                            key={phone.id}
                            className="flex gap-2 justify-center items-center w-fit"
                        >
                            <p>{phone.value}</p>
                            <IconDeleteFilled
                                className="transition text-error-1 hover:scale-110 cursor-pointer"
                                onClick={() => removeContact("phone", phone.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="email" className="pb-1 font-medium text-md">
                    Emails
                </label>
                <div className="flex gap-2">
                    <input
                        type="email"
                        placeholder="Email address"
                        id="email"
                        className="py-1 px-3 rounded-md"
                        ref={emailInput}
                    />
                    <button
                        type="button"
                        className="py-1 px-3 rounded-md bg-slate-300 text-gray-600 font-bold transition opacity-80 hover:opacity-100"
                        onClick={() => addContact("email")}
                    >
                        +
                    </button>
                </div>
                <div className="flex flex-col gap-1 mt-2 pl-2">
                    {contacts.emails.map((email) => (
                        <div
                            key={email.id}
                            className="flex gap-2 justify-center items-center w-fit"
                        >
                            <p>{email.value}</p>
                            <IconDeleteFilled
                                className="transition text-error-1 hover:scale-110 cursor-pointer"
                                onClick={() => removeContact("email", email.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="link" className="pb-1 font-medium text-md">
                    Links
                </label>
                <input
                    type="url"
                    placeholder="Link"
                    id="link"
                    className="py-1 px-3 mb-2 rounded-md block"
                    ref={linkInput}
                />
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Label"
                        className="py-1 px-3 rounded-md"
                        ref={labelInput}
                    />
                    <button
                        type="button"
                        className="py-1 px-3 rounded-md bg-slate-300 text-gray-600 font-bold transition opacity-80 hover:opacity-100"
                        onClick={() => addContact("link")}
                    >
                        +
                    </button>
                </div>
                <div className="flex flex-col gap-1 mt-2 pl-2">
                    {contacts.links.map((link) => (
                        <div
                            key={link.id}
                            className="flex gap-2 justify-center items-center w-fit"
                        >
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {link.label}
                            </a>
                            <IconDeleteFilled
                                className="transition text-error-1 hover:scale-110 cursor-pointer"
                                onClick={() => removeContact("link", link.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactsInput;
