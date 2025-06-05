import React, { useEffect, useState } from 'react';
import { usePDFAnnotation } from './usePDFAnnotation';
import './pdfAnnotator.css';

const PDFAnnotator = ({ pdfUrl }) => {
  const [pageNum, setPageNum] = useState(1);
  const {
    TOOLS,
    tool,
    setupCanvas,
    changeTool,
    addText,
    undo,
    redo,
    exportAnnotations,
    importAnnotations,
  } = usePDFAnnotation();

  useEffect(() => {
    const interval = setInterval(() => {
      const pageId = `page-${pageNum}`;
      const pageElem = document.querySelector(`#${pageId} .pdf-page`);
      if (pageElem) {
        const { width, height } = pageElem.getBoundingClientRect();
        setupCanvas(pageId, width, height);
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [pageNum]);

  return (
    <div className="pdf-annotator">
      <div className="toolbar">
        <button onClick={() => changeTool(TOOLS.PEN)}>Pen</button>
        <button onClick={() => changeTool(TOOLS.HIGHLIGHT)}>Highlight</button>
        <button onClick={() => addText(`page-${pageNum}`)}>Text</button>
        <button onClick={() => undo(`page-${pageNum}`)}>Undo</button>
        <button onClick={() => redo(`page-${pageNum}`)}>Redo</button>
        <button onClick={() => {
          const data = exportAnnotations();
          console.log(JSON.stringify(data, null, 2));
        }}>
          Export JSON
        </button>
        <button onClick={() => {
          const json = prompt("Paste JSON:");
          if (json) importAnnotations(JSON.parse(json));
        }}>
          Load JSON
        </button>
        <button onClick={() => setPageNum((p) => Math.max(p - 1, 1))}>Prev</button>
        <button onClick={() => setPageNum((p) => p + 1)}>Next</button>
      </div>

      {/* To show PDF */}
      <div className="pdf-container">
        <html5-pdf-viewer src={pdfUrl} page={pageNum} id={`page-${pageNum}`} />
      </div>
    </div>
  );
};

export default PDFAnnotator;
