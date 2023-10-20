import defaults from "deco/engine/manifest/defaults.ts";
import { Route } from "../flags/audience.ts";
import { AppContext } from "../mod.ts";
import { type Props as RedirectProps } from "./redirect.ts";

async function getAllRedirects(ctx: AppContext): Promise<Route[]> {
  const allRedirects = await ctx.get<
    RedirectProps[]
  >({
    resolveType: "website/loaders/redirect.ts",
    __resolveType: defaults["resolveTypeSelector"].name,
  });

  const routes: Route[] = allRedirects.map(({ redirect }) => ({
    pathTemplate: redirect.from,
    isHref: true,
    handler: {
      value: {
        __resolveType: "website/handlers/redirect.ts",
        to: redirect.to,
        type: redirect.type,
      },
    },
  }));

  return routes;
}
/**
 * @title Redirects
 */
export default async function Redirects(
  _props: unknown,
  _req: Request,
  ctx: AppContext,
): Promise<Route[]> {
  const allRedirects = await ctx.get<
    Route[]
  >({
    key: "getAllRedirects",
    func: () => getAllRedirects(ctx),
    __resolveType: defaults["once"].name,
  });

  return allRedirects;
}
