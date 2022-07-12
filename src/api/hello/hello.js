function helloHandler(req, res) {
  res.status(200).json({ name: "John Boe" });
}

export { helloHandler };
