export const dynamic = 'force-dynamic';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProfileDataApi } from '@/services/AuthService';
import { Clock, Mail, MapPin, Monitor, ShieldCheck } from 'lucide-react';

const page = async () => {
    const res = await getProfileDataApi();
    const user = res.data;

    const formattedDate = new Date(user?.lastLogin).toLocaleString();
    return (
        <Card className=" overflow-hidden border-t-4 border-t-primary shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                    <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                        {user?.name
                            ?.split(' ')
                            ?.map((n: any) => n[0])
                            ?.join('')}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <CardTitle className="text-2xl font-bold">
                        {user?.name}
                    </CardTitle>
                    <div className="flex gap-2 mt-1">
                        <Badge
                            variant={user?.isActive ? 'default' : 'secondary'}
                        >
                            {user?.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                            {user?.role}
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
                {/* Contact Info */}
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{user?.email}</span>
                </div>

                {/* Status & Security */}
                <div className="grid grid-cols-2 gap-4 py-2 border-y border-border/50">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                            Last Login
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                            <Clock className="h-3 w-3" />
                            {formattedDate}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                            IP Address
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                            <MapPin className="h-3 w-3" />
                            {user?.clientInfo?.ipAddress.replace('::ffff:', '')}
                        </div>
                    </div>
                </div>

                {/* System Info */}
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 font-medium">
                            <Monitor className="h-3.5 w-3.5" /> Client Source
                        </span>
                        <span className="text-muted-foreground italic font-mono">
                            {user?.clientInfo?.userAgent}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 font-medium">
                            <ShieldCheck className="h-3.5 w-3.5" /> Account ID
                        </span>
                        <span className="text-muted-foreground font-mono">
                            ...{user?._id.slice(-6)}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default page;
