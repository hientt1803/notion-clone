"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "@/node_modules/next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { SingleImageDropzone } from "../single-image-dropzone";

const CoverImageModal = () => {
  const update = useMutation(api.documents.update);
  const params = useParams();

  const coverImage = useCoverImage();

  const [file, setFile] = useState<File>();
  const [isSubmitting, seTisSubmitting] = useState(false);

  const { edgestore } = useEdgeStore();

  const onClose = () => {
    setFile(undefined);
    seTisSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      seTisSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg text-semibold dark:text-white">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
