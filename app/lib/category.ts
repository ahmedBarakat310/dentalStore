export async function getCategory() {
const categories = await fetch("http://localhost:5555/api/categories").then((res) => res.json());
return categories;
}