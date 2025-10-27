export async function GET() {
  const products = [
    { id: 1, name: "Aurora Headphones", price: 99.0, rating: 4.6 },
    { id: 2, name: "Nimbus Keyboard", price: 129.0, rating: 4.8 },
    { id: 3, name: "Zephyr Mouse", price: 59.0, rating: 4.4 },
    { id: 4, name: "Lumen Monitor 27”", price: 299.0, rating: 4.7 },
  ];

  // server preformatted time (exact string)
  const formatted = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const payload = products.map((p) => ({
    ...p,
    // keep raw ISO if you want: iso: new Date().toISOString()
    serverStampFormatted: formatted, // SAME string for all items here (or per-item if needed)
  }));

  return Response.json(payload, { status: 200 });
}
