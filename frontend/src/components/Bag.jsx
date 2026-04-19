// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Plus, Trash2, Search, Pencil } from "lucide-react";

// const Bag = () => {
//   const [search, setSearch] = useState("");
//   const [editingNotebook, setEditingNotebook] = useState(null);
//   const [bag, setBag] = useState(() => {
//     const saved = localStorage.getItem("wisemind_bag");
//     return saved
//       ? JSON.parse(saved)
//       : {
//           name: "My Bag",
//           notebooks: []
//         };
//   });

//   const [activeNotebook, setActiveNotebook] = useState(null);
//   const [activePage, setActivePage] = useState(null);

//   useEffect(() => {
//     localStorage.setItem("wisemind_bag", JSON.stringify(bag));
//   }, [bag]);

//   const addNotebook = () => {
//     const newNotebook = {
//       id: Date.now(),
//       name: "New Notebook",
//       pages: []
//     };
//     setBag({ ...bag, notebooks: [...bag.notebooks, newNotebook] });
//   };

//   const addPage = () => {
//     if (!activeNotebook) return;

//     const updated = bag.notebooks.map(nb => {
//       if (nb.id === activeNotebook) {
//         return {
//           ...nb,
//           pages: [...nb.pages, { id: Date.now(), content: "" }]
//         };
//       }
//       return nb;
//     });

//     setBag({ ...bag, notebooks: updated });
//   };

//   const updateContent = (value) => {
//     const updated = bag.notebooks.map(nb => {
//       if (nb.id === activeNotebook) {
//         return {
//           ...nb,
//           pages: nb.pages.map(p =>
//             p.id === activePage ? { ...p, content: value } : p
//           )
//         };
//       }
//       return nb;
//     });

//     setBag({ ...bag, notebooks: updated });
//   };

//   const currentNotebook = bag.notebooks.find(nb => nb.id === activeNotebook);
//   const currentPage = currentNotebook?.pages.find(p => p.id === activePage);

//   return (
//     <div className="flex flex-col md:flex-row gap-4 h-[80vh]">

//       {/* LEFT SIDEBAR */}
//       <div className="flex flex-col md:w-1/4 gap-3 h-[40vh] md:h-full">

//         {/* NOTEBOOKS */}
//         <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex-1 min-h-0 flex flex-col overflow-hidden">
//           <div className="flex flex-col gap-2 mb-3">
//             <div className="flex justify-between items-center">
//               <h3 className="text-white font-semibold">Notebooks</h3>
//               <button onClick={addNotebook}>
//                 <Plus className="text-indigo-400 cursor-pointer" />
//               </button>
//             </div>

//             <input
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg outline-none"
//             />
//           </div>

//           <div className="space-y-2 flex-1 overflow-y-auto pr-1 min-h-0">
//             {bag.notebooks
//               .filter(nb =>
//                 nb.name.toLowerCase().includes(search.toLowerCase())
//               )
//               .map(nb => (
//                 <motion.div
//                   key={nb.id}
//                   whileHover={{ scale: 1.02 }}
//                   onClick={() => setActiveNotebook(nb.id)}
//                   className={`p-2 rounded-lg cursor-pointer ${
//                     activeNotebook === nb.id
//                       ? "bg-indigo-600 text-white"
//                       : "bg-gray-700 text-gray-300"
//                   }`}
//                 >
//                   {editingNotebook === nb.id ? (
//                     <input
//                       value={nb.name}
//                       onChange={(e) => {
//                         const updated = bag.notebooks.map(n =>
//                           n.id === nb.id
//                             ? { ...n, name: e.target.value }
//                             : n
//                         );
//                         setBag({ ...bag, notebooks: updated });
//                       }}
//                       onBlur={() => setEditingNotebook(null)}
//                       className="bg-transparent text-white outline-none"
//                       autoFocus
//                     />
//                   ) : (
//                     <div className="flex justify-between items-center">
//                       <span>{nb.name}</span>

//                       <div className="flex gap-2">
//                         <Pencil
//                           size={14}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setEditingNotebook(nb.id);
//                           }}
//                         />
//                         <Trash2
//                           size={14}
//                           className="text-red-400"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setBag({
//                               ...bag,
//                               notebooks: bag.notebooks.filter(
//                                 n => n.id !== nb.id
//                               )
//                             });
//                           }}
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </motion.div>
//               ))}
//           </div>
//         </div>

