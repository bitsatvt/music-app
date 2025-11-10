import Signup from '@/components/pages/AccountGroup/signup';
import Header from '@/components/shared/header';


export default function SignupPage() {
    return (
        <>
        <Header />
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Signup />
        </div>
        </>

    );

};