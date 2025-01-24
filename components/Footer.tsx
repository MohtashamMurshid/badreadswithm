export default function Footer() {
  return (
    <footer className="p-4 text-gray-600">
      <p className="text-center">
        &copy; {new Date().getFullYear()} Bad Reads
      </p>
      <p>
        Developed by{" "}
        <a
          href="https://mohtasham.pages.dev"
          className="underline hover:scale-105 hover:text-gray-300"
        >
          Mohtasham
        </a>
      </p>
    </footer>
  );
}