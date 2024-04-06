import React, { useEffect, useRef, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from '@/lib/utils'
import { Bakbak_One, Bebas_Neue } from 'next/font/google'
import { Button } from './ui/button'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import Link from 'next/link'
const bakbak_one = Bakbak_One({
    weight: ['400'],
    style: 'normal',
    subsets: ['latin'],
})
const bebas_nueue = Bebas_Neue({
    weight: ['400'],
    style: 'normal',
    subsets: ['latin'],
})

const EpisodesList = ({ episodes, currentEp, animeId }) => {
    const [currentEpPage, setCurrentEpPage] = useState(0);
    const episodesPerPage = 100;

    const startIndex = currentEpPage * episodesPerPage;
    const endIndex = Math.min(startIndex + episodesPerPage, episodes?.length);
    const currentEpisodes = episodes?.slice(startIndex, endIndex);

    const totalPages = Math.ceil(episodes?.length / episodesPerPage);

    const handlePageChange = (page) => {
        setCurrentEpPage(page);
    };
    useEffect(() => {
        const element = document.getElementById(currentEp?.episodeId);
        if (element) {
            element.scrollIntoView();
            window.scrollTo({
                top: 0,
                behavior: 'instant',
            });
        }
    }, [currentEp]);
    const [openEps, setOpenEps] = useState(true)
    return (
        <div className={cn("mb-4 px-2 flex flex-col z-0", openEps && "h-[47vh] md:h-[90vh] overflow-y-scroll no-scrollbar", !openEps && "h-12 lg:right-10 lg:top-1 lg:outline rounded-lg outline-secondary lg:absolute lg:w-48 lg:opacity-50 lg:hover:opacity-90")}>
            <div className="flex justify-between items-center z-20">
                <h2 className={cn("text-xl font-semibold mb-2 text-secondary", bakbak_one.className)}>Episodes</h2>
                <Button onClick={() => { setOpenEps(!openEps) }} variant="outline"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 focus:outline-none">
                    {openEps && <ChevronUp className="h-5 w-5" />}
                    {!openEps && <ChevronDown className="h-5 w-5" />}
                </Button>
            </div>
            <ScrollArea scrollHideDelay={1000} className={cn("relative w-full rounded-sm border flex-1")}>
                {
                    !openEps &&
                    <div className='absolute hidden dark:block inset-0 bg-gradient-to-b from-primary/10 via-gray-900/10 to-gray-950 hover:to-black z-10'></div>
                }
                <ul className="space-y-2 p-1 max-h-full overflow-y-scroll no-scrollbar" >
                    {
                        currentEpisodes?.map((episode) =>
                            <Link scroll={false} className='scroll-smooth' id={episode.episodeId} key={episode.episodeId} href={`/watch/${encodeURI(animeId)}?ep=${episode.number}`}>
                                <li className={cn("border rounded-tl-sm flex rounded-sm space-x-1 items-center hover:bg-primary/60 cursor-pointer min-h-14", episode.isFiller && "bg-red-400", currentEp?.episodeId == episode.episodeId && "bg-primary hover:bg-primary", bebas_nueue.className)} >
                                    <span className="pt-4 pl-1 pr-2 text-xl rounded-tl-sm rounded-bl-sm w-10 bg-secondary h-14 text-white">{episode.number}</span>
                                    <p className="text-md md:text-lg flex-1 overflow-hidden h-5">
                                        {episode.title}
                                    </p>
                                </li>
                            </Link>
                        )
                    }

                </ul>
            </ScrollArea>
            <div className="mt-4">
                {openEps && totalPages > 1 &&
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => currentEpPage !== 0 && handlePageChange(currentEpPage - 1)}
                                />
                            </PaginationItem>
                            {episodes && [...Array(Math.min(3, totalPages - currentEpPage))].map((_, i) => {
                                const pageNumber = currentEpPage + i;
                                return (
                                    <PaginationItem key={pageNumber}>
                                        <Button
                                            onClick={() => handlePageChange(pageNumber)}
                                            className={cn("text-white", pageNumber === currentEpPage && 'bg-secondary')}
                                        >
                                            {pageNumber + 1}
                                        </Button>
                                    </PaginationItem>
                                );
                            })}
                            {currentEpPage < totalPages && (
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handlePageChange(Math.min(currentEpPage + 1, totalPages - 1))}
                                    />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                }
            </div>
        </div>
    )
}

export default EpisodesList