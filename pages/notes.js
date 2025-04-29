import Head from "next/head";
import { useRef } from "react";
import { stagger } from "../animations";
import Header from "../components/Header";
import Footer from "../components/Footer";
import data from "../data/portfolio.json";
import { useIsomorphicLayoutEffect } from "../utils";

// PDF notes list
const pdfNotes = [
  {
    title: "IB HL Economics (Micro)",
    path: "/pdfs/micro.pdf",
    date: "2025-04-29",
  },
  {
    title: "IB HL Economics (Macro)",
    path: "/pdfs/macro.pdf",
    date: "to be made",
  },
];

const Notes = () => {
  const showNotes = useRef(data.showNotes || data.showBlog);
  const text = useRef();

  useIsomorphicLayoutEffect(() => {
    stagger([text.current], { y: 40, x: -10 }, { y: 0, x: 0 });
    if (!showNotes.current) window.location.href = "/";
  }, []);

  return (
    showNotes.current && (
      <>
        <Head>
          <title>Notes</title>
        </Head>
        <div className="relative">
          <div className="gradient-circle3"></div>
          <div className="gradient-circle-bottom"></div>
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
                  <iframe
  src={`/pdfjs-5.2.133-dist/web/viewer.html?file=${encodeURIComponent(note.path)}#pagemode=none`}
  width="100%"
  height="100%"
  className="w-full h-full"
  title={note.title}
/>








                  </div>
                  <div className=" py-4 p-6 border-b border-gray-200 bg-gray-50">
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
