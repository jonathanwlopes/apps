import loader from "./product/list.ts";

/** @deprecated use product/list instead */
const deprecated = (...args: Parameters<typeof loader>) => loader(...args);

export default deprecated;
