export default function Footer() {
  return (
    <footer className="p-4 text-gray-600 flex flex-col items-center">
      <p className="text-center">&copy; {new Date().getFullYear()} Bad Reads</p>
      <p>
        Developed by{" "}
        <a
          href="https://mohtasham.pages.dev"
          className="underline hover:scale-105 hover:text-gray-300 text-center"
        >
          Mohtasham
        </a>
      </p>
    </footer>
  );
}
