import {Button} from '@/components/ui/button';
import Link from 'next/link';


export default function Header() {
    return (
        <header className="w-full px-4 py-2 flex items-center justify-between bg-background dark:bg-background">
            <div className="text-2xl font-bold text-primary">
                <Link href="/" className="text-primary ">
                        [Music App Name]
                </Link>
            </div>
            <nav className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <Link href="/login" className="text-primary hover:text-accent transition">
                        <Button variant="default">
                            Log In
                        </Button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}