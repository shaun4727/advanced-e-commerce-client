import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Calendar,
    Facebook,
    FileText,
    Globe,
    Instagram,
    MapPin,
    Phone,
    Twitter,
} from 'lucide-react';

export function ShopDetailsCard({ shop }: { shop: any }) {
    return (
        <Card className="max-w-4xl mx-auto overflow-hidden border-none shadow-lg">
            {/* Header section with Logo and Status */}
            <div className="relative h-32 bg-linear-to-r from-blue-600 to-indigo-700">
                <div className="absolute -bottom-12 left-8">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                        <AvatarImage
                            src={shop.logo}
                            alt={shop.shopName}
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-slate-200 text-2xl font-bold">
                            {shop.shopName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="absolute top-4 right-4">
                    <Badge
                        variant={shop.isActive ? 'default' : 'destructive'}
                        className="bg-green-500 hover:bg-green-600"
                    >
                        {shop.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                </div>
            </div>

            <CardContent className="pt-16 px-8 pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                        <CardTitle className="text-3xl font-extrabold text-slate-900">
                            {shop.shopName}
                        </CardTitle>
                        <div className="flex items-center text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{shop.address}</span>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-3">
                        {shop.socialMediaLinks?.facebook && (
                            <a
                                href={`https://${shop.socialMediaLinks.facebook}`}
                                target="_blank"
                                className="p-2 bg-slate-100 rounded-full hover:bg-blue-100 text-blue-600 transition-colors"
                            >
                                <Facebook size={18} />
                            </a>
                        )}
                        {shop.socialMediaLinks?.twitter && (
                            <a
                                href={`https://${shop.socialMediaLinks.twitter}`}
                                target="_blank"
                                className="p-2 bg-slate-100 rounded-full hover:bg-sky-100 text-sky-500 transition-colors"
                            >
                                <Twitter size={18} />
                            </a>
                        )}
                        {shop.socialMediaLinks?.instagram && (
                            <a
                                href={`https://${shop.socialMediaLinks.instagram}`}
                                target="_blank"
                                className="p-2 bg-slate-100 rounded-full hover:bg-pink-100 text-pink-600 transition-colors"
                            >
                                <Instagram size={18} />
                            </a>
                        )}
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Business Details */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-slate-800">
                            Business Information
                        </h3>
                        <div className="grid gap-3 text-sm">
                            <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-3 text-slate-400" />
                                <span className="font-medium">License:</span>
                                <span className="ml-2 text-slate-600 font-mono">
                                    {shop.businessLicenseNumber}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-3 text-slate-400" />
                                <span className="font-medium">TIN:</span>
                                <span className="ml-2 text-slate-600 font-mono">
                                    {shop.taxIdentificationNumber}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-3 text-slate-400" />
                                <span className="font-medium">
                                    Established:
                                </span>
                                <span className="ml-2 text-slate-600">
                                    {shop.establishedYear}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-3 text-slate-400" />
                                <span className="font-medium">Contact:</span>
                                <span className="ml-2 text-slate-600">
                                    {shop.contactNumber}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Globe className="h-4 w-4 mr-3 text-slate-400" />
                                <span className="font-medium">Website:</span>
                                <a
                                    href={shop.website}
                                    className="ml-2 text-blue-600 hover:underline"
                                >
                                    {shop.website}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Owner & Services */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg text-slate-800 mb-3">
                                Owner
                            </h3>
                            <div className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="bg-indigo-100 text-indigo-700 h-10 w-10 rounded-full flex items-center justify-center font-bold mr-3">
                                    {shop.user.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold leading-none">
                                        {shop.user.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {shop.user.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg text-slate-800 mb-3">
                                Services Offered
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {shop.servicesOffered.map(
                                    (service: string, index: number) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="bg-white px-3 py-1 border-slate-300"
                                        >
                                            {service}
                                        </Badge>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
