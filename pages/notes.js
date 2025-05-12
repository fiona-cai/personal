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
    pages: 4,
  },
  {
    title: "IB HL Economics (Macro)",
    path: "/pdfs/macro.pdf",
    date: "2025-05-03",
    pages: 6,
  },
  {
    title: "IB HL Economics (Global)",
    path: "/pdfs/global.pdf",
    date: "2025-05-12",
    pages: 5,
  },
  {
    title: "English Learner Portfolio (G11)",
    path: "/pdfs/g11eng.pdf",
    date: "2024-01-12",
    pages: 15,
  },
  {
    title: "English Learner Portfolio (G12)",
    path: "/pdfs/g12eng.pdf",
    date: "2025-04-30",
    pages: 41,
  },
];

const Notes = () => {
  const showNotes = useRef(data.showNotes || data.showBlog);
  const [isPdfError, setIsPdfError] = useState(false);
  const text = useRef();

  useEffect(() => {
    if (!showNotes.current) window.location.href = "/";
  }, []);

  const renderPdfPreview = (note) => {
    return (
      <div>
      <div className="relative w-full h-full">
        <object data={note.path} type="application/pdf" width="100%" height="100%">
        </object>
        {/* Fallback always visible */}
        <div className=" bottom-0 left-0 w-full text-center bg-gray-50 py-4">
      <a href={note.path} className="text-xl font-bold text-[#abcca3] hover:underline">
        Download
      </a>
    </div>
      </div>
      
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
          <div className="mt-10 px-12 tablet:px-24 laptop:px-24">
            <h1 ref={text} className="text-4xl text-center mb-2">My Notes</h1>
            <p className="text-center text-sm opacity-50 mb-10">
              I only do this for non-STEM subjects because I find them harder 😭
            </p>
            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-12 items-center py-8">
              {pdfNotes.map((note, i) => (
                <div
                  key={note.title}
                  className="mb-4 w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden transition hover:shadow-2xl border border-gray-100"
                >
                  <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between flex-wrap">
                    <h1 className="text-2xl font-semibold text-gray-800">
                      {note.title}
                    </h1>
                    <p className="text-md text-gray-500">{note.pages} Pages</p>
                  </div>

                  <div className="w-full h-auto">{renderPdfPreview(note)}</div>

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
