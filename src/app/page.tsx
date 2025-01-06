import { QueryInput } from "@/components/query-input";


export default function Home() {
  return (
    <div className=" items-center justify-items-center pt-40 pb-16 font-sans">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Lighthouse for Better Repos.
        </h1>
        <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
          Identify what's missing and improve your Git workflow effortlessly.
          Get detailed insights and actionable recommendations.
        </p>
      </div>
      <QueryInput />
    </div>
  );
}
