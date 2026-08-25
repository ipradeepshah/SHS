"use client";
import { useState, useEffect } from "react";
import { Search, Plus, LayoutGrid, List } from "lucide-react";

// ── Admin components ──
import LoginForm         from "@/components/admin/LoginForm";
import AdminHeader       from "@/components/admin/AdminHeader";
import StatsCards        from "@/components/admin/StatsCards";
import ProductTable      from "@/components/admin/ProductTable";
import ProductGridView   from "@/components/admin/ProductGrid";
import ProductFormModal, { EMPTY_FORM, ProductForm } from "@/components/admin/ProductFormModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import Toast             from "@/components/Toast";

// ── Data / Types ──
import { Product, CATEGORIES } from "@/lib/types";
import { fetchProducts, createProduct, updateProductAPI, deleteProductAPI } from "@/lib/storage";
import { logout, checkAuth } from "@/app/actions/auth";

// ─────────────────────────────────────────────
export default function AdminPage() {
  console.log("AdminPage is rendering!");
  /* ── Auth ── */
  const [loggedIn, setLoggedIn] = useState(false);

  /* ── Products ── */
  const [products, setProducts]     = useState<Product[]>([]);
  const [search, setSearch]         = useState("");
  const [catFilter, setCatFilter]   = useState("");
  const [viewMode, setViewMode]     = useState<"list" | "grid">("list");
  const [toast, setToast]           = useState("");

  /* ── Form ── */
  const [showForm, setShowForm]     = useState(false);
  const [editingId, setEditingId]   = useState<string | null>(null);
  const [form, setForm]             = useState<ProductForm>({ ...EMPTY_FORM });
  const [formError, setFormError]   = useState("");

  /* ── Delete confirm ── */
  const [deleteId, setDeleteId]     = useState<string | null>(null);

  // Check auth on mount
  useEffect(() => {
    checkAuth().then((isAuth) => {
      if (isAuth) {
        setLoggedIn(true);
        fetchProducts().then(setProducts);
      }
    });
  }, []);

  const refresh = () => fetchProducts().then(setProducts);

  /* ── Auth handlers ── */
  function handleLogin() {
    setLoggedIn(true);
    refresh();
  }

  async function handleLogout() {
    await logout();
    setLoggedIn(false);
  }

  /* ── Product CRUD ── */
  function openAddForm() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setFormError("");
    setShowForm(true);
  }

  function openEditForm(p: Product) {
    setEditingId(p.id);
    setForm({
      name: p.name, description: p.description,
      price: String(p.price), mrp: String(p.mrp),
      category: p.category, brand: p.brand, unit: p.unit,
      stock: String(p.stock), image: p.image,
      tags: p.tags.join(", "),
    });
    setFormError("");
    setShowForm(true);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setFormError("Image must be under 2MB"); return; }
    
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setForm((f) => ({ ...f, image: url }));
    } catch (err) {
      setFormError("Failed to upload image");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim())              { setFormError("Product name is required"); return; }
    if (!form.price || Number(form.price) <= 0) { setFormError("Valid price is required"); return; }
    if (form.stock === "")              { setFormError("Stock quantity is required"); return; }

    const data = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      mrp: Number(form.mrp) || Number(form.price),
      category: form.category,
      brand: form.brand.trim(),
      unit: form.unit,
      stock: Number(form.stock),
      image: form.image,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    if (editingId) {
      updateProductAPI(editingId, data).then(() => {
        setToast("Product updated successfully!");
        refresh();
      });
    } else {
      createProduct(data).then(() => {
        setToast("Product added successfully!");
        refresh();
      });
    }
    setShowForm(false);
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setFormError("");
  }

  function handleDelete(id: string) {
    deleteProductAPI(id).then(() => {
      setDeleteId(null);
      setToast("Product deleted");
      refresh();
    });
  }

  /* ── Filtered products ── */
  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q
      || p.name.toLowerCase().includes(q)
      || p.brand.toLowerCase().includes(q)
      || p.category.toLowerCase().includes(q);
    return matchSearch && (!catFilter || p.category === catFilter);
  });

  /* ── Stats ── */
  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.stock > 0).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    categories: new Set(products.map((p) => p.category)).size,
  };

  /* ══════════════════════════════════════════
     LOGIN SCREEN
  ══════════════════════════════════════════ */
  if (!loggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  /* ══════════════════════════════════════════
     DASHBOARD
  ══════════════════════════════════════════ */
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>

      {/* ── Admin Header ── */}
      <AdminHeader onLogout={handleLogout} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "28px 16px" }}>

        {/* ── Stats Cards ── */}
        <StatsCards stats={stats} />

        {/* ── Toolbar ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", marginBottom: "16px" }}>

          {/* Search */}
          <div style={{ flex: 1, minWidth: "220px", display: "flex", alignItems: "center", gap: "8px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "9px 14px" }}>
            <Search size={15} color="#9ca3af" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              style={{ border: "none", outline: "none", fontSize: "14px", flex: 1, background: "transparent" }}
            />
          </div>

          {/* Category filter */}
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            style={{ padding: "9px 14px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "13px", background: "#fff", outline: "none", cursor: "pointer" }}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* View toggle */}
          <div style={{ display: "flex", border: "1px solid #e5e7eb", borderRadius: "10px", overflow: "hidden" }}>
            <button onClick={() => setViewMode("list")} style={{ padding: "9px 12px", background: viewMode === "list" ? "#0f2557" : "#fff", color: viewMode === "list" ? "#fff" : "#6b7280", border: "none", cursor: "pointer" }}>
              <List size={15} />
            </button>
            <button onClick={() => setViewMode("grid")} style={{ padding: "9px 12px", background: viewMode === "grid" ? "#0f2557" : "#fff", color: viewMode === "grid" ? "#fff" : "#6b7280", border: "none", cursor: "pointer" }}>
              <LayoutGrid size={15} />
            </button>
          </div>

          {/* Add product */}
          <button
            onClick={openAddForm}
            style={{ display: "flex", alignItems: "center", gap: "8px", background: "#ea6c00", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
          >
            <Plus size={16} /> Add Product
          </button>
        </div>

        {/* Product count */}
        <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "14px" }}>
          Showing {filtered.length} of {products.length} products
        </p>

        {/* ── Product Table or Grid ── */}
        {viewMode === "list"
          ? <ProductTable  products={filtered} onEdit={openEditForm} onDelete={setDeleteId} />
          : <ProductGridView products={filtered} onEdit={openEditForm} onDelete={setDeleteId} />
        }
      </div>

      {/* ── Add / Edit Modal ── */}
      <ProductFormModal
        isOpen={showForm}
        editingId={editingId}
        form={form}
        formError={formError}
        onClose={() => setShowForm(false)}
        onFormChange={setForm}
        onSubmit={handleSubmit}
        onImageUpload={handleImageUpload}
      />

      {/* ── Delete Confirm ── */}
      <DeleteConfirmModal
        productId={deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}
