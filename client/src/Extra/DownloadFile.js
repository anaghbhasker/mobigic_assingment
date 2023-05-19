export const downloadFile = (fileData, fileType, fileName) => {
    const link = document.createElement('a');
    link.href = fileData;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


export function getBase64Extension(base64Data) {
    // Extract the base64 file type
  const regex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9]+)(;base64)?,/i;
  const match = base64Data.match(regex);

  if (match && match[1]) {
    const mimeType = match[1].toLowerCase();

    if (mimeType.includes('image/')) {
      return mimeType.split('/')[1]; // Extract image extension
    } else if (mimeType.includes('pdf')) {
      return 'pdf'; // PDF extension
    }
  }

  // Return a default extension if no match was found
  return 'unknown';
  }