//         {/* PAGES */}
//         <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex-1 min-h-0 flex flex-col overflow-hidden">
//           <div className="flex justify-between mb-3">
//             <h3 className="text-white font-semibold">Pages</h3>
//             <button onClick={addPage}>
//               <Plus className="text-green-400 cursor-pointer" />
//             </button>
//           </div>

//           <div className="space-y-2 flex-1 overflow-y-auto pr-1 min-h-0">
//             {currentNotebook?.pages.map(p => (
//               <div
//                 key={p.id}
//                 onClick={() => setActivePage(p.id)}
//                 className={`p-2 rounded-lg cursor-pointer ${
//                   activePage === p.id
//                     ? "bg-green-600 text-white"
//                     : "bg-gray-700 text-gray-300"
//                 }`}
//               >
//                 <div className="flex justify-between items-center">
//                   <span>Page</span>
//                   <Trash2 size={14} className="text-red-400" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* MAIN EDITOR */}
//       <div className="flex-1 h-[60vh] md:h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col">

//         <h2 className="text-white text-lg font-semibold mb-3">
//           {currentNotebook?.name || "Editor"}
//         </h2>

//         {currentPage ? (
//           <>
//             <div className="flex gap-2 mb-3">
//               <button
//                 onClick={() =>
//                   updateContent(currentPage.content + "**bold**")
//                 }
//                 className="text-xs px-2 py-1 bg-gray-700 rounded"
//               >
//                 B
//               </button>
//               <button
//                 onClick={() =>
//                   updateContent(currentPage.content + "_italic_")
//                 }
//                 className="text-xs px-2 py-1 bg-gray-700 rounded"
//               >
//                 I
//               </button>
//             </div>

//             <textarea
//               value={currentPage.content}
//               onChange={(e) => updateContent(e.target.value)}
//               className="flex-1 min-h-0 w-full bg-gray-800 text-white rounded-lg p-4 focus:outline-none resize-none"
//             />
//           </>
//         ) : (
//           <div className="flex items-center justify-center flex-1 text-gray-400">
//             Select a page to start writing...
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Bag;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Search, Pencil, Book, FileText, Edit } from "lucide-react";

