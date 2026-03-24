'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useSocket } from '@/hooks/useSocket';
import { updateAgentPickStatusApi } from '@/services/CartServices';
import { format } from 'date-fns';
import { Calendar, MapPin, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AgentOrdersTable({
    initialOrders,
    agentId,
}: {
    initialOrders: any[];
    agentId: string;
}) {
    const [orders, setOrders] = useState(initialOrders);
    const { socket, connected } = useSocket();
    const router = useRouter();

    // useEffect(() => {
    //     const handleOrderAssigned = (data: any) => {
    //         if (data.agentId === agentId) {
    //             router.refresh();
    //         }
    //     };

    //     socket.on('OrderAssigned', handleOrderAssigned);

    //     // Explicitly return void by using curly braces
    //     return () => {
    //         socket.off('OrderAssigned', handleOrderAssigned);
    //     };
    // }, [agentId, router]);

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        // 1. Logic to update status via API or Socket

        // Update local state for immediate feedback

        if (newStatus === 'Picked') {
            const res = await updateAgentPickStatusApi(agentId);
            if (res.success && res.data.picked) {
                setOrders((prev) =>
                    prev.map((o) =>
                        o._id === orderId ? { ...o, status: newStatus } : o,
                    ),
                );
                console.log('called socket event', orderId);
                socket.emit('OrderPicked', { orderId });
            }
        }

        // TO DO: emit socket event here if needed
        // socket.emit('updateOrderStatus', { orderId, status: newStatus });
    };

    return (
        <Card className="border-none shadow-md">
            <CardContent className="p-0">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[150px]">
                                Order ID
                            </TableHead>
                            <TableHead>Destination</TableHead>
                            <TableHead>Assigned Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow
                                key={order._id}
                                className="hover:bg-muted/30 transition-colors"
                            >
                                <TableCell className="font-mono text-xs font-bold">
                                    <div className="flex items-center gap-2">
                                        <Package className="h-4 w-4 text-primary" />
                                        {order.orderId.slice(-8).toUpperCase()}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1 text-sm font-medium">
                                            <MapPin className="h-3 w-3 text-red-500" />
                                            {order.destination.area},{' '}
                                            {order.destination.city}
                                        </div>
                                        <span className="text-xs text-muted-foreground line-clamp-1">
                                            {
                                                order.destination
                                                    .street_or_building_name
                                            }
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {format(
                                            new Date(order.createdAt),
                                            'PPP',
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            order.status === 'Assigned'
                                                ? 'secondary'
                                                : 'default'
                                        }
                                        className={
                                            order.status === 'Picked'
                                                ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                                : ''
                                        }
                                    >
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Select
                                        onValueChange={(val) =>
                                            handleStatusChange(
                                                order.orderId,
                                                val,
                                            )
                                        }
                                        defaultValue={order.status}
                                    >
                                        <SelectTrigger className="w-[130px] ml-auto h-9">
                                            <SelectValue placeholder="Update Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem
                                                value="Assigned"
                                                disabled
                                            >
                                                Assigned
                                            </SelectItem>
                                            <SelectItem value="Picked">
                                                Picked
                                            </SelectItem>
                                            <SelectItem value="Delivered">
                                                Delivered
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {orders.length === 0 && (
                    <div className="py-20 text-center text-muted-foreground">
                        No orders assigned to you yet.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
