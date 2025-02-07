import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export type suggestedItem = {
  image_url: string;
  description: string;
  title?: string;
  price: number;
  mrp: number;
  item_type: number;
  wear_type: string;
  specifications: {
    fabric?: string;
    fit?: string;
    length?: string;
    main_trend?: string;
    neck?: string;
    occasion?: string;
    pattern?: string;
    pattern_coverage?: string;
    sleeve_length?: string;
    type?: string;
  };
};

function SuggestedItem(props: suggestedItem) {
  return (
    <Card className="p-2">
      <CardHeader>
        <Image
          src={props.image_url}
          alt={props.description}
          width={360}
          height={480}
          className="rounded-md h-auto max-h-60 mx-auto"
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{props.description}</CardTitle>
        <CardDescription>
          {props?.price}{" "}
          <span className="line-through text-red-500 text-sm">
            {props?.mrp}
          </span>
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export type suggestionsProps = Record<string, suggestedItem[]>;

export default function Suggestions(props: suggestionsProps) {
  return (
    <>
      {Object.keys(props).map((key) => {
        return (
          <div key={key} className="flex flex-col gap-4 w-full z-10">
            <h2 className="text-xl font-bold">{key}</h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {props[key].map((item) => {
                return <SuggestedItem {...item} key={item.description} />;
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
