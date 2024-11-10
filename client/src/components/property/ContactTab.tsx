import { IProperty, TLink } from "../../types/types";

interface IContactTab {
    property: IProperty;
}

const ContactTab = ({ property }: IContactTab) => {
    return (
        <section className="flex flex-wrap justify-evenly gap-x-12 gap-y-2 text-lg">
            {/* phones */}
            <p className="font-bold">Phone</p>{" "}
            <div className="flex flex-col">
                {property.contacts.phones.map((phone, index) => (
                    <a
                        key={index}
                        href={`tel:${(phone as unknown as string)
                            .replace(/ /g, "")
                            .replace(/-/g, "")}`}
                        className="text-right text-blue-500"
                    >
                        {phone as unknown as string}
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
                        {email as unknown as string}
                    </a>
                ))}
            </div>
            {/* links */}
            <p className="font-bold">Links</p>{" "}
            <div className="flex flex-col">
                {property.contacts.links.map((link: TLink, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-right text-blue-500"
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </section>
    );
};

export default ContactTab;
