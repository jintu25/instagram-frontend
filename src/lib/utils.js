import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// readAsDataURL.js
export const readAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // When the file is successfully read
    reader.onloadend = () => {
      resolve(reader.result); // Resolve the promise with the Data URL
    };

    // If an error occurs while reading the file
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    // Read the file as a Data URL
    reader.readAsDataURL(file);
  });
};