const Bag = () => {
  const [search, setSearch] = useState("");
  const [pageSearch, setPageSearch] = useState("");
  const [editingNotebook, setEditingNotebook] = useState(null);

  const [view, setView] = useState("editor"); // NEW

  const [bag, setBag] = useState(() => {
    const saved = localStorage.getItem("wisemind_bag");
    return saved
      ? JSON.parse(saved)
      : {
        name: "My Bag",
        notebooks: []
      };
  });

  const [activeNotebook, setActiveNotebook] = useState(null);
  const [activePage, setActivePage] = useState(null);
  // const [editorContent, setEditorContent] = useState("");

  // const updateContent = (value) => {
  //   const updated = bag.notebooks.map(nb => {
  //     if (nb.id === activeNotebook) {
  //       return {
  //         ...nb,
  //         pages: nb.pages.map(p =>
  //           p.id === activePage ? { ...p, content: value } : p
  //         )
  //       };
  //     }
  //     return nb;
  //   });

  //   setBag({ ...bag, notebooks: updated });
  // };

  const updateContent = (value) => {
  setBag(prev => {
    const updated = prev.notebooks.map(nb => {
      if (nb.id === activeNotebook) {
        return {
          ...nb,
          pages: nb.pages.map(p =>
            p.id === activePage ? { ...p, content: value } : p
          )
        };
      }
      return nb;
    });

    return { ...prev, notebooks: updated };
  });
};


  useEffect(() => {
    localStorage.setItem("wisemind_bag", JSON.stringify(bag));
  }, [bag]);

  // useEffect(() => {
  //   if (currentPage) {
  //     setEditorContent(currentPage.content || "");
  //   }
  // }, [activePage, activeNotebook]);

  const addNotebook = () => {
    const newNotebook = {
      id: Date.now(),
      name: "New Notebook",
      pages: []
    };
    setBag({ ...bag, notebooks: [...bag.notebooks, newNotebook] });
  };

  // ✅ UPDATED: Add page with numbering
  const addPage = () => {
    if (!activeNotebook) return;

    const updated = bag.notebooks.map(nb => {
      if (nb.id === activeNotebook) {
        const pageNumber = nb.pages.length + 1;
        return {
          ...nb,
          pages: [
            ...nb.pages,
            {
              id: Date.now(),
              content: "",
              title: `Page ${pageNumber}`
            }
          ]
        };
      }
      return nb;
    });

    setBag({ ...bag, notebooks: updated });
  };

  // const updateContent = (value) => {
  //   const updated = bag.notebooks.map(nb => {
  //     if (nb.id === activeNotebook) {
  //       return {
  //         ...nb,
  //         pages: nb.pages.map(p =>
  //           p.id === activePage ? { ...p, content: value } : p
  //         )
  //       };
  //     }
  //     return nb;
  //   });

  //   setBag({ ...bag, notebooks: updated });
  // };

  const currentNotebook = bag.notebooks.find(nb => nb.id === activeNotebook);
  const currentPage = currentNotebook?.pages.find(p => p.id === activePage);

  // =========================
  // 🔥 VIEWS
  // =========================

  const NotebooksView = () => (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-semibold">Notebooks</h2>
        <button onClick={addNotebook}>
          <Plus className="text-indigo-400" />
        </button>
      </div>

      <input
        placeholder="Search notebooks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-3 py-2 bg-gray-800 text-white rounded-lg outline-none"
      />

      <div className="flex-1 overflow-y-auto space-y-2">
        {bag.notebooks
          .filter(nb =>
            nb.name.toLowerCase().includes(search.toLowerCase())
          )
          .map(nb => (
            <motion.div
              key={nb.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setActiveNotebook(nb.id);
                setView("pages");
              }}
              className={`p-3 rounded-lg cursor-pointer ${activeNotebook === nb.id
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-300"
                }`}
            >
              {editingNotebook === nb.id ? (
                <input
                  value={nb.name}
                  onChange={(e) => {
                    const updated = bag.notebooks.map(n =>
                      n.id === nb.id
                        ? { ...n, name: e.target.value }
                        : n
                    );
                    setBag({ ...bag, notebooks: updated });
                  }}
                  onBlur={() => setEditingNotebook(null)}
                  className="bg-transparent text-white outline-none"
                  autoFocus
                />
              ) : (
                <div className="flex justify-between items-center">
                  <span>{nb.name}</span>
                  <div className="flex gap-2">
                    <Pencil
                      size={14}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingNotebook(nb.id);
                      }}
                    />
                    <Trash2
                      size={14}
                      className="text-red-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBag({
                          ...bag,
                          notebooks: bag.notebooks.filter(
                            n => n.id !== nb.id
                          )
                        });
                        setActiveNotebook(null);
                        setActivePage(null);
                        setView("notebooks");
                      }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
      </div>
    </div>
  );

  const PagesView = () => {
    if (!currentNotebook) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          Select a notebook first
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">
            {currentNotebook.name}
          </h2>
          <button onClick={addPage}>
            <Plus className="text-green-400" />
          </button>
        </div>

        {/* ✅ Page Search */}
        <input
          placeholder="Search pages..."
          value={pageSearch}
          onChange={(e) => setPageSearch(e.target.value)}
          className="mb-4 px-3 py-2 bg-gray-800 text-white rounded-lg outline-none"
        />

        <div className="flex-1 overflow-y-auto space-y-2">
          {currentNotebook.pages
            .filter(p =>
              p.title
                ?.toLowerCase()
                .includes(pageSearch.toLowerCase())
            )
            .map(p => (
              <div
                key={p.id}
                onClick={() => {
                  setActivePage(p.id);
                  setView("editor");
                }}
                className={`p-3 rounded-lg cursor-pointer ${activePage === p.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-300"
                  }`}
              >
                <div className="flex justify-between items-center">
                  <span>{p.title}</span>
                  <Trash2
                    size={14}
                    className="text-red-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      const updated = bag.notebooks.map(nb => {
                        if (nb.id === activeNotebook) {
                          return {
                            ...nb,
                            pages: nb.pages.filter(pg => pg.id !== p.id)
                          };
                        }
                        return nb;
                      });
                      setBag({ ...bag, notebooks: updated });
                      if (activePage === p.id) setActivePage(null);
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  // const EditorView = () => {

  //   return (<div className="h-full flex flex-col">
  //     <h2 className="text-white text-lg font-semibold mb-3">
  //       {currentNotebook?.name} {currentPage ? `> ${currentPage.title}` : ""}
  //     </h2>

  //     {currentPage ? (
  //       <>
  //         <div className="flex gap-2 mb-3">
  //           <button
  //             onClick={() =>
  //               updateContent(currentPage.content + "**bold**")
  //             }
  //             className="text-xs px-2 py-1 bg-gray-700 rounded"
  //           >
  //             B
  //           </button>
  //           <button
  //             onClick={() =>
  //               updateContent(currentPage.content + "_italic_")
  //             }
  //             className="text-xs px-2 py-1 bg-gray-700 rounded"
  //           >
  //             I
  //           </button>
  //         </div>

  //         {/* <textarea
  //           value={currentPage.content}
  //           onChange={(e) => updateContent(e.target.value)}
  //           className="flex-1 w-full bg-gray-800 text-white rounded-lg p-4 focus:outline-none resize-none"
  //         /> */}
  //         <textarea
  //           value={currentPage.content}
  //           onChange={(e) => updateContent(e.target.value)}
  //           // onBlur={() => updateContent(editorContent)}
  //           className="flex-1 w-full bg-gray-800 text-white rounded-lg p-4 focus:outline-none resize-none"
  //         />
  //       </>
  //     ) : (
  //       <div className="flex items-center justify-center flex-1 text-gray-400">
  //         Select a page to start writing...
  //       </div>
  //     )}
  //   </div>)
  // };

  return (
    <div className="relative h-[80vh] md:h-[85vh] bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex flex-col">

      {/* MAIN VIEW */}
      <div className="flex-1 overflow-hidden">
        {view === "notebooks" && <NotebooksView />}
        {view === "pages" && <PagesView />}
        {view === "editor" && (<div className="h-full flex flex-col">
      <h2 className="text-white text-lg font-semibold mb-3">
        {currentNotebook?.name} {currentPage ? `> ${currentPage.title}` : ""}
      </h2>

      {currentPage ? (
        <>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() =>
                updateContent(currentPage.content + "**bold**")
              }
              className="text-xs px-2 py-1 bg-gray-700 rounded"
            >
              B
            </button>
            <button
              onClick={() =>
                updateContent(currentPage.content + "_italic_")
              }
              className="text-xs px-2 py-1 bg-gray-700 rounded"
            >
              I
            </button>
          </div>

          {/* <textarea
            value={currentPage.content}
            onChange={(e) => updateContent(e.target.value)}
            className="flex-1 w-full bg-gray-800 text-white rounded-lg p-4 focus:outline-none resize-none"
          /> */}
          <textarea
            value={currentPage.content}
            onChange={(e) => updateContent(e.target.value)}
            // onBlur={() => updateContent(editorContent)}
            className="flex-1 w-full bg-gray-800 text-white rounded-lg p-4 focus:outline-none resize-none"
          />
        </>
      ) : (
        <div className="flex items-center justify-center flex-1 text-gray-400">
          Select a page to start writing...
        </div>
      )}
    </div>)}
      </div>

      {/* 🔥 Bottom Navigation */}
      <div className="mt-4 flex justify-around border-t border-white/10 pt-3">
        <button
          onClick={() => setView("notebooks")}
          className={`flex flex-col items-center ${view === "notebooks" ? "text-indigo-400" : "text-gray-400"
            }`}
        >
          <Book size={20} />
          <span className="text-xs">Notebooks</span>
        </button>

        <button
          onClick={() => setView("pages")}
          className={`flex flex-col items-center ${view === "pages" ? "text-green-400" : "text-gray-400"
            }`}
        >
          <FileText size={20} />
          <span className="text-xs">Pages</span>
        </button>

        <button
          onClick={() => setView("editor")}
          className={`flex flex-col items-center ${view === "editor" ? "text-purple-400" : "text-gray-400"
            }`}
        >
          <Edit size={20} />
          <span className="text-xs">Editor</span>
        </button>
      </div>
    </div>
  );
};

export default Bag;