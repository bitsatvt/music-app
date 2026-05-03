import Login from '@/components/pages/AccountGroup/login';
import Header from '@/components/shared/Header';
import { ModeToggle } from '@/components/shared/ModeToggle';

export default function LoginPage() {
    return (
        <>
            <Header />
            <div className="flex min-h-screen items-center justify-center px-4
                bg-gradient-to-b from-white via-[#91C4F2]/20 to-[#9D79BC]/15
                dark:from-[#0a0a0f] dark:via-[#160d22] dark:to-[#0a0a0f]">
                <Login />
            </div>
            <ModeToggle />
        </>
    );

};