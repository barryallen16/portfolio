const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === "/" || pathname === "") pathname = "/index.html";
    if (pathname.endsWith("/")) pathname += "index.html";
    let file = Bun.file("." + pathname);
    if (!(await file.exists())) {
      file = Bun.file("." + pathname + "/index.html");
    }
    if (await file.exists()) {
      return new Response(file);
    }
    return new Response("Not found", { status: 404 });
  },
});

console.log(`Portfolio running at http://localhost:${server.port}`);
