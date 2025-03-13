const PrivacyPolicy = () => {
    return (
        <main className="w-80% max-w-[900px] m-auto py-14 px-8 sm:px-4 flex flex-col gap-10">
            <section>
                <h2 className="text-3xl sm:text-2xl xs:text-xl font-bold mb-3">
                    Privacy Policy for{" "}
                    <span className="text-theme-1">Mallikni</span>
                </h2>
                <p className="xs:text-sm">
                    At Mallikni, we are committed to protecting your privacy.
                    This Privacy Policy explains how we collect, use, and
                    safeguard your personal information when you use our
                    services. By accessing and using Mallikni, you agree to the
                    terms set forth in this policy.
                </p>
            </section>

            <section>
                <h2 className="text-3xl sm:text-2xl xs:text-xl font-bold mb-3">
                    Information We Collect
                </h2>
                <p className="xs:text-sm">
                    We collect personal information that you provide directly to
                    us, such as your name, email address, and contact details
                    when you create an account, list a property, or manage your
                    profile. We may also collect data on how you use the
                    website, such as your browsing activities and search
                    preferences, to enhance your user experience.
                </p>
            </section>

            <section>
                <h2 className="text-3xl sm:text-2xl xs:text-xl font-bold mb-3">
                    How We Use Your Information
                </h2>
                <p className="xs:text-sm">
                    Your information is used to provide, personalize, and
                    improve our services. This includes managing your account,
                    processing property listings, sending relevant
                    notifications, and analyzing usage data to improve
                    functionality. We may also use your contact details to
                    respond to your inquiries and keep you informed about
                    updates or new features.
                </p>
            </section>

            <section>
                <h2 className="text-3xl sm:text-2xl xs:text-xl font-bold mb-3">
                    Data Sharing and Disclosure
                </h2>
                <p className="xs:text-sm">
                    We respect your privacy and do not share your personal
                    information with third parties except in the following
                    cases:
                    <ul className="list-disc pl-6">
                        <li>With your explicit consent or approval.</li>
                        <li>
                            If required by law or legal process to comply with
                            regulations.
                        </li>
                    </ul>
                </p>
            </section>

            <section>
                <h2 className="text-3xl sm:text-2xl xs:text-xl font-bold mb-3">
                    Data Security
                </h2>
                <p className="xs:text-sm">
                    We employ industry-standard security measures to protect
                    your personal data from unauthorized access, loss, or
                    misuse. While we take every reasonable precaution, no method
                    of transmission or storage is completely secure.
                </p>
            </section>

            <section>
                <h2 className="text-3xl sm:text-2xl xs:text-xl font-bold mb-3">
                    Your Rights
                </h2>
                <p className="xs:text-sm">
                    You have the right to access, update, or delete your account
                    and personal information at any time. You can also manage
                    your email preferences and communication settings. To
                    exercise these rights, please contact us through the
                    provided channels.
                </p>
            </section>

            <section>
                <h2 className="text-3xl sm:text-2xl xs:text-xl font-bold mb-3">
                    Cookies
                </h2>
                <p className="xs:text-sm">
                    Mallikni uses cookies to enhance your browsing experience.
                    Cookies are small text files stored on your device to
                    remember your preferences and improve the website's
                    functionality. You can control your cookie preferences
                    through your browser settings.
                </p>
            </section>

            <section>
                <h2 className="text-3xl sm:text-2xl xs:text-xl font-bold mb-3">
                    Changes to This Privacy Policy
                </h2>
                <p className="xs:text-sm">
                    We may update this Privacy Policy to reflect changes in our
                    practices. Any updates will be posted on this page with an
                    updated date. We encourage you to review this policy
                    periodically.
                </p>
            </section>

            <section>
                <h2 className="text-3xl sm:text-2xl xs:text-xl font-bold mb-3">
                    Contact Us
                </h2>
                <p className="xs:text-sm">
                    If you have any questions or concerns about our Privacy
                    Policy, please contact us at:
                    <br />
                    Email:{" "}
                    <a
                        href="mailto:mo.bakour@outlook.com"
                        className="text-theme-1"
                    >
                        mo.bakour@outlook.com
                    </a>
                    <br />
                    Address: Mallikni Inc. The Southern Hemisphere of Mars
                </p>
            </section>
        </main>
    );
};

export default PrivacyPolicy;
