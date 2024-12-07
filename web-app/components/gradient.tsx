import { cn } from "@/lib/utils";

export function GradientBalls({className}:{className?:string}) {

    return  <div aria-hidden="true" className={cn("absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 z-[-1]",className)}>
    <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
    <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
  </div>
}

export function GradientTop({className}:{className?:string}) {

    return  <div aria-hidden="true" 
    className={cn("absolute inset-0 aspect-video -translate-y-1/2 rounded-full border bg-gradient-to-b from-cyan-400 to-sky-300 opacity-25 blur-2xl duration-300 group-hover:-translate-y-1/4 dark:from-white dark:to-white dark:opacity-5 dark:group-hover:opacity-10 z-0",className)}>

    </div>
}