'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Package, Receipt } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// 1. Move the logic that reads searchParams into its own internal component
function SuccessContent() {
    const searchParams = useSearchParams();
    const tran_id = searchParams.get('tran_id');

    return (
        <Card className="max-w-md w-full border-0 shadow-xl rounded-none">
            <CardContent className="p-8 md:p-10 text-center space-y-6">
                {/* Success Icon Animation */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
                        <CheckCircle2 className="relative size-20 text-green-600 bg-white rounded-full" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900">
                        Payment Successful
                    </h1>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">
                        Thank you for your purchase
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
                        <span className="font-bold text-green-600 uppercase text-[10px] tracking-widest">
                            Paid
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4">
                    <Link
                        href="/dashboard/user/order-history"
                        className="block"
                    >
                        <Button className="w-full h-14 bg-black text-white hover:bg-gray-800 rounded-none font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                            <Receipt className="size-4" />
                            View Order Details
                        </Button>
                    </Link>

                    <Link href="/products" className="block">
                        <Button
                            variant="outline"
                            className="w-full h-14 rounded-none border-2 border-gray-200 hover:border-black hover:bg-gray-50 font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                            <Package className="size-4" />
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

// 2. The main page component wraps the content component in a Suspense boundary
export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Suspense
                fallback={
                    <div className="text-center font-bold uppercase tracking-widest text-xs text-muted-foreground animate-pulse">
                        Loading transaction data...
                    </div>
                }
            >
                <SuccessContent />
            </Suspense>
        </div>
    );
}
