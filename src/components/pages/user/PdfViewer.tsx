// /* eslint-disable @typescript-eslint/no-explicit-any */
// // PdfViewer.tsx
// import React from "react";
// import { Document, Page } from "react-pdf";
// import { useState, } from "react";

// interface PdfViewerProps {
//   pdfUrl: string | Uint8Array | null;
// }

// const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [pageNumber, setPageNumber] = useState<number>(1);

//   // Callback when PDF is loaded
//   const onLoadSuccess = ({ numPages }: any) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div className="pdf-viewer-container">
//       <Document
//         file={pdfUrl}
//         onLoadSuccess={onLoadSuccess}
//         loading={<div>Loading...</div>}
//         error={<div>Failed to load PDF</div>}
//       >
//         <Page pageNumber={pageNumber} />
//       </Document>

//       <div className="pagination">
//         <button
//           onClick={() => setPageNumber(pageNumber - 1)}
//           disabled={pageNumber === 1}
//         >
//           Previous
//         </button>
//         <span>
//           Page {pageNumber} of {numPages}
//         </span>
//         <button
//           onClick={() => setPageNumber(pageNumber + 1)}
//           disabled={pageNumber === numPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PdfViewer;
