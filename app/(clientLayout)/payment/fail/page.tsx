'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, RefreshCcw, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// 1. Internal component to safely read searchParams
function FailContent() {
    const searchParams = useSearchParams();
    const tran_id = searchParams.get('tran_id');

    return (
        <Card className="max-w-md w-full border-0 shadow-xl rounded-none">
            <CardContent className="p-8 md:p-10 text-center space-y-6">
                {/* Failure Icon Animation */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
                        <AlertCircle className="relative size-20 text-red-600 bg-white rounded-full" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900">
                        Payment Failed
                    </h1>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">
                        We couldn't process your payment
                    </p>
                </div>

                <Separator />

                {/* Transaction Details */}
                <div className="bg-gray-50 p-4 space-y-3 text-left">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground uppercase font-bold text-[10px] tracking-widest">
                            Transaction ID
                        </span>
                        <span className="font-mono font-medium text-black">
                            {tran_id || 'N/A'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground uppercase font-bold text-[10px] tracking-widest">
                            Status
                        </span>
                        <span className="font-bold text-red-600 uppercase text-[10px] tracking-widest">
                            Declined
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4">
                    {/* Assuming you have a checkout or cart route to retry */}
                    <Link href="/checkout" className="block">
                        <Button className="w-full h-14 bg-black text-white hover:bg-gray-800 rounded-none font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                            <RefreshCcw className="size-4" />
                            Try Again
                        </Button>
                    </Link>

                    <Link href="/cart" className="block">
                        <Button
                            variant="outline"
                            className="w-full h-14 rounded-none border-2 border-gray-200 hover:border-black hover:bg-gray-50 font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                            <ShoppingBag className="size-4" />
                            Return to Cart
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

// 2. Suspense boundary wrapper
export default function PaymentFailPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Suspense
                fallback={
                    <div className="text-center font-bold uppercase tracking-widest text-xs text-muted-foreground animate-pulse">
                        Loading transaction data...
                    </div>
                }
            >
                <FailContent />
            </Suspense>
        </div>
    );
}
