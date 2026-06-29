import { type Dispatch, type SetStateAction, useState } from "react";

import { pickAndUploadImage } from "./image-upload";

type ProjectImage = {
  id?: string;
  url: string;
  type: "COVER" | "BEFORE" | "AFTER" | "GENERAL";
  altText?: string | null;
};

export function useProjectImageUpload(
  images: ProjectImage[],
  setImages: Dispatch<SetStateAction<ProjectImage[]>>,
  onImageAdded: (newImageIndex: number) => void,
) {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handlePickImage = async () => {
    setIsUploadingImage(true);
    setUploadError(null);

    try {
      const uploadedUrl = await pickAndUploadImage();

      if (uploadedUrl) {
        const nextIndex = images.length;
        setImages((current) => [
          ...current,
          {
            url: uploadedUrl,
            type: current.length === 0 ? "COVER" : "GENERAL",
          },
        ]);
        onImageAdded(nextIndex);
      }
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Nao foi possivel enviar a foto.",
      );
    } finally {
      setIsUploadingImage(false);
    }
  };

  return { isUploadingImage, uploadError, handlePickImage };
}
