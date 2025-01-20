const Footer = () => (
    <footer className="bg-gray-800 text-white py-6 text-center">
        <div className="container mx-auto">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} Carbon Credit System. All rights reserved.
            </p>
            <p className="mt-2 text-xs">
                Empowering sustainability through blockchain technology.
            </p>
        </div>
    </footer>
);

export default Footer;
