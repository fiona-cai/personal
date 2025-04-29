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
    title: "Microeconomics Notes",
    path: "/pdfs/micro.pdf",
    date: "2025-04-29",
  },
  {
    title: "Macroeconomics Notes",
    path: "/pdfs/macro.pdf",
    date: "2025-04-15",
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
          <div className="mt-10 px-4">
            <h1 ref={text} className="text-4xl text-center mb-2">My Notes</h1>
            <p className="text-center text-sm opacity-50 mb-10">
              I only do this for non-STEM subjects because I find them harder 😭
            </p>
            <div className="space-y-12">
              {pdfNotes.map((note, i) => (
                <div key={note.title} className="w-full max-w-5xl mx-auto shadow-lg rounded-xl overflow-hidden bg-white">
                  <div className="p-4 border-b">
                    <h2 className="text-2xl font-semibold">{note.title}</h2>
                    <p className="text-xs text-gray-500">{note.date}</p>
                  </div>
                  <div className="w-full h-[80vh]">
                    <iframe
                      src={note.path}
                      width="100%"
                      height="100%"
                      className="w-full h-full"
                      title={note.title}
                    />
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
