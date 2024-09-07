import { Link } from 'react-router-dom'

// Send error to some observability tool, e.g. Sentry
export function Error() {
  // Here we can display different UI based on the type of the error
  // const error = useRouteError() as Error;
  // if(error instanceof SomeError) {}


  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">
        Whoops, something went wrong
      </h1>
      <p className="text-accent-foreground">
        Back to{' '}
        <Link className="text-sky-600 dark:text-sky-400" to="/">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
