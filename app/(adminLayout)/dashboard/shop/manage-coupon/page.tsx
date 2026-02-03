/* eslint-disable @typescript-eslint/no-explicit-any */
import CouponTable from '@/components/manage-coupon/coupon-table';
import CreateCouponModal from '@/components/manage-coupon/create-coupon-modal';
import { getAllCouponApi } from '@/services/CartServices';

export default async function ManageCouponPage() {
    let data: any = null;

    try {
        const response = await getAllCouponApi();
        data = response?.data;
    } catch (error) {
        console.error('Failed to fetch coupons during build:', error);
    }

    // If data or result is undefined, don't crash the build
    if (!data?.result) {
        return (
            <div>
                <h1 className="text-xl font-semibold text-red-600">
                    Failed to load coupons
                </h1>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-xl">Manage Coupon</h1>
                <CreateCouponModal />
            </div>
            <div>
                <CouponTable coupons={data.result} meta={data.meta} />
            </div>
        </div>
    );
}
