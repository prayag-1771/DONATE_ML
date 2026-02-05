"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SimpleCard({
  name,
  desc,
  logo,
  cause,
  donateUrl,
  website,
}) {
  return (
    <Card className="w-[18rem]">
      <CardHeader className="p-0">
        <img
          src={logo || "/new.webp"}
          alt={name}
          className="h-40 w-full object-contain bg-white rounded-t-xl p-4"
        />
      </CardHeader>

      <CardContent className="pt-4">
        <CardTitle className="text-base mb-1">
          {name}
        </CardTitle>

        {cause && (
          <p className="text-xs text-gray-500 mb-2">
            {cause}
          </p>
        )}

        <p className="text-sm text-muted-foreground">
          {desc}
        </p>
      </CardContent>

      <CardFooter className="flex gap-2">
        <a
          href={donateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button className="w-full">
            Donate
          </Button>
        </a>

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">
              Site
            </Button>
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
