'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Lock, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function CartDrawer({ children }: { children: React.ReactNode }) {
  const cartRef = useRef(null);
  const progressBarRef = useRef(null);

  // Mock State
  const cartTotal = 59.0;
  const freeShippingThreshold = 100.0;
  const progressValue = (cartTotal / freeShippingThreshold) * 100;

  useGSAP(
    () => {
      // Animate the progress bar fill on open
      gsap.from('.progress-fill', {
        width: 0,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.5,
      });

      // Staggered entrance for items
      gsap.from('.cart-item', {
        x: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        delay: 0.3,
      });
    },
    { scope: cartRef }
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
              Spend ${(freeShippingThreshold - cartTotal).toFixed(2)} more and
              get free shipping!
            </p>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="progress-fill h-full bg-foreground"
                style={{ width: `${progressValue}%` }}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Cart Item */}
          <div className="cart-item flex gap-4">
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
              <p className="text-sm font-medium">$59.00</p>
              <p className="text-xs text-muted-foreground uppercase">
                Deep Grey / XL / 8
              </p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center border border-input rounded-sm">
                  <button className="p-1 px-2 hover:bg-accent">
                    <Minus className="size-3" />
                  </button>
                  <span className="px-3 text-sm font-bold">1</span>
                  <button className="p-1 px-2 hover:bg-accent">
                    <Plus className="size-3" />
                  </button>
                </div>
                <button className="text-xs font-bold uppercase underline underline-offset-4 hover:text-red-600 transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Exclusive Offer Banner (Matching Image) */}
          <div className="cart-item relative overflow-hidden bg-black text-white p-8 group">
            {/* Background Image Overlay */}
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
                Technical performance meets summer comfort. Shop T1 and Cloud
                WerkShorts.
              </p>
              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-black uppercase rounded-none tracking-widest">
                Shop the Sale
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-6 bg-white border-t space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase">Subtotal</span>
            <span className="font-bold">$59.00 USD</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase">
            Taxes and <span className="underline italic">shipping</span>{' '}
            calculated at checkout
          </p>
          <Button className="w-full bg-[#1A1A1A] text-white hover:bg-black h-14 rounded-none font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            Checkout <Lock className="size-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
