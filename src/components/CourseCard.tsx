"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "lucide-react";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";
import { Course } from "@/data/courses";
import TimeHighlight from "@/components/TimeHighlight";

interface CourseCardProps {
    data: Course;
    usePolandTime: boolean;
    mounted: boolean;
    copiedLinks: Record<string, boolean>;
    handleCopyLink: (link: string, id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
    data,
    usePolandTime,
    mounted,
    copiedLinks,
    handleCopyLink,
}) => {
    return (
        <Card className="p-6 hover:shadow-lg hover:shadow-[#A5BEA4]/30 transition-all duration-200">
            <h2 className="text-xl font-semibold mb-4 text-[#566B5F]">
                {data.name}
            </h2>
            <div className="space-y-4">
                <div className="space-y-2">
                    <TimeHighlight
                        time={data.time}
                        usePolandTime={usePolandTime}
                        courseType="lecture"
                        mounted={mounted}
                    />
                    <div className="flex gap-2">
                        <a href={data.link} target="_blank" className="flex-1">
                            <Button
                                suppressHydrationWarning
                                className="w-full cursor-pointer bg-[#6A9A98] hover:bg-[#5D8683]"
                            >
                                Join Lecture Meeting
                            </Button>
                        </a>
                        <Tooltip>
                            <TooltipTrigger asChild className="cursor-pointer">
                                <button
                                    className="min-w-10 h-10 flex items-center justify-center bg-[#6A9A98] hover:bg-[#5D8683] text-white rounded-md"
                                    onClick={() =>
                                        handleCopyLink(
                                            data.link,
                                            `lecture-${data.id}`,
                                        )
                                    }
                                >
                                    {copiedLinks[`lecture-${data.id}`] ? (
                                        <CheckIcon className="h-4 w-4" />
                                    ) : (
                                        <CopyIcon className="h-4 w-4" />
                                    )}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {copiedLinks[`lecture-${data.id}`]
                                    ? "Copied!"
                                    : "Copy Link"}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                {data.lab && (
                    <div className="space-y-2">
                        <TimeHighlight
                            time={data.lab!.time}
                            usePolandTime={usePolandTime}
                            courseType="lab"
                            mounted={mounted}
                        />
                        <div className="flex gap-2">
                            <a
                                href={data.lab!.link}
                                target="_blank"
                                className="flex-1"
                            >
                                <Button
                                    suppressHydrationWarning
                                    className="w-full cursor-pointer bg-[#D1A979] hover:bg-[#BA9568]"
                                >
                                    Join Lab Meeting
                                </Button>
                            </a>
                            <Tooltip>
                                <TooltipTrigger
                                    asChild
                                    className="cursor-pointer"
                                >
                                    <button
                                        className="min-w-10 h-10 flex items-center justify-center bg-[#D1A979] hover:bg-[#BA9568] text-white rounded-md"
                                        onClick={() =>
                                            handleCopyLink(
                                                data.lab!.link,
                                                `lab-${data.id}`,
                                            )
                                        }
                                    >
                                        {copiedLinks[`lab-${data.id}`] ? (
                                            <CheckIcon className="h-4 w-4" />
                                        ) : (
                                            <CopyIcon className="h-4 w-4" />
                                        )}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {copiedLinks[`lab-${data.id}`]
                                        ? "Copied!"
                                        : "Copy Link"}
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default CourseCard;
