"use client";

import { useQuery, useMutation } from "convex/react";
import dynamic from "next/dynamic";

import Toolbar from "@/app/(main)/_components/Toolbar";
import Cover from "@/components/Cover";

import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMemo } from "react";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const PreviewPage = ({ params }: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });
  const update = useMutation(api.documents.update);

  // Dynamic import
  const DocumentEditor = useMemo(
    () =>
      dynamic(() => import("@/app/(main)/_components/Editor"), {
        ssr: false,
      }),
    []
  );

  if (document === undefined) {
    return (
      <>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-14 w-[80%]" />
            <Skeleton className="h-14 w-[40%]" />
            <Skeleton className="h-14 w-[60%]" />
          </div>
        </div>
      </>
    );
  }

  if (document === null) {
    return <div>Not Found</div>;
  }

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  return (
    <div className="dark:bg-[#1F1F1F] pb-40 h-[100vh]">
      <Cover preview url={document.coverImage} />
      <div className="md:max-w-4xl mx-auto">
        <Toolbar preview initialData={document} />
        <DocumentEditor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};

export default PreviewPage;
