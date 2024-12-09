import React, { useEffect, useRef } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

 export const PdfViewer = ({ pdfBlob }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!pdfBlob) return;

    const renderPDF = async () => {
      GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";

      const loadingTask = getDocument({ data: pdfBlob });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1); // Render the first page (you can add pagination later)

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport,
      };

      await page.render(renderContext).promise;
    };

    renderPDF();
  }, [pdfBlob]);

  return <canvas ref={canvasRef} className="w-full h-96 rounded-lg"></canvas>;
};


