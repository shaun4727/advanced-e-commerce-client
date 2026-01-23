'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginUserApi } from '@/services/AuthService';
import { LoginFormData, loginSchema } from '@/types/login';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const page = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const router = useRouter();

    const onSubmit = async (data: LoginFormData) => {
        // loginUserApi
        let toastId: number | string = 1;
        try {
            toastId = toast.loading('...Loading', {
                id: toastId,
            });
            const res = await loginUserApi(data);

            if (res?.success) {
                reset();
                router.push('/');
                toastId = toast.success('User logged in successfully!', {
                    id: toastId,
                });
            } else {
                console.log(res);
                toast.error(res.message, { id: toastId });
            }
        } catch (err) {
            console.log(err);
        }
        // handle login logic
    };

    return (
        <div className="flex items-center h-180">
            <Card className="max-w-md flex-1  mx-auto bg-white shadow-sm">
                <CardHeader className="pb-4">
                    <h1 className="text-2xl font-normal text-gray-800 mb-2">
                        Sign in
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Hello, Welcome to your account.
                    </p>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="default"
                            onClick={() => {}}
                            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-3 cursor-pointer"
                        >
                            Sign In with User
                        </Button>
                        <Button
                            onClick={() => {}}
                            variant="default"
                            className="bg-cyan-400 hover:bg-cyan-500 text-white flex items-center justify-center gap-2 py-3 cursor-pointer"
                        >
                            Sign In with Admin
                        </Button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-gray-700 text-sm"
                            >
                                Email Address{' '}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                {...register('email')}
                            />
                        </div>
                        {errors.email && (
                            <p className="error-message">
                                {errors.email.message}
                            </p>
                        )}

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-gray-700 text-sm"
                            >
                                Password <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                {...register('password')}
                            />
                        </div>

                        {errors.password && (
                            <p className="error-message">
                                {errors.password.message}
                            </p>
                        )}

                        {/* Remember Me and Forgot Password */}
                        <div className="flex mb-2 items-center justify-between pt-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" />
                                <Label
                                    htmlFor="remember"
                                    className="text-sm text-gray-700 cursor-pointer"
                                >
                                    Remember me!
                                </Label>
                            </div>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-800"
                            >
                                Forgot your Password?
                            </Link>
                        </div>
                        {/* <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string}
              onChange={handleReCaptcha}
            /> */}

                        {/* Login Button */}
                        <Button
                            //   disabled={reCaptchaStatus ? false : true}
                            style={{ marginTop: '5px' }}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 mt-6 cursor-pointer"
                            type="submit"
                        >
                            LOGIN
                        </Button>
                    </form>
                    <p className="login-redirection">
                        Do not have an account?{' '}
                        <span
                            className=" cursor-pointer text-blue-600"
                            onClick={() => {}}
                        >
                            Register
                        </span>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;
