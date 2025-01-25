import StarButton from "@/components/favourite-button";
import ReadLater from "@/components/readLater";
import { fetchOneBookInfo } from "@/utils/oneBookInfo";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const bookInfo = await fetchOneBookInfo((await params).id);

  return (
    <div className="p-10 max-w-4xl mx-auto">
      {/* Title and Subtitle */}
      <h1 className="text-3xl font-bold">{bookInfo.title}</h1>
      {bookInfo.subtitle && (
        <h2 className="text-xl text-gray-600 mt-2">{bookInfo.subtitle}</h2>
      )}

      {/* Thumbnail */}
      {bookInfo.thumbnail && (
        <Image
          src={bookInfo.thumbnail}
          alt={bookInfo.title}
          className="mt-4 w-48 h-auto rounded shadow-md"
          width={200}
          height={400}
        />
      )}

      <div className="mt-4 flex flex-row space-x-4">
        <SignedIn>
          <ReadLater id={(await params).id} />
          <StarButton id={(await params).id} />
        </SignedIn>
        <SignedOut>
          <p className="text-red-500">
            Sign in to add to your favourites and read later
          </p>
        </SignedOut>
      </div>

      {/* Authors */}
      {bookInfo.authors.length > 0 && (
        <p className="mt-4">
          <strong>Authors:</strong> {bookInfo.authors.join(", ")}
        </p>
      )}

      {/* Publisher and Published Date */}
      <p className="mt-2">
        <strong>Publisher:</strong> {bookInfo.publisher || "Unknown"}
      </p>
      <p>
        <strong>Published Date:</strong> {bookInfo.publishedDate || "Unknown"}
      </p>

      {/* Description */}
      {bookInfo.description && (
        <div className="mt-4">
          <strong>Description:</strong>
          <p
            className="text-gray-500 mt-2"
            dangerouslySetInnerHTML={{ __html: bookInfo.description }}
          ></p>
        </div>
      )}

      {/* Categories */}
      {bookInfo.categories.length > 0 && (
        <p className="mt-4">
          <strong>Categories:</strong> {bookInfo.categories.join(", ")}
        </p>
      )}

      {/* Industry Identifiers */}
      {bookInfo.isbn.length > 0 && (
        <div className="mt-4">
          <strong>Identifiers:</strong>
          <ul className="list-disc list-inside text-gray-700">
            {bookInfo.isbn.map((id: string) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Page Count */}
      <p className="mt-2">
        <strong>Page Count:</strong> {bookInfo.pageCount || "N/A"}
      </p>

      {/* Language */}
      <p>
        <strong>Language:</strong> {bookInfo.language.toUpperCase()}
      </p>

      {/* Buy Link */}
      {bookInfo.saleInfo?.buyLink && (
        <div className="mt-4">
          <a
            href={bookInfo.saleInfo.buyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Buy this book
          </a>
        </div>
      )}

      {/* Preview Link */}
      {bookInfo.previewLink && (
        <div className="mt-2">
          <a
            href={bookInfo.previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Preview this book
          </a>
        </div>
      )}
    </div>
  );
}
