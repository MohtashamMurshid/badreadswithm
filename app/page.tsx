import Landing from "@/components/Landing";
import SearchBooks from "@/components/SearchBooks";
import BookCategories from "@/components/BookCategories";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="p-4 md:p-10 flex flex-col items-center space-y-4">
      <Landing />
      <SearchBooks />
      <BookCategories />
      <Footer />
    </div>
  );
}
