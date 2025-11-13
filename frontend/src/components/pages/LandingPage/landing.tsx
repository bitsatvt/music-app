import {Button} from '@/components/ui/button';

export function LandingPage() {
    return (
    <>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 dark:bg-background">
          <h1 className="mb-4 text-4xl font-bold text-primary">Welcome to [Music App Name]</h1>
          <Button variant="ghost">
            Get Started
          </Button>
        </div>
    </>
        );
}
