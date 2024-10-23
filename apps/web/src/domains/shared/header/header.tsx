import type { JSX } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@planria/design/avatar";
import { Button } from "@planria/design/button";
import { Logo } from "@planria/design/logo";
import { NavigationBar } from "@planria/design/navigation";
import { TopBar } from "@planria/design/top-bar";
import Link from "next/link";

import { ProjectSelector } from "$/domains/projects/selector";
import { ForSignedIn, ForSignedOut } from "$/lib/auth/delimiters";
import { tryGetUser } from "$/lib/auth/server";

export async function Header(): Promise<JSX.Element> {
  const user = await tryGetUser();

  return (
    <TopBar className="mx-auto mb-8 max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg left-[50%] right-[unset]">
      <Link href="/p">
        <Logo size="md" />
      </Link>
      <NavigationBar>
        <ForSignedIn>
          <ProjectSelector />
        </ForSignedIn>
      </NavigationBar>
      <ForSignedIn>
        <div className="flex items-center gap-3">
          {!!user?.fullName && (
            <span className="hidden md:block text-sm font-medium">
              {user?.fullName}
            </span>
          )}
          <Avatar size="sm">
            <AvatarFallback>{user!.fullName}</AvatarFallback>
            <AvatarImage
              src={user!.avatarURL ?? ""}
              alt={user!.fullName ?? ""}
            />
          </Avatar>
        </div>
      </ForSignedIn>
      <ForSignedOut>
        <Button asChild={true}>
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </ForSignedOut>
    </TopBar>
  );
}
