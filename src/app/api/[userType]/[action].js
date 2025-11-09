import fetch from "node-fetch";

export default async function handler(req, res) {
  const { userType, action } = req.query; // dynamic parts of URL
  const backendUrl = `http://34.233.119.120:8080/api/${userType}/${action}`;

  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy Error", details: err.message });
  }
}
