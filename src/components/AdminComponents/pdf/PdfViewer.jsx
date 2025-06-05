

import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { PDFDocument } from 'pdf-lib';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ title, riskassessment, documentCode, customer, location, safetyNotes, approvedBy }) => {
    const contentRef = useRef();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [annotations, setAnnotations] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleDownload = async () => {
        const element = contentRef.current;
        const opt = {
            margin: 0.5,
            filename: `${title.replace(/\s+/g, '_')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        const pdf = await html2pdf().set(opt).from(element).output('blob');
        const url = URL.createObjectURL(pdf);
        setPdfUrl(url);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleAnnotation = async (event) => {
        const { offsetX, offsetY } = event.nativeEvent;
        const newAnnotation = {
            x: offsetX,
            y: offsetY,
            text: window.prompt('Enter annotation text:'),
            timestamp: new Date().toISOString()
        };

        if (newAnnotation.text) {
            setAnnotations([...annotations, newAnnotation]);
        }
    };

    return (
        <div className="p-4">
            <div className="flex gap-4 mb-4">
                <button 
                    onClick={handleDownload} 
                    className="bg-blue-600 text-white px-4 py-2 rounded">
                    Generate PDF
                </button>
                {pdfUrl && (
                    <a 
                        href={pdfUrl} 
                        download={`${title.replace(/\s+/g, '_')}.pdf`}
                        className="bg-green-600 text-white px-4 py-2 rounded">
                        Download PDF
                    </a>
                )}
            </div>

            {/* Original content for PDF generation */}
            <div ref={contentRef} className="hidden">
                {/* ...existing code... */}
            </div>

            {/* PDF Preview */}
            {pdfUrl && (
                <div className="border rounded p-4">
                    <div className="flex justify-between mb-4">
                        <button 
                            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                            disabled={pageNumber <= 1}
                            className="bg-gray-600 text-white px-4 py-2 rounded">
                            Previous
                        </button>
                        <span>
                            Page {pageNumber} of {numPages}
                        </span>
                        <button 
                            onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                            disabled={pageNumber >= numPages}
                            className="bg-gray-600 text-white px-4 py-2 rounded">
                            Next
                        </button>
                    </div>
                    <div 
                        onClick={handleAnnotation}
                        className="relative cursor-crosshair"
                    >
                        <Document
                            file={pdfUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            <Page 
                                pageNumber={pageNumber}
                                renderAnnotationLayer={true}
                                renderTextLayer={true}
                            />
                        </Document>
                        {/* Render annotations */}
                        {annotations.map((annotation, index) => (
                            <div
                                key={index}
                                className="absolute bg-yellow-200 p-2 rounded shadow"
                                style={{
                                    left: annotation.x,
                                    top: annotation.y,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                {annotation.text}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PdfViewer;
