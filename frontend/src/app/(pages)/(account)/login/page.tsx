import Login from '@/components/pages/AccountGroup/login';
import Header from '@/components/shared/header';
import { ModeToggle } from '@/components/shared/ModeToggle';

export default function LoginPage() {
    return (
        <>
            <Header />
            <div className="flex min-h-screen items-center justify-center bg-background px-4">
                <Login />
            </div>
            <ModeToggle />
        </>
    );

};