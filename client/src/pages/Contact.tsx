const Contact = () => {
    return (
        <main className="w-80% max-w-[900px] m-auto py-14 px-8 sm:px-4">
            Find me on
            <ul className="list-disc pl-8">
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
        </main>
    );
};

export default Contact;
