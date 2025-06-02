// Test script for pastor content updates
const storageKey = "igreja_site_conteudo";

// Get current data
const siteData = JSON.parse(localStorage.getItem(storageKey) || "{}");

// Find pastor page
const pastorPageIndex = siteData.paginas.findIndex(
  (p) => p.pagina === "pastor"
);

if (pastorPageIndex !== -1) {
  // Update a value
  const updatedContent = {
    ...siteData.paginas[pastorPageIndex].conteudo,
    "pastor-1": "Nosso Pastor Atualizado " + new Date().toLocaleTimeString(),
    "pastor-5":
      "Esta biografia foi atualizada em " +
      new Date().toLocaleTimeString() +
      ". As mudanças agora são refletidas automaticamente.",
  };

  // Update the page
  siteData.paginas[pastorPageIndex].conteudo = updatedContent;

  // Save back to localStorage
  localStorage.setItem(storageKey, JSON.stringify(siteData));

  console.log(
    "Updated pastor content with timestamp:",
    new Date().toLocaleTimeString()
  );
} else {
  console.error("Pastor page not found in storage data!");
}
