'use client';

import { useGSAP } from '@gsap/react';
import { zodResolver } from '@hookform/resolvers/zod';
import gsap from 'gsap';
import {
    BadgeDollarSign,
    BanknoteArrowDown,
    Lock,
    Minus,
    Plus,
    RefreshCcw,
    Shield,
    ShoppingBag,
    Truck,
    X,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

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

// --- Redux & Services Imports ---
import { orderType } from '@/constants';
import { useUser } from '@/context/UserContext';
import { useSocket } from '@/hooks/useSocket';
import { currencyFormatter } from '@/lib/currencyFormatters';
import {
    clearCart,
    couponSelector,
    decrementOrderQuantity,
    discountAmountSelector,
    fetchCoupon,
    grandTotalSelector,
    incrementOrderQuantity,
    orderedProductsSelector,
    orderSelector,
    removeProduct,
    shippingAddressSelector,
    shippingCostSelector,
    shopSelector,
    subTotalSelector,
    updateGlobalLoaderState,
    updatePaymentMethod,
    updateShippingAddress,
} from '@/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createOrder } from '@/services/CartServices';
import { IProduct } from '@/types';

// --- Validation Schema ---
const shippingAddressSchema = z.object({
    city: z.string().min(1, 'City required'),
    zip_code: z.string().min(1, 'Zip required'),
    street_or_building_name: z.string().min(1, 'Street required'),
    area: z.string().min(1, 'Area required'),
});

type shippingAddressData = z.infer<typeof shippingAddressSchema>;

export function CartDrawer({ children }: { children: React.ReactNode }) {
    const cartRef = useRef(null);
    const router = useRouter();

    // --- Hooks & Redux State ---
    const dispatch = useAppDispatch();
    const user = useUser();
    const { socket } = useSocket();

    const cartProducts = useAppSelector(orderedProductsSelector);
    const subTotal = useAppSelector(subTotalSelector);
    const discountAmount = useAppSelector(discountAmountSelector);
    const shippingCost = useAppSelector(shippingCostSelector);
    const grandTotal = useAppSelector(grandTotalSelector);
    const order = useAppSelector(orderSelector);
    const shippingAddress = useAppSelector(shippingAddressSelector);
    const coupon = useAppSelector(couponSelector);
    const shopId = useAppSelector(shopSelector);

    // --- Local UI State ---
    const [promoCode, setPromoCode] = useState('');
    const [isPaymentStep, setIsPaymentStep] = useState(false); // Controls the 2-step checkout UI

    // Form Setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
        getValues,
    } = useForm<shippingAddressData>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: {
            city: shippingAddress?.city ?? '',
            zip_code: shippingAddress?.zip_code ?? '',
            street_or_building_name:
                shippingAddress?.street_or_building_name ?? '',
            area: shippingAddress?.area ?? '',
        },
    });

    // Hydrate form from Redux if it exists
    useEffect(() => {
        if (shippingAddress) {
            reset({
                city: shippingAddress.city || '',
                zip_code: shippingAddress.zip_code || '',
                street_or_building_name:
                    shippingAddress.street_or_building_name || '',
                area: shippingAddress.area || '',
            });
        }
    }, [shippingAddress, reset]);

    // --- GSAP Animations ---
    const freeShippingThreshold = 100.0;
    const progressValue = (subTotal / freeShippingThreshold) * 100;

    useGSAP(
        () => {
            gsap.from('.progress-fill', {
                width: 0,
                duration: 1.2,
                ease: 'power2.out',
                delay: 0.5,
            });
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

    // --- Actions ---
    const applyPromoCode = async () => {
        if (!promoCode) return;
        try {
            await dispatch(
                fetchCoupon({
                    couponCode: promoCode,
                    subTotal: Number(subTotal),
                    shopId: String(shopId),
                }) as any,
            );
            setPromoCode('');
        } catch (error: any) {
            toast.error(error.message || 'Failed to apply promo');
        }
    };

    const handleRemovePromo = () => {
        // You might need a clearCoupon action in your slice to truly remove it
        // dispatch(clearCoupon());
    };

    // Step 1: Validate Form & Switch to Payment Options
    const handleProceedToCheckout = async () => {
        if (!user?.user) {
            toast.error('Please login first to checkout.');
            router.push('/login');
            return;
        }

        // Validate the react-hook-form inputs manually before proceeding
        const isValid = await trigger();
        if (!isValid) {
            toast.error('Please fill out all required shipping details.');
            return;
        }

        // Save validated address to Redux
        dispatch(updateShippingAddress(getValues()));

        // Switch UI to Payment Step with GSAP animation
        setIsPaymentStep(true);
        gsap.fromTo(
            '.payment-options-anim',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        );
    };

    // Step 2: Finalize Order API Call
    const handleFinalOrder = async (type: string) => {
        const toastId = toast.loading('Placing your order...');
        try {
            dispatch(
                updatePaymentMethod(type === orderType.cod ? 'COD' : 'Online'),
            );

            let orderData = coupon.code
                ? { ...order, coupon: coupon.code, OrderType: type }
                : { ...order };
            orderData.paymentMethod = type;

            const res = await createOrder(orderData);

            if (res.success) {
                socket.emit('orderPlaced');
                toast.success(res.message, { id: toastId });
                dispatch(clearCart());
                dispatch(updateGlobalLoaderState(true));
                router.push('/dashboard/user/order-history');
            } else {
                toast.error(res.message || 'Checkout failed', { id: toastId });
            }
        } catch (error: any) {
            toast.error(error.message || 'An error occurred', { id: toastId });
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent
                ref={cartRef}
                className="w-full sm:max-w-md flex flex-col p-0 bg-white"
            >
                {/* Header Section */}
                <div className="p-6 space-y-4">
                    <SheetTitle className="text-xl font-bold uppercase tracking-tight">
                        Cart ({cartProducts.length})
                    </SheetTitle>
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                            Spend $
                            {Math.max(
                                freeShippingThreshold - subTotal,
                                0,
                            ).toFixed(2)}{' '}
                            more for free shipping!
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

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Empty State */}
                    {cartProducts.length === 0 && (
                        <div className="text-center py-12 space-y-4">
                            <ShoppingBag className="mx-auto size-12 text-gray-300" />
                            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                Your cart is empty
                            </p>
                        </div>
                    )}

                    {/* Cart Items */}
                    {cartProducts.map((item: IProduct) => (
                        <div
                            key={item._id}
                            className="cart-anim-item flex gap-4"
                        >
                            <div className="relative aspect-square w-24 bg-[#F5F5F5] overflow-hidden rounded-sm">
                                <Image
                                    src={
                                        item.imageUrls[0] || '/placeholder.svg'
                                    }
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                                {!item.stock && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-white uppercase">
                                            Out
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 space-y-1">
                                <h4 className="font-bold uppercase text-sm leading-tight">
                                    {item.name}
                                </h4>
                                <p className="text-sm font-medium text-blue-600">
                                    $
                                    {item.offerPrice
                                        ? item.offerPrice.toFixed(2)
                                        : item.price.toFixed(2)}
                                </p>
                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center border border-input rounded-sm">
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    decrementOrderQuantity(
                                                        item._id,
                                                    ),
                                                )
                                            }
                                            disabled={item.stock <= 1}
                                            className="p-1 px-2 hover:bg-accent disabled:opacity-50"
                                        >
                                            <Minus className="size-3" />
                                        </button>
                                        <span className="px-3 text-sm font-bold">
                                            {item.orderQuantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    incrementOrderQuantity(
                                                        item._id,
                                                    ),
                                                )
                                            }
                                            disabled={
                                                !item.stock ||
                                                Boolean(
                                                    item.orderQuantity &&
                                                    item.orderQuantity >=
                                                        item.stock,
                                                )
                                            }
                                            className="p-1 px-2 hover:bg-accent disabled:opacity-50"
                                        >
                                            <Plus className="size-3" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() =>
                                            dispatch(removeProduct(item._id))
                                        }
                                        className="text-xs font-bold uppercase underline underline-offset-4 hover:text-red-600 transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Dynamic Accordions for Promo & Shipping Address */}
                    {cartProducts.length > 0 && (
                        <div className="cart-anim-item">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full space-y-2"
                            >
                                {/* PROMO CODE */}
                                <AccordionItem
                                    value="promo"
                                    className="border-b-0"
                                >
                                    <AccordionTrigger className="hover:no-underline py-2 uppercase text-xs font-bold tracking-widest">
                                        Have a Promo Code?
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2 pb-4">
                                        <div className="flex gap-2 mb-2">
                                            <Input
                                                placeholder="ENTER CODE"
                                                className="rounded-none uppercase text-xs h-10 bg-gray-50"
                                                value={promoCode}
                                                onChange={(e) =>
                                                    setPromoCode(e.target.value)
                                                }
                                            />
                                            <Button
                                                onClick={applyPromoCode}
                                                className="rounded-none bg-black text-white hover:bg-gray-800 uppercase text-xs h-10 px-6 font-bold tracking-widest"
                                            >
                                                Apply
                                            </Button>
                                        </div>
                                        {coupon?.code && (
                                            <div className="flex items-center justify-between bg-green-50 p-2 text-[10px] uppercase font-bold text-green-700 tracking-widest">
                                                <span>
                                                    Applied: {coupon.code}
                                                </span>
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={handleRemovePromo}
                                                />
                                            </div>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>

                                {/* SHIPPING DETAILS FORM (Replaces standard estimator) */}
                                <AccordionItem
                                    value="shipping"
                                    className="border-b-0"
                                >
                                    <AccordionTrigger className="hover:no-underline py-2 uppercase text-xs font-bold tracking-widest">
                                        Shipping Details (Required)
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2 pb-4">
                                        <form className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <Input
                                                        placeholder="CITY"
                                                        {...register('city')}
                                                        className={`rounded-none uppercase text-xs h-10 bg-gray-50 ${errors.city ? 'border-red-500' : ''}`}
                                                    />
                                                </div>
                                                <div>
                                                    <Input
                                                        placeholder="ZIP CODE"
                                                        {...register(
                                                            'zip_code',
                                                        )}
                                                        className={`rounded-none uppercase text-xs h-10 bg-gray-50 ${errors.zip_code ? 'border-red-500' : ''}`}
                                                    />
                                                </div>
                                            </div>
                                            <Input
                                                placeholder="STREET / BUILDING"
                                                {...register(
                                                    'street_or_building_name',
                                                )}
                                                className={`rounded-none uppercase text-xs h-10 bg-gray-50 ${errors.street_or_building_name ? 'border-red-500' : ''}`}
                                            />
                                            <Input
                                                placeholder="AREA"
                                                {...register('area')}
                                                className={`rounded-none uppercase text-xs h-10 bg-gray-50 ${errors.area ? 'border-red-500' : ''}`}
                                            />
                                        </form>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    )}
                </div>

                {/* Footer Pricing & Checkout */}
                <div className="p-6 bg-white border-t space-y-5">
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                            <span className="uppercase text-[11px] font-bold tracking-wider">
                                Subtotal
                            </span>
                            <span className="font-medium">
                                {currencyFormatter(subTotal)}
                            </span>
                        </div>
                        {discountAmount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span className="uppercase text-[11px] font-bold tracking-wider">
                                    Discount
                                </span>
                                <span className="font-medium">
                                    -{currencyFormatter(discountAmount)}
                                </span>
                            </div>
                        )}
                        <div className="flex justify-between text-muted-foreground">
                            <span className="uppercase text-[11px] font-bold tracking-wider">
                                Shipping
                            </span>
                            <span className="font-medium">
                                {currencyFormatter(shippingCost)}
                            </span>
                        </div>
                        <Separator className="my-3" />
                        <div className="flex justify-between">
                            <span className="font-black uppercase tracking-widest">
                                Grand Total
                            </span>
                            <span className="font-black text-lg text-blue-600">
                                {currencyFormatter(grandTotal)}
                            </span>
                        </div>
                    </div>

                    {/* TWO STEP CHECKOUT LOGIC */}
                    {!isPaymentStep ? (
                        <Button
                            onClick={handleProceedToCheckout}
                            disabled={cartProducts.length === 0}
                            className="w-full bg-[#1A1A1A] text-white hover:bg-black h-14 rounded-none font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                            Checkout <Lock className="size-4" />
                        </Button>
                    ) : (
                        <div className="payment-options-anim space-y-2">
                            <p className="text-[10px] text-center font-bold uppercase tracking-widest text-muted-foreground mb-3">
                                Select Payment Method
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    onClick={() =>
                                        handleFinalOrder(orderType.cod)
                                    }
                                    variant="outline"
                                    className="h-16 rounded-none border-2 flex flex-col items-center justify-center gap-1 hover:border-black hover:bg-gray-50"
                                >
                                    <BanknoteArrowDown className="size-5" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">
                                        COD
                                    </span>
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleFinalOrder(orderType.ssl)
                                    }
                                    variant="outline"
                                    className="h-16 rounded-none border-2 flex flex-col items-center justify-center gap-1 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 text-blue-600 border-blue-200"
                                >
                                    <BadgeDollarSign className="size-5" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">
                                        Pay Online
                                    </span>
                                </Button>
                            </div>
                            <button
                                onClick={() => setIsPaymentStep(false)}
                                className="w-full mt-2 text-[10px] font-bold uppercase underline underline-offset-4 text-muted-foreground hover:text-black"
                            >
                                ← Back to Cart
                            </button>
                        </div>
                    )}

                    <div className="flex items-center justify-center gap-6 pt-2 text-[9px] uppercase text-muted-foreground font-bold tracking-widest">
                        <span className="flex flex-col items-center gap-1.5">
                            <Truck className="size-4 text-black" /> Fast Ship
                        </span>
                        <span className="flex flex-col items-center gap-1.5">
                            <Shield className="size-4 text-black" /> Secure
                        </span>
                        <span className="flex flex-col items-center gap-1.5">
                            <RefreshCcw className="size-4 text-black" /> Returns
                        </span>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
