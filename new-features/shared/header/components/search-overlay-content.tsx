import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    SheetClose,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { X } from 'lucide-react';

export function SearchOverlayContent() {
    return (
        <div className="flex flex-col h-full py-6">
            <SheetHeader className="mb-8">
                <div className="flex items-center justify-between">
                    {/* FIX: "aa" must be inside SheetTitle for accessibility. 
             If you want it hidden, use the VisuallyHidden component.
          */}
                    <SheetTitle className="text-4xl font-bold tracking-tighter">
                        aa
                    </SheetTitle>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="link"
                            className="uppercase text-xs font-bold tracking-widest text-muted-foreground"
                        >
                            Clear
                        </Button>
                        <SheetClose className="p-2 hover:bg-accent rounded-full transition-colors">
                            <X className="size-6" />
                        </SheetClose>
                    </div>
                </div>

                {/* FIX: Description is also required for full accessibility */}
                <SheetDescription className="sr-only">
                    Search our product catalog for electronics, watches, and
                    more.
                </SheetDescription>
            </SheetHeader>

            <div className="relative border-b border-foreground">
                <Input
                    className="border-none bg-transparent px-0 py-8 text-2xl focus-visible:ring-0 placeholder:text-muted-foreground/30"
                    placeholder="Search items..."
                    autoFocus
                />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center">
                <p className="text-lg font-medium opacity-60 italic">
                    No Results Could Be Found.
                </p>
            </div>
        </div>
    );
}
