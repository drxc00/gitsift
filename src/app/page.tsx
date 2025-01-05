import { QueryInput } from "@/components/query-input";


export default function Home() {
  return (
    <div className=" items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-sans">
      <div className="flex flex-col items-center justify-center gap-2 lg:mt-0 mt-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-2lg text-center text-primary">Lighthouse for Better Repos.</h1>
        <p className="text-md md:text-lg lg:text-xl max-w-lg text-center text-primary">Identify what’s missing and improve your Git workflow effortlessly.</p>
      </div>
      <QueryInput />
    </div>
  );
}
