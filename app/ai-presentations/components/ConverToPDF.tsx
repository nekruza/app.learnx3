import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const generatePDF = async (elementToPrintId: string) => {
  const container = document.getElementById(elementToPrintId);
  if (!container) {
    throw new Error(`Element with id ${elementToPrintId} not found`);
  }

  // Get all slides (assuming they have a common class or data attribute)
  const slides = container.querySelectorAll('.slide'); // Adjust selector based on your slide elements
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [129, 70],
  });

  // Process each slide
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i] as HTMLElement;

    // Save original styles
    const originalStyle = {
      position: slide.style.position,
      left: slide.style.left,
      top: slide.style.top,
      width: slide.style.width,
      height: slide.style.height,
      visibility: slide.style.visibility,
      display: slide.style.display
    };

    // Temporarily modify the slide for capture
    slide.style.position = 'absolute';
    slide.style.visibility = 'visible';
    slide.style.display = 'flex';
    slide.style.width = '100vw';
    slide.style.height = '100vh';

    const canvas = await html2canvas(slide, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: slide.scrollWidth,
      windowHeight: slide.scrollHeight
    });

    // Restore original styles
    Object.assign(slide.style, originalStyle);

    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    if (i > 0) {
      pdf.addPage();
    }
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  }

  pdf.save('presentation.pdf');
};