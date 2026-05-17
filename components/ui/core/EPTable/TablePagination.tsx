'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../button';

// 1. Define the type for your meta object
export interface IMeta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}

// 2. Update the Props interface to include meta
interface TablePaginationProps {
    totalPage: number;
    restQuery?: string;
    meta: IMeta;
}

const TablePagination = ({
    totalPage,
    restQuery = '',
    meta,
}: TablePaginationProps) => {
    // 3. Initialize currentPage dynamically based on meta.page
    const [currentPage, setCurrentPage] = useState<number>(meta?.page || 1);
    const [usePagination, setUsePagination] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();

    // 4. Crucial step: Sync state if meta.page changes from the parent
    // (e.g., when new data finishes fetching or URL changes)
    useEffect(() => {
        if (meta?.page && meta.page !== currentPage) {
            setCurrentPage(meta.page);
        }
    }, [meta?.page]);

    const searchString = () => {
        const string: string[] = [];
        if (restQuery) {
            string.push(restQuery);
        }
        if (usePagination) {
            string.push(`page=${Number(currentPage)}`);
            router.push(`${pathname}?${string.join('&')}`);
        }
        setUsePagination(false);
    };

    useEffect(() => {
        searchString();
    }, [currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
            setUsePagination(true);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPage) {
            setCurrentPage((prev) => prev + 1);
            setUsePagination(true);
        }
    };

    const handlingCurrentPage = (index: number) => {
        setCurrentPage(index + 1);
        setUsePagination(true);
    };

    return (
        <div className="flex items-center gap-2 my-5 flex-wrap justify-center">
            <Button
                onClick={handlePrev}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            >
                <ArrowLeft className="size-4" />
            </Button>

            {/* Renders page numbers */}
            {[...Array(totalPage)].map((_, index) => (
                <Button
                    onClick={() => handlingCurrentPage(index)}
                    key={index}
                    variant={currentPage === index + 1 ? 'default' : 'outline'}
                    size="sm"
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                >
                    {index + 1}
                </Button>
            ))}

            <Button
                onClick={handleNext}
                disabled={currentPage === totalPage || totalPage === 0}
                variant="outline"
                size="sm"
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            >
                <ArrowRight className="size-4" />
            </Button>
        </div>
    );
};

export default TablePagination;
