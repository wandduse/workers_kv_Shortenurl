const html404 = `<!DOCTYPE html>
<body>
  <h1>404 Not Found.</h1>
</body>`

async function handleRequest(request) {
  const requestURL = new URL(request.url);
  const path = requestURL.pathname.split("/")[1];
  if(!path){
    //自定义页面
    const html= await fetch("https://xytom.github.io/Url-Shorten-Worker/index.html");
    //首页跳转到指定地址
    //return Response.redirect("https://www.wanuse.com", 302);
    //加载自定义页面
    return new Response(await html.text(), { headers: { "content-type": "text/html;charset=UTF-8", }, });
  }else{
  const value = await DDD.get(path);
  if (value) { return Response.redirect(value, 302)}
  return new Response(html404, {  headers: {   "content-type": "text/html;charset=UTF-8", }, status: 404 });
  }
}

addEventListener("fetch", async event => {
  event.respondWith(handleRequest(event.request))
});
