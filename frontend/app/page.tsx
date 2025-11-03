import {Button} from '@/components/ui/button';
import {ModeToggle} from '@/components/ui/ModeToggle';

export default function Home() {
  return (
    <>
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 dark:bg-background">
      <h1 className="mb-4 text-4xl font-bold text-primary">Welcome to Gliss</h1>
      <Button variant="ghost">
        Get Started
      </Button>
    </div>
    <div className="fixed bottom-4 right-4 text-sm text-muted-foreground">
      <ModeToggle />
    </div>
    </>
  );
}
