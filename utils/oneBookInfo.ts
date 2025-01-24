export async function fetchOneBookInfo(id: string) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching book info: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    title: data.volumeInfo.title || "Unknown Title",
    subtitle: data.volumeInfo.subtitle || null,
    description: data.volumeInfo.description || null,
    authors: data.volumeInfo.authors || [],
    publisher: data.volumeInfo.publisher || null,
    publishedDate: data.volumeInfo.publishedDate || null,
    thumbnail:
      data.volumeInfo.imageLinks?.thumbnail || "/images/placeholder.png",
    pageCount: data.volumeInfo.pageCount || null,
    categories: data.volumeInfo.categories || [],
    isbn:
      data.volumeInfo.industryIdentifiers?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (id: { type: any; identifier: any }) => `${id.type}: ${id.identifier}`
      ) || [],
    language: data.volumeInfo.language || "Unknown",
    previewLink: data.volumeInfo.previewLink || null,
    infoLink: data.volumeInfo.infoLink || null,
    canonicalVolumeLink: data.volumeInfo.canonicalVolumeLink || null,
    saleInfo: {
      isEbook: data.saleInfo.isEbook || false,
      saleability: data.saleInfo.saleability || "NOT_FOR_SALE",
      listPrice: data.saleInfo.listPrice
        ? `${data.saleInfo.listPrice.amount} ${data.saleInfo.listPrice.currencyCode}`
        : null,
      buyLink: data.saleInfo.buyLink || null,
    },
    accessInfo: {
      viewability: data.accessInfo.viewability || "NO_PREVIEW",
      embeddable: data.accessInfo.embeddable || false,
      publicDomain: data.accessInfo.publicDomain || false,
      textToSpeechPermission:
        data.accessInfo.textToSpeechPermission || "UNKNOWN",
      pdfAvailable: data.accessInfo.pdf?.isAvailable || false,
      webReaderLink: data.accessInfo.webReaderLink || null,
    },
  };
}
