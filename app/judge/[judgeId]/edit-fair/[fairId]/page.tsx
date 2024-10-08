"use client";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import EditCompetition from "../../../_components/edit-competition";
import { Id } from "@/convex/_generated/dataModel";

const EditPage = ({ params }: { params: { fairId: Id<"fairs"> } }) => {
  const user = useQuery(api.users.getCurrentUser);
  const fair = useQuery(api.fairs.getSingleFairForJudge, {
    id: params.fairId as Id<"fairs">,
    userId: user?._id,
  });
  return (
    <div>
      {fair?.map((item) => (
        <EditCompetition
          key={item._id}
          title={item.title}
          subtitle={item.subtitle}
          initialDeadline={item.deadline!}
          initialAbout={item.about!}
          initialRequirements={item.requirements!}
          initialPrices={item.prices!}
          initialJudgingCriteria={item.judgingCriteria!}
          imageURL={item.imageUrl}
          fairId={params.fairId}
          fmrStorageId={item.storageId}
        />
      ))}
    </div>
  );
};

export default EditPage;
