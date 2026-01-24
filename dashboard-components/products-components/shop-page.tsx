'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useShop } from '@/context/ShopContext';
import { AlertCircle, Store } from 'lucide-react';
import { CreateShopComponent } from './create-shop';
import { ShopDetailsCard } from './shop-detail-card';

export const ShopPage = () => {
    const { shopInfo, setIsLoading: setShopLoading } = useShop();

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            {/* Header Section */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <Store className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                                Shop Management
                            </h1>
                            <p className="text-xs text-muted-foreground font-medium">
                                {shopInfo
                                    ? 'Manage your store details'
                                    : 'Get started by creating a shop'}
                            </p>
                        </div>
                    </div>

                    {/* The Drawer Trigger Button is inside here */}
                    <CreateShopComponent
                        setShopLoading={setShopLoading}
                        shopInfo={shopInfo}
                    />
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-4 pt-8">
                {!shopInfo ? (
                    /* Empty State when no shop exists */
                    <Alert className="bg-white border-dashed border-2 py-12 flex flex-col items-center text-center gap-4">
                        <div className="bg-slate-100 p-4 rounded-full">
                            <AlertCircle className="h-10 w-10 text-slate-400" />
                        </div>
                        <div className="space-y-1">
                            <AlertTitle className="text-xl font-semibold">
                                No Shop Found
                            </AlertTitle>
                            <AlertDescription className="text-slate-500 max-w-xs">
                                You haven't set up a shop yet. Click the "Create
                                Shop" button above to register your business.
                            </AlertDescription>
                        </div>
                    </Alert>
                ) : (
                    /* The Shop Details Card we built */
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ShopDetailsCard shop={shopInfo} />
                    </div>
                )}
            </main>
        </div>
    );
};
