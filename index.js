export default {
  async fetch(request) {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    const scriptURL = "https://script.google.com/macros/s/AKfycbwDPgnPsGkpV_GPek0mbeIrDTENT1xwQWOEOHUqo3jZIMx9RKRgVT7cPlPL4AzJcWap/exec";
    const fullURL = `${scriptURL}?email=${encodeURIComponent(email)}`;

    const res = await fetch(fullURL);
    const text = await res.text();

    return new Response(text, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain"
      }
    });
  }
}
