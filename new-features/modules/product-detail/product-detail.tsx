'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { addProduct } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { getAllProducts } from '@/services/ProductServices';
import { IProduct } from '@/types';
import {
    Minus,
    Plus,
    RotateCcw,
    Share2,
    Shield,
    ShoppingCart,
    Truck,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ProductGallery } from './components/product-gallery';
import { SimilarProducts } from './components/similar-products';
import { StarRating } from './components/star-rating';

export default function ProductDetailFeature({
    product,
}: {
    product: IProduct;
}) {
    const [quantity, setQuantity] = useState(1);
    const [email, setEmail] = useState('');
    const dispatch = useAppDispatch();
    const [similarProduct, setSimilarProduct] = useState<IProduct[]>([]);
    const productSectionRef = useRef(null);

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () =>
        setQuantity((prev) => Math.max(1, prev - 1));

    const handleAddProduct = (product: IProduct) => {
        product.quantity = quantity;
        dispatch(addProduct(product));
    };

    const handleSubscribe = () => {
        setEmail('');
    };

    useEffect(() => {
        getSimilarProducts();
    }, []);

    const getSimilarProducts = async () => {
        try {
            if (typeof product.category === 'string') {
                return;
            }
            const res = await getAllProducts(undefined, '4', {
                category: product.category._id,
            });
            setSimilarProduct(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full bg-gray-50 py-8">
            <div className=" px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-1/4 space-y-6">
                        {/* App Download Banner */}
                        <Card className="bg-yellow-400 border-0 rounded-none download-emart-app">
                            <CardContent className="p-6 text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-12 h-12 bg-black flex items-center justify-center">
                                            <div className="w-8 h-8 bg-white"></div>
                                        </div>
                                        <div className="w-8 h-12 bg-gray-800"></div>
                                    </div>
                                </div>
                                <h3 className="font-bold text-gray-900">
                                    Download Emart App
                                </h3>
                            </CardContent>
                        </Card>

                        {/* Newsletter */}
                        <Card className="newsletter-card rounded-none">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-gray-900 mb-4">
                                    NEWSLETTERS
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Sign Up for Our Newsletter!
                                </p>
                                <div className="space-y-3">
                                    <Input
                                        type="email"
                                        placeholder="Subscribe to our newsletter"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="w-full"
                                    />
                                    <Button
                                        onClick={handleSubscribe}
                                        className="w-full bg-black rounded-none hover:bg-black/90 cursor-pointer text-white"
                                    >
                                        Subscribe
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Product Gallery */}
                            <div>
                                <ProductGallery images={product?.imageUrls} />
                            </div>

                            {/* Product Details */}
                            <div className="space-y-6">
                                <div>
                                    <div className="relative">
                                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                            {product?.name || ''}
                                        </h1>
                                    </div>
                                    <StarRating
                                        rating={product.ratingCount}
                                        reviewCount={0}
                                    />
                                </div>

                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-600">
                                        Availability :
                                    </span>
                                    <Badge
                                        variant={
                                            product.stock > 0
                                                ? 'default'
                                                : 'destructive'
                                        }
                                        className={
                                            product.stock > 0
                                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                                        }
                                    >
                                        {product.stock}
                                    </Badge>
                                </div>

                                <div className="relative">
                                    <p className="text-gray-600 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <span className="text-3xl font-bold text-red-500">
                                        ${Number(product.price).toFixed(2)}
                                    </span>
                                    <span className="text-lg text-gray-500 line-through">
                                        ${Number(product.offerPrice).toFixed(2)}
                                    </span>
                                    <Badge className="bg-red-500 hover:bg-red-600 text-white">
                                        {Math.round(
                                            ((Number(product.price) -
                                                Number(product.offerPrice)) /
                                                product.price) *
                                                100,
                                        )}
                                        % OFF
                                    </Badge>
                                </div>

                                <Separator />

                                {/* Quantity and Add to Cart */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm font-medium text-gray-700">
                                            QTY :
                                        </span>
                                        <div className="flex items-center border border-gray-300 ">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={decrementQuantity}
                                                className="px-3 py-1 hover:bg-gray-100"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="px-4 py-1 border-x border-gray-300 min-w-[50px] text-center">
                                                {quantity}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={incrementQuantity}
                                                className="px-3 py-1 hover:bg-gray-100"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3 add-to-cart-section">
                                        <Button
                                            className="flex-1 bg-black cursor-pointer hover:bg-black/90 rounded-none text-white"
                                            onClick={() =>
                                                handleAddProduct(product)
                                            }
                                        >
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            ADD TO CART
                                        </Button>

                                        <Button variant="outline" size="icon">
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <Separator />

                                {/* Product Features */}
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                                        <Truck className="h-4 w-4 text-blue-600" />
                                        <span>
                                            Free shipping on orders over $99
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                                        <Shield className="h-4 w-4 text-blue-600" />
                                        <span>1 year warranty included</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                                        <RotateCcw className="h-4 w-4 text-blue-600" />
                                        <span>30-day return policy</span>
                                    </div>
                                </div>

                                <Separator />

                                {/* Product Info */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            SKU:
                                        </span>
                                        <span className="font-medium">162</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Category:
                                        </span>
                                        <span className="font-medium">
                                            special
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Brand:
                                        </span>
                                        <span className="font-medium">
                                            Samsung
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Tabs */}
                        <div className="mt-12">
                            <Tabs defaultValue="description" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="description">
                                        Description
                                    </TabsTrigger>
                                    <TabsTrigger value="reviews">
                                        Reviews (2)
                                    </TabsTrigger>
                                    <TabsTrigger value="shipping">
                                        Shipping Info
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent
                                    value="description"
                                    className="mt-6"
                                >
                                    <Card className="rounded-none">
                                        <CardContent className="p-6">
                                            <h3 className="font-semibold text-gray-900 mb-4">
                                                Product Description
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed mb-4">
                                                {product.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="reviews" className="mt-6">
                                    <Card className="rounded-none">
                                        <CardContent className="p-6">
                                            <h3 className="font-semibold text-gray-900 mb-4">
                                                Customer Reviews
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="border-b border-gray-200 pb-4">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <StarRating
                                                            rating={5}
                                                            reviewCount={0}
                                                        />
                                                        <span className="font-medium text-gray-900">
                                                            John Doe
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600">
                                                        Great quality product!
                                                        Highly recommended.
                                                    </p>
                                                </div>
                                                <div className="border-b border-gray-200 pb-4">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <StarRating
                                                            rating={4}
                                                            reviewCount={0}
                                                        />
                                                        <span className="font-medium text-gray-900">
                                                            Jane Smith
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600">
                                                        Good value for money.
                                                        Fast delivery.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="shipping" className="mt-6">
                                    <Card className="rounded-none">
                                        <CardContent className="p-6">
                                            <h3 className="font-semibold text-gray-900 mb-4">
                                                Shipping Information
                                            </h3>
                                            <div className="space-y-3 text-gray-600">
                                                <p>
                                                    • Free standard shipping on
                                                    orders over $99
                                                </p>
                                                <p>
                                                    • Express shipping available
                                                    for $15
                                                </p>
                                                <p>
                                                    • International shipping
                                                    available
                                                </p>
                                                <p>
                                                    • Orders processed within
                                                    1-2 business days
                                                </p>
                                                <p>
                                                    • Delivery time: 3-7
                                                    business days
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
                {/* Similar Products */}
                <SimilarProducts />
            </div>
        </div>
    );
}
