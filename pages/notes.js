import Head from "next/head";
import { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import data from "../data/portfolio.json";

// PDF notes list
const pdfNotes = [
  {
    title: "IB HL Economics (Micro)",
    path: "/pdfs/micro.pdf",
    date: "2025-04-29",
  },
  {
    title: "Macroeconomics Notes",
    path: "/pdfs/macro.pdf",
    date: "to be made",
  },
];

const Notes = () => {
  const showNotes = useRef(data.showNotes || data.showBlog);
  const [isPdfError, setIsPdfError] = useState(false);
  const text = useRef();

  useEffect(() => {
    if (!showNotes.current) window.location.href = "/";
  }, []);

  const renderPdfViewer = (path) => {
    const handleError = () => {
      setIsPdfError(true);
    };

    return (
      <div className="relative w-full h-full">
        {isPdfError ? (
          <embed
            src={/pdfjs-5.2.133-legacy-dist/web/viewer.html?file=${encodeURIComponent(
              path
            )}}
            width="100%"
            height="100%"
            className="w-full h-full"
            title="PDF Viewer"
            frameBorder="0"
            onError={handleError}
          />
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <a href={path}>Download the PDF</a>.
          </div>
        )}
      </div>
    );
  };

  return (
    showNotes.current && (
      <>
        <Head>
          <title>Notes</title>
        </Head>
        <div className="relative">
          <Header isBlog={true} />
          <div className="mt-10 px-16">
            <h1 ref={text} className="text-4xl text-center mb-2">My Notes</h1>
            <p className="text-center text-sm opacity-50 mb-10">
              I only do this for non-STEM subjects because I find them harder 😭
            </p>
            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-8 items-center py-8">
              {pdfNotes.map((note, i) => (
                <div
                  key={note.title}
                  className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden transition hover:shadow-2xl border border-gray-100"
                >
                  <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <h1 className="text-2xl font-semibold text-gray-800">
                      {note.title}
                    </h1>
                  </div>

                  <div className="w-full h-[40vh] laptop:h-[70vh]">
                    {renderPdfViewer(note.path)}
                  </div>
                  <div className="py-4 p-6 border-b border-gray-200 bg-gray-50">
                    <p className="text-xs text-gray-400 mt-1">{note.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  );
};

export default Notes;