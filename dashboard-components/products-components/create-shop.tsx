'use client';

import { Button } from '@/components/ui/button';
import EPImageUploader from '@/components/ui/core/EPImageUploader';
import ImagePreviewer from '@/components/ui/core/EPImageUploader/ImagePreviewer';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from '@/components/ui/input-group';
import { createShopService, updateShopService } from '@/services/ShopServices';
import { createShopSchema, shopFormData } from '@/types/shop';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export function CreateShopComponent({
    setShopLoading,
    shopInfo,
}: {
    setShopLoading: Dispatch<SetStateAction<boolean>>;
    shopInfo: shopFormData | null;
}) {
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    // 2. Initialize form
    const form = useForm<z.infer<typeof createShopSchema>>({
        resolver: zodResolver(createShopSchema),
        defaultValues: {
            shopName: '',
            businessLicenseNumber: '', // Add this
            address: '', // Add this
            contactNumber: '',
            website: '',
            establishedYear: '',
            taxIdentificationNumber: '',
            servicesOffered: '',
            socialMediaLinks: {
                // Initialize nested objects too
                facebook: '',
                twitter: '',
                instagram: '',
            },
        },
    });

    useEffect(() => {
        if (shopInfo) {
            form.reset({
                shopName: shopInfo.shopName || '',
                businessLicenseNumber: shopInfo.businessLicenseNumber || '',
                address: shopInfo.address || '',
                contactNumber: shopInfo.contactNumber || '',
                website: shopInfo.website || '',
                establishedYear: shopInfo.establishedYear?.toString() || '',
                taxIdentificationNumber: shopInfo.taxIdentificationNumber || '',
                servicesOffered: Array.isArray(shopInfo.servicesOffered)
                    ? shopInfo.servicesOffered.join(', ')
                    : shopInfo.servicesOffered || '',
                socialMediaLinks: {
                    facebook: shopInfo.socialMediaLinks?.facebook || '',
                    twitter: shopInfo.socialMediaLinks?.twitter || '',
                    instagram: shopInfo.socialMediaLinks?.instagram || '',
                },
            });

            // Set existing logo preview if available
            if (shopInfo.logo) {
                setImagePreview([shopInfo?.logo]);
            }
        }
    }, [shopInfo, form]);

    // 3. Handle submission

    const onSubmit = async (data: z.infer<typeof createShopSchema>) => {
        let toastId: string | number = 1;
        toast.loading('...Loading', { id: toastId });
        const servicesOffered = data?.servicesOffered
            ?.split(',')
            .map((service: string) => service.trim())
            .filter((service: string) => service !== '');

        const modifiedData = {
            ...data,
            servicesOffered: servicesOffered,
            establishedYear: Number(data?.establishedYear),
            id: shopInfo?._id,
        };

        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify(modifiedData));
            formData.append('logo', imageFiles[0]);

            let res = { success: false, message: '' };
            if (!shopInfo) {
                res = await createShopService(formData);
            } else {
                // update shop info
                res = await updateShopService(formData);
            }

            if (res.success) {
                form.reset();
                setImagePreview([]);
                setDrawerOpen(false);
                setShopLoading(true);
                toast.success(res.message);
            } else {
                console.log(res.message);
                toastId = toast.error(res.message, { id: toastId });
            }
        } catch (err: unknown) {
            toast.error('error occured', { id: toastId });
            console.error(err);
        }
    };

    return (
        <Drawer
            direction="right"
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
        >
            <DrawerTrigger asChild>
                <div>
                    <Button
                        variant="outline"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white hover:text-white w-sm md:w-md "
                    >
                        {shopInfo ? 'Edit Shop' : 'Create Shop'}
                    </Button>
                </div>
            </DrawerTrigger>
            <DrawerContent className="right-0 left-auto h-full ">
                <div className="mx-auto w-full min-w-lg py-8 no-scrollbar overflow-y-auto px-4">
                    <DrawerTitle className="mb-4 text-blue-500">
                        Fill in shop information
                    </DrawerTitle>

                    <form
                        id="form-shop-info"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FieldGroup>
                            <Controller
                                name="shopName"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            Shop Name
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Write shop name"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="businessLicenseNumber"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Business License Number
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Write Business License Number"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="address"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Address
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="write address"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="contactNumber"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Contact Number
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="write contact number"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="website"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Website Link
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="write website link"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="establishedYear"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Est. Year
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="write est. year"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="taxIdentificationNumber"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Tax Identification Number
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="write tax identification number"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="socialMediaLinks.facebook"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Facebook Link
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="write facebook link"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="socialMediaLinks.twitter"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Twitter Link
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Write twitter link"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="socialMediaLinks.instagram"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Instagram Link
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Write instagram link"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="servicesOffered"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Services Offered
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupTextarea
                                                {...field}
                                                id="form-rhf-demo-description"
                                                placeholder="Write services"
                                                rows={6}
                                                className="min-h-24 resize-none"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            <InputGroupAddon align="block-end">
                                                <InputGroupText className="tabular-nums">
                                                    {field.value.length}/100
                                                    characters
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        {imagePreview.length > 0 ? (
                            <ImagePreviewer
                                setImageFiles={setImageFiles}
                                imagePreview={imagePreview}
                                setImagePreview={setImagePreview}
                                className="mt-8 flex gap-2"
                            />
                        ) : (
                            <div className="mt-8">
                                {' '}
                                <EPImageUploader
                                    setImageFiles={setImageFiles}
                                    setImagePreview={setImagePreview}
                                    label="Upload Logo"
                                />
                            </div>
                        )}
                        <Button type="submit" className="w-full mt-4">
                            Submit
                        </Button>
                    </form>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
