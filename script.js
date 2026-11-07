const STORAGE_KEY = "itemSharingItems";

const form = document.getElementById("item-form");
const ownerInput = document.getElementById("owner");
const itemNameInput = document.getElementById("item-name");
const categoryInput = document.getElementById("category");
const statusInput = document.getElementById("status");
const searchInput = document.getElementById("search");
const filterStatus = document.getElementById("filter-status");
const itemList = document.getElementById("item-list");
const emptyState = document.getElementById("empty-state");
const formMessage = document.getElementById("form-message");

let items = loadItems();

function loadItems() {
  try {
    const savedItems = localStorage.getItem(STORAGE_KEY);
    return savedItems ? JSON.parse(savedItems) : [];
  } catch (error) {
    console.error("Gagal membaca data tersimpan:", error);
    return [];
  }
}

function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function getEmoji(category) {
  const icons = {
    "Elektronik": "💻",
    "Buku & Pendidikan": "📚",
    "Peralatan Rumah": "🪑",
    "Olahraga": "⚽",
    "Lainnya": "📦"
  };
  return icons[category] || "📦";
}

function updateStatistics() {
  document.getElementById("total-items").textContent = items.length;
  document.getElementById("available-items").textContent =
    items.filter(item => item.status === "Available").length;
  document.getElementById("borrowed-items").textContent =
    items.filter(item => item.status === "Borrowed").length;
  document.getElementById("item-count").textContent =
    `${items.length} barang`;
}

function renderItems() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedStatus = filterStatus.value;

  const filteredItems = items.filter(item => {
    const matchesKeyword =
      item.name.toLowerCase().includes(keyword) ||
      item.owner.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword);
    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;
    return matchesKeyword && matchesStatus;
  });

  itemList.innerHTML = filteredItems.map(item => `
    <article class="item-card">
      <div class="item-emoji" aria-hidden="true">${getEmoji(item.category)}</div>
      <div class="item-info">
        <h3>${escapeHTML(item.name)}</h3>
        <p>${escapeHTML(item.category)} · Pemilik: ${escapeHTML(item.owner)}</p>
      </div>
      <div class="item-actions">
        <span class="status status-${item.status}">${item.status}</span>
        <button class="delete-button" type="button" data-delete="${item.id}"
          aria-label="Hapus ${escapeHTML(item.name)}" title="Hapus barang">×</button>
      </div>
    </article>
  `).join("");

  emptyState.classList.toggle("hidden", filteredItems.length > 0);
  if (filteredItems.length === 0 && items.length > 0) {
    emptyState.querySelector("h3").textContent = "Barang tidak ditemukan";
    emptyState.querySelector("p").textContent = "Coba ubah kata kunci atau filter status.";
  } else if (items.length === 0) {
    emptyState.querySelector("h3").textContent = "Belum ada barang";
    emptyState.querySelector("p").textContent = "Jadilah yang pertama membagikan barang di komunitas ini.";
  }
  updateStatistics();
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const owner = ownerInput.value.trim();
  const name = itemNameInput.value.trim();
  const category = categoryInput.value;
  const status = statusInput.value;

  if (!owner || !name || !category || !status) {
    formMessage.textContent = "Mohon lengkapi semua kolom.";
    return;
  }

  const newItem = {
    id: (window.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    owner,
    name,
    category,
    status,
    createdAt: new Date().toISOString()
  };

  items.unshift(newItem);
  saveItems();
  renderItems();
  form.reset();
  statusInput.value = "Available";
  formMessage.textContent = `Barang "${name}" berhasil ditambahkan oleh ${owner}.`;
});

itemList.addEventListener("click", event => {
  const deleteButton = event.target.closest("[data-delete]");
  if (!deleteButton) return;

  const itemId = deleteButton.dataset.delete;
  const itemToDelete = items.find(item => item.id === itemId);
  items = items.filter(item => item.id !== itemId);
  saveItems();
  renderItems();
  formMessage.textContent = itemToDelete
    ? `Barang "${itemToDelete.name}" berhasil dihapus.`
    : "Barang berhasil dihapus.";
});

searchInput.addEventListener("input", renderItems);
filterStatus.addEventListener("change", renderItems);

renderItems();
