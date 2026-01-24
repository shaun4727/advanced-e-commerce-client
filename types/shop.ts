import z from 'zod';

export const socialSchema = z.object({
    facebook: z.string().min(1, 'Facebook ID is required'),
    twitter: z.string().min(1, 'Twitter ID is required'),
    instagram: z.string().min(1, 'Instagram is required'),
});

export const createShopSchema = z.object({
    shopName: z.string().min(1, 'Shop Name is required'),
    businessLicenseNumber: z.string().min(1, 'Business License no is required'),
    address: z.string().min(1, 'Address is required'),
    contactNumber: z.string().min(1, 'Contact No. is required'),
    website: z.string().min(1, 'Website is required'),
    establishedYear: z.string().min(1, 'Established year is required'),
    taxIdentificationNumber: z.string().min(1, 'TIN is required'),
    socialMediaLinks: socialSchema,
    servicesOffered: z.string().min(1, 'Services are required'),
});

export type shopFormData = z.infer<typeof createShopSchema>;
