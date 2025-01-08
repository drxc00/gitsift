import { QueryInput } from "@/components/query-input";


export default function Home() {
  return (
    <div className="items-center justify-items-center pt-32 md:pt-52 pb-16 font-sans">
      <div className="max-w-4xl mx-auto text-center space-y-2 md:space-y-4 lg:space-y-6 px-4 md:px-0 lg:px-0">
        <h1 className="text-4xl font-bold tracking-tighter md:text-6xl lg:text-7xl">
          <span className="text-green-500">Lighthouse</span> for Better Repos.
        </h1>
        <p className="text-sm text-muted-foreground max-w-md md:max-w-xl mx-auto md:text-lg lg:text-xl">
          Identify what&apos;s missing and improve your Git workflow effortlessly.
          Get detailed insights and actionable recommendations.
        </p>
      </div>
      <QueryInput />
    </div>
  );
}
