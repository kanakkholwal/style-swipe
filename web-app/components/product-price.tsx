import { cn } from "@/lib/utils";

export default function Price({
  price,
  mrp,
  className,
}: {
  price: string | number;
  mrp: string | number;
  className?: string;
}) {
  const hasMrp = mrp && mrp !== price && Number(mrp.toString()) !== 0;

  return (
    <p className={cn("", className)}>
      <span className="text-ui-fg-muted">{price} </span>
      {hasMrp ? <span className="text-ui-fg-interactive">{mrp}</span> : null}
      {hasMrp ? <span className="text-ui-fg-muted"> off</span> : null}
    </p>
  );
}
