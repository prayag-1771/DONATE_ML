"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SimpleCard({ name, desc }) {
  return (
    <Card className="w-[18rem]">
      <CardHeader className="p-0">
        <img
          src="/new.webp"
          alt={name}
          className="h-40 w-full object-cover rounded-t-xl"
        />
      </CardHeader>

      <CardContent className="pt-4">
        <CardTitle className="text-base mb-2">
          {name}
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          {desc}
        </p>
      </CardContent>

      <CardFooter>
        <Button className="w-full">
          Go somewhere
        </Button>
      </CardFooter>
    </Card>
  );
}
