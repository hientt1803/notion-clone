"use client";
import { useQuery, useMutation } from "convex/react";

import Toolbar from "@/app/(main)/_components/Toolbar";
import Cover from "@/components/Cover";
import Editor from "@/app/(main)/_components/Editor";

import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });
  const update = useMutation(api.documents.update);

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
    <div className="dark:bg-[#212121] pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
