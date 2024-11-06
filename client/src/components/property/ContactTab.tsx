import { IProperty } from "../../types/types";

interface IContactTab {
    property: IProperty;
}

type TLink = {
    name: string;
    url: string;
};

// {
//     phones: ["+971-12-345-6789", "+90-123-456-7890"],
//     emails: ["email@gmail.com", "real@estate.com"],
//     links: [
//         {
//             name: "Instagram",
//             url: "https://instagram.com",
//         },
//     ],
// },

const ContactTab = ({ property }: IContactTab) => {
    return (
        <section className="flex flex-wrap justify-evenly gap-x-12 gap-y-2 text-lg">
            {/* phones */}
            <p className="font-bold">Phone</p>{" "}
            <div className="flex flex-col">
                {property.contacts.phones.map((phone, index) => (
                    <a
                        key={index}
                        href={`tel:${(phone as string)
                            .replace(/ /g, "")
                            .replace(/-/g, "")}`}
                        className="text-right text-blue-500"
                    >
                        {phone as string}
                    </a>
                ))}
            </div>
            {/* emails */}
            <p className="font-bold">Email</p>{" "}
            <div className="flex flex-col">
                {property.contacts.emails.map((email, index) => (
                    <a
                        key={index}
                        href={`mailto:${email}`}
                        className="text-right text-blue-500"
                    >
                        {email as string}
                    </a>
                ))}
            </div>
            {/* links */}
            <p className="font-bold">Links</p>{" "}
            <div className="flex flex-col">
                {property.contacts.links.map((link, index) => (
                    <a
                        key={index}
                        href={(link as TLink).url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-right text-blue-500"
                    >
                        {(link as TLink).name}
                    </a>
                ))}
            </div>
        </section>
    );
};

export default ContactTab;
