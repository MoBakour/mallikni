const About = () => {
    return (
        <main className="w-80% max-w-[900px] m-auto py-14 px-8 sm:px-4 flex flex-col gap-10">
            <section>
                <h2 className="text-3xl sm:text-2xl xs:text-xl font-bold mb-3">
                    Find Your Perfect Property with{" "}
                    <span className="text-theme-1">Mallikni</span>
                </h2>
                <p className="xs:text-sm">
                    Mallikni is your go-to platform for discovering, listing,
                    and managing real estate properties effortlessly. Whether
                    you're looking for a new home, an investment opportunity, or
                    a rental, our platform connects property owners with
                    interested buyers and renters in a seamless and
                    user-friendly experience. With advanced search filters and
                    detailed listings, finding the right property has never been
                    easier.
                </p>
            </section>

            <section>
                <h2 className="text-3xl sm:text-2xl xs:text-xl font-bold mb-3">
                    Seamless{" "}
                    <span className="text-theme-1">Property Management</span>{" "}
                    for Owners
                </h2>
                <p className="xs:text-sm">
                    For property owners, Mallikni provides a simple yet powerful
                    way to list properties with essential details, images,
                    location, and contact information. Owners can edit, update,
                    or remove their listings at any time, ensuring full control
                    over their properties. Plus, our platform allows users to
                    save favorite properties, manage personal account details,
                    and make adjustments like updating profile information or
                    deleting their account—all with just a few clicks.
                </p>
            </section>

            <section>
                <h2 className="text-3xl sm:text-2xl xs:text-xl font-bold mb-3">
                    A Smarter Way to Navigate the{" "}
                    <span className="text-theme-1">Real Estate</span> Market
                </h2>
                <p className="xs:text-sm">
                    With an intuitive design and user-focused features, Mallikni
                    simplifies the real estate process for everyone involved.
                    Whether you're searching for a dream home or aiming to reach
                    the right audience for your property, we offer the tools to
                    make the experience smooth and efficient. Start exploring
                    today and let Mallikni be your trusted real estate
                    companion!
                </p>
            </section>

            <section>
                <h2 className="text-3xl sm:text-2xl xs:text-xl font-bold mb-3">
                    Who Made This?
                </h2>
                <p className="xs:text-sm">
                    Mallikni was created by{" "}
                    <a
                        href="https://bakour.dev"
                        className="font-bold text-theme-1 transition hover:text-theme-hover"
                        target="_blank"
                    >
                        Mohamed Bakour
                    </a>
                    , a software developer who enjoys building projects for fun.
                    Driven by a passion for creating useful and innovative
                    solutions, Mohamed developed Mallikni as a way to improve
                    the real estate experience for both property owners and
                    seekers.
                </p>
            </section>
        </main>
    );
};

export default About;
