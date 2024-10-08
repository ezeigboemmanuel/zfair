"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Link from "next/link";
import { ArrowBigDown, ArrowBigUp, Award, MessageSquare } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";

interface SubmissionCardProps {
  title: string;
  email: string;
  about: string;
  imageUrls: string[];
  link: string;
  userId: Id<"users">;
  creatorName?: string;
  upvotes: number | undefined;
  downvotes: number | undefined;
  votes:
    | {
        userId: Id<"users">;
        voteType: string;
      }[]
    | undefined;
  commentLength: number | undefined;
  winner: boolean | undefined;
}

const SubmissionCard = ({
  title,
  email,
  about,
  imageUrls,
  link,
  userId,
  creatorName,
  upvotes,
  downvotes,
  votes,
  commentLength,
  winner
}: SubmissionCardProps) => {
  const currentUser = useQuery(api.users.getCurrentUser);
  if (!currentUser) {
    return;
  }
  return (
    <Link href={`/${link}`}>
      <div className="relative mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg">
        {winner && <Award className="absolute top-2 left-0 fill-yellow-400 stroke-black stroke-1 w-10 h-10" />}

        {userId === currentUser?._id && (
          <div className="absolute z-10 top-0 right-0 bg-[#4eb645] text-white p-1 text-sm rounded-tr-md">
            Owner
          </div>
        )}
        <img
          className="rounded-t-lg w-full max-h-72 object-cover object-center"
          src={imageUrls.map((url) => url)[0]}
          alt=""
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Created by: {creatorName}
          </p>

          <div className="flex space-x-2 text-gray-600">
            <div className="flex">
              <ArrowBigUp
                className={`${votes?.find((vote) => vote.userId === currentUser._id)?.voteType == "upvote" ? "fill-[#4eb645] stroke-[#4eb645]" : ""}`}
              />
              <p>{upvotes ? upvotes : 0}</p>
            </div>
            <div className="flex">
              <ArrowBigDown
                className={`${votes?.find((vote) => vote.userId === currentUser._id)?.voteType == "downvote" ? "fill-[#4eb645] stroke-[#4eb645]" : ""}`}
              />
              <p>{downvotes ? downvotes : "0"}</p>
            </div>
            <div className="flex">
              <MessageSquare />
              <p>{commentLength ? commentLength : "0"}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubmissionCard;
