



export async function getAllParcelas() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:4000/api/parcelas", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), 
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las parcelas");
  }

 
  const data = await response.json();
  return data.result || []; // 
}
