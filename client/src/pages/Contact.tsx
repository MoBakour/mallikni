const Contact = () => {
    return (
        <main className="w-80% max-w-[900px] m-auto py-14 px-8 sm:px-4 flex flex-col gap-10">
            <section>
                <h2 className="text-3xl sm:text-2xl xs:text-xl font-bold mb-3">
                    Let's Connect
                </h2>
                <p className="xs:text-sm mb-5">
                    I'd love to connect with you! Whether you have questions,
                    feedback, or just want to chat about real estate and
                    technology, feel free to reach out. I'm always open to
                    discussing ideas, helping with inquiries, or hearing about
                    your experience with{" "}
                    <span className="text-theme-1 font-bold">Mallikni</span>.
                    Don't hesitate to contact me through the available
                    channels—I'll do my best to get back to you as soon as
                    possible!
                </p>

                <ul className="flex justify-center gap-5 xs:text-sm xs:gap-3">
                    <li>
                        <a
                            href="https://www.linkedin.com/in/mobakour"
                            target="_blank"
                            className="text-blue-500 hover:underline"
                        >
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.bakour.dev"
                            target="_blank"
                            className="text-blue-500 hover:underline"
                        >
                            Portfolio
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.github.com/MoBakour"
                            target="_blank"
                            className="text-blue-500 hover:underline"
                        >
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.instagram.com/mo.bakour"
                            target="_blank"
                            className="text-blue-500 hover:underline"
                        >
                            Instagram
                        </a>
                    </li>
                    <li>
                        <a
                            href="mailto:mo.bakour@outlook.com"
                            className="text-blue-500 hover:underline"
                        >
                            Email
                        </a>
                    </li>
                </ul>
            </section>
        </main>
    );
};

export default Contact;
