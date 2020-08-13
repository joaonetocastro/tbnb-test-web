// Returns a word without special characters in lower case "Brasília" => "brasilia"
export default function normalizeWord(word) {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
