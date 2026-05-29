'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Lock, Minus, Plus, RefreshCcw, Shield, Truck } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

export function CartDrawer({ children }: { children: React.ReactNode }) {
    const cartRef = useRef(null);

    // Future API/Redux State Wiring Points
    const [promoCode, setPromoCode] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');

    // Mock State (Replace with Redux cart state later)
    const subtotal = 59.0;
    const discount = 17.7; // e.g., from a SUMMER30 promo
    const estimatedShipping = 10.0;
    const grandTotal = subtotal - discount + estimatedShipping;

    const freeShippingThreshold = 100.0;
    const progressValue = (subtotal / freeShippingThreshold) * 100;

    useGSAP(
        () => {
            // Animate the progress bar fill on open
            gsap.from('.progress-fill', {
                width: 0,
                duration: 1.2,
                ease: 'power2.out',
                delay: 0.5,
            });

            // Staggered entrance for items and new accordion sections
            gsap.from('.cart-anim-item', {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: 'power3.out',
                delay: 0.3,
            });
        },
        { scope: cartRef },
    );

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent
                ref={cartRef}
                className="w-full sm:max-w-md flex flex-col p-0 bg-white"
            >
                {/* Header Section */}
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-xl font-bold uppercase tracking-tight">
                            Cart (1)
                        </SheetTitle>
                    </div>

                    {/* Shipping Progress */}
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                            Spend $
                            {(freeShippingThreshold - subtotal).toFixed(2)} more
                            and get free shipping!
                        </p>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                                className="progress-fill h-full bg-foreground"
                                style={{
                                    width: `${Math.min(progressValue, 100)}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Cart Item */}
                    <div className="cart-anim-item flex gap-4">
                        <div className="relative aspect-square w-24 bg-[#F5F5F5] overflow-hidden rounded-sm">
                            <Image
                                src="https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=300"
                                alt="Product"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 space-y-1">
                            <h4 className="font-bold uppercase text-sm leading-tight">
                                Cloud Werkshort
                            </h4>
                            <p className="text-sm font-medium">
                                ${subtotal.toFixed(2)}
                            </p>
                            <p className="text-xs text-muted-foreground uppercase">
                                Deep Grey / XL / 8
                            </p>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center border border-input rounded-sm">
                                    <button className="p-1 px-2 hover:bg-accent transition-colors">
                                        <Minus className="size-3" />
                                    </button>
                                    <span className="px-3 text-sm font-bold">
                                        1
                                    </span>
                                    <button className="p-1 px-2 hover:bg-accent transition-colors">
                                        <Plus className="size-3" />
                                    </button>
                                </div>
                                <button className="text-xs font-bold uppercase underline underline-offset-4 hover:text-red-600 transition-colors">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Exclusive Offer Banner */}
                    <div className="cart-anim-item relative overflow-hidden bg-black text-white p-8 group">
                        <div className="absolute inset-0 opacity-40">
                            <Image
                                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=500"
                                alt="worker"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <div className="flex gap-2 items-center">
                                <div className="w-1 h-4 bg-yellow-400" />
                                <span className="text-[10px] font-bold tracking-widest uppercase text-yellow-400">
                                    Exclusive Summer Offer
                                </span>
                            </div>
                            <h3 className="text-3xl font-black leading-none uppercase italic">
                                Buy One, Get One{' '}
                                <span className="text-yellow-400">30% OFF</span>
                            </h3>
                            <p className="text-[10px] opacity-80 max-w-[200px] leading-relaxed uppercase">
                                Technical performance meets summer comfort. Shop
                                T1 and Cloud WerkShorts.
                            </p>
                            <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-black uppercase rounded-none tracking-widest">
                                Shop the Sale
                            </Button>
                        </div>
                    </div>

                    <Separator className="cart-anim-item" />

                    {/* Missing Content Integration: Promo & Shipping Accordions */}
                    <div className="cart-anim-item">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2"
                        >
                            {/* Promo Code Accordion */}
                            <AccordionItem value="promo" className="border-b-0">
                                <AccordionTrigger className="hover:no-underline py-2 uppercase text-xs font-bold tracking-widest">
                                    Have a Promo Code?
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 pb-4">
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="ENTER CODE"
                                            className="rounded-none uppercase text-xs h-10 bg-gray-50 border-gray-200"
                                            value={promoCode}
                                            onChange={(e) =>
                                                setPromoCode(e.target.value)
                                            }
                                        />
                                        <Button className="rounded-none bg-black text-white hover:bg-gray-800 uppercase text-xs h-10 px-6 font-bold tracking-widest">
                                            Apply
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Estimate Shipping Accordion */}
                            <AccordionItem
                                value="shipping"
                                className="border-b-0"
                            >
                                <AccordionTrigger className="hover:no-underline py-2 uppercase text-xs font-bold tracking-widest">
                                    Estimate Shipping
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 pb-4 space-y-3">
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input
                                            placeholder="CITY"
                                            className="rounded-none uppercase text-xs h-10 bg-gray-50 border-gray-200"
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                        />
                                        <Input
                                            placeholder="ZIP CODE"
                                            className="rounded-none uppercase text-xs h-10 bg-gray-50 border-gray-200"
                                            value={zipCode}
                                            onChange={(e) =>
                                                setZipCode(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input
                                            placeholder="STREET NAME"
                                            className="rounded-none uppercase text-xs h-10 bg-gray-50 border-gray-200"
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                        />
                                        <Input
                                            placeholder="AREA NAME"
                                            className="rounded-none uppercase text-xs h-10 bg-gray-50 border-gray-200"
                                            value={zipCode}
                                            onChange={(e) =>
                                                setZipCode(e.target.value)
                                            }
                                        />
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-none uppercase text-xs h-10 font-bold tracking-widest border-gray-300"
                                    >
                                        Add Shipping Address
                                    </Button>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Expanded Footer Section */}
                <div className="p-6 bg-white border-t space-y-5">
                    {/* Detailed Order Summary */}
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between text-muted-foreground">
                            <span className="uppercase text-[11px] font-bold tracking-wider">
                                Subtotal
                            </span>
                            <span className="font-medium">
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>
                        {discount > 0 && (
                            <div className="flex items-center justify-between text-green-600">
                                <span className="uppercase text-[11px] font-bold tracking-wider">
                                    Discount
                                </span>
                                <span className="font-medium">
                                    -${discount.toFixed(2)}
                                </span>
                            </div>
                        )}
                        <div className="flex items-center justify-between text-muted-foreground">
                            <span className="uppercase text-[11px] font-bold tracking-wider">
                                Est. Shipping
                            </span>
                            <span className="font-medium">
                                ${estimatedShipping.toFixed(2)}
                            </span>
                        </div>

                        <Separator className="my-3" />

                        <div className="flex items-center justify-between">
                            <span className="font-black uppercase tracking-widest">
                                Grand Total
                            </span>
                            <span className="font-black text-lg">
                                ${grandTotal.toFixed(2)} USD
                            </span>
                        </div>
                    </div>

                    {/* Checkout Action */}
                    <Button className="w-full bg-[#1A1A1A] text-white hover:bg-black h-14 rounded-none font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                        Checkout <Lock className="size-4" />
                    </Button>

                    {/* Trust Badges */}
                    <div className="flex items-center justify-center gap-6 pt-2 text-[9px] uppercase text-muted-foreground font-bold tracking-widest">
                        <span className="flex flex-col items-center gap-1.5">
                            <Truck className="size-4 text-black" /> Free Ship
                            over $100
                        </span>
                        <span className="flex flex-col items-center gap-1.5">
                            <Shield className="size-4 text-black" /> Secure
                            Checkout
                        </span>
                        <span className="flex flex-col items-center gap-1.5">
                            <RefreshCcw className="size-4 text-black" /> Easy
                            Returns
                        </span>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
