import React, { useState } from 'react';
import {
  OrderRecord,
  OrderStatus,
  ProductItem,
  UserAccount,
  FlavorType,
  INITIAL_USERS,
} from '../utils/ecommerce';
import {
  ShieldAlert,
  Package,
  TrendingUp,
  AlertTriangle,
  FileText,
  Plus,
  Minus,
  CheckCircle2,
  Search,
  Truck,
  Boxes,
  Sparkles,
  X,
} from 'lucide-react';

interface AdminDashboardPageProps {
  currentUser: UserAccount | null;
  products: ProductItem[];
  orders: OrderRecord[];
  onSwitchToAdmin: (adminUser: UserAccount) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdateProductStock: (productId: string, newStock: number) => void;
  onUpdateProductPrice: (productId: string, newPrice: number) => void;
  onAddNewProduct: (newProduct: ProductItem) => void;
  onViewInvoice: (order: OrderRecord) => void;
}

const ALL_STATUSES: OrderStatus[] = [
  'Confirmed',
  'Packed',
  'In Transit',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
];

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  currentUser,
  products,
  orders,
  onSwitchToAdmin,
  onUpdateOrderStatus,
  onUpdateProductStock,
  onUpdateProductPrice,
  onAddNewProduct,
  onViewInvoice,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New Product Form State
  const [newSku, setNewSku] = useState('C2E-NEW-100');
  const [newName, setNewName] = useState('Corporate Gift Box — Assorted 48 Cups');
  const [newFlavor, setNewFlavor] = useState<FlavorType>('Assorted All-4 Mix');
  const [newCategory, setNewCategory] = useState<ProductItem['category']>('Event Pack');
  const [newPrice, setNewPrice] = useState(799);
  const [newCupsCount, setNewCupsCount] = useState(48);
  const [newStock, setNewStock] = useState(50);

  const totalRevenue = orders
    .filter((o) => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalCupsSold = orders
    .filter((o) => o.orderStatus !== 'Cancelled')
    .reduce(
      (sum, o) => sum + o.items.reduce((s, i) => s + i.cupsCount * i.quantity, 0),
      0
    );

  const lowStockProducts = products.filter((p) => p.stock <= p.lowStockThreshold);
  const totalInventoryPacks = products.reduce((sum, p) => sum + p.stock, 0);

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'All' || o.orderStatus === statusFilter;
    const q = orderSearch.trim().toLowerCase();
    const matchesQuery =
      !q ||
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.awbTrackingCode.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ProductItem = {
      id: `prod-custom-${Date.now()}`,
      sku: newSku.trim().toUpperCase(),
      name: newName.trim(),
      subtitle: `${newFlavor} · ${newCupsCount} Edible Cups Pack`,
      description: `Newly added ${newFlavor} edible cup pack from Admin Inventory Control.`,
      price: Number(newPrice) || 499,
      originalPrice: Math.round((Number(newPrice) || 499) * 1.2),
      cupsCount: Number(newCupsCount) || 36,
      category: newCategory,
      flavor: newFlavor,
      stock: Number(newStock) || 25,
      lowStockThreshold: 10,
      image: '/assets/aistudio/Screenshot_20261111_234800_Instagram_f080609a.jpg',
      badge: 'New Launch',
      rating: 5.0,
      reviewsCount: 1,
      colorHex: '#0e382b',
      secondaryColorHex: '#E6C687',
      flavorId:
        newFlavor === 'Rich Dark Cocoa'
          ? 'chocolate'
          : newFlavor === 'Royal Elaichi'
          ? 'elaichi'
          : newFlavor === 'Chocolate Coated Rim'
          ? 'chocolate_coated'
          : 'vanilla',
    };
    onAddNewProduct(created);
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 sm:py-14" data-testid="admin-dashboard-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header Bar */}
        <div className="bg-[#0e382b] text-white rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E6C687] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cup2Eat Command Center · Admin & Inventory ERP</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-black tracking-tight">
              Admin Dashboard — Order & Stock Control
            </h1>
            <p className="text-xs sm:text-sm text-[#B8D8CA]">
              Manage incoming retail & wholesale ₹3,999 master box orders, update live courier
              statuses, generate GST invoices, and control warehouse stock levels.
            </p>
          </div>

          {currentUser?.role !== 'admin' ? (
            <button
              onClick={() => onSwitchToAdmin(INITIAL_USERS[1])}
              data-testid="activate-admin-session-btn"
              className="px-5 py-3 rounded-xl bg-[#E6C687] hover:bg-[#f2d59b] text-[#0e382b] font-extrabold text-xs sm:text-sm transition-all cursor-pointer shrink-0 shadow-md"
            >
              Activate Admin Session (Varun Khera)
            </button>
          ) : (
            <div className="bg-white/10 border border-white/15 rounded-2xl px-4 py-3 text-xs">
              <div className="text-[#E6C687] font-bold">Logged in as Administrator</div>
              <div className="font-semibold text-white">{currentUser.name}</div>
              <div className="text-[11px] text-[#B8D8CA]">{currentUser.email}</div>
            </div>
          )}
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E5DEC9] shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-[#68736B]">
              <span>GROSS REVENUE (PAID)</span>
              <TrendingUp className="w-4 h-4 text-[#146C43]" />
            </div>
            <div
              className="font-display text-2xl sm:text-3xl font-black text-[#0e382b] mt-2"
              data-testid="admin-kpi-revenue"
            >
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-[#146C43] font-semibold mt-1">
              {totalCupsSold.toLocaleString('en-IN')} Edible Cups Dispatched
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E5DEC9] shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-[#68736B]">
              <span>TOTAL ORDERS</span>
              <Truck className="w-4 h-4 text-[#0e382b]" />
            </div>
            <div
              className="font-display text-2xl sm:text-3xl font-black text-[#0e382b] mt-2"
              data-testid="admin-kpi-orders"
            >
              {orders.length} Orders
            </div>
            <div className="text-[11px] text-[#5A655E] mt-1">
              {orders.filter((o) => o.orderStatus === 'Delivered').length} Delivered ·{' '}
              {orders.filter((o) => o.orderStatus !== 'Delivered').length} Active
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E5DEC9] shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-[#68736B]">
              <span>WAREHOUSE INVENTORY</span>
              <Boxes className="w-4 h-4 text-[#C89D54]" />
            </div>
            <div
              className="font-display text-2xl sm:text-3xl font-black text-[#0e382b] mt-2"
              data-testid="admin-kpi-stock"
            >
              {totalInventoryPacks} Packs
            </div>
            <div className="text-[11px] text-[#5A655E] mt-1">
              Across {products.length} Active Catalogue SKUs
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E5DEC9] shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-[#68736B]">
              <span>LOW-STOCK ALERTS</span>
              <AlertTriangle className="w-4 h-4 text-[#B45309]" />
            </div>
            <div
              className="font-display text-2xl sm:text-3xl font-black text-[#B45309] mt-2"
              data-testid="admin-kpi-lowstock"
            >
              {lowStockProducts.length} SKU(s)
            </div>
            <div className="text-[11px] text-[#B45309] font-semibold mt-1">
              {lowStockProducts.length > 0
                ? `Needs Restock: ${lowStockProducts[0].sku}`
                : 'All SKUs Adequately Stocked'}
            </div>
          </div>
        </div>

        {/* Navigation Tabs: Order Management vs Inventory / Stock Management */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DFD6C7] pb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              data-testid="admin-tab-orders"
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#0e382b] text-white shadow-sm'
                  : 'bg-white text-[#4A554E] border border-[#E5DEC9] hover:bg-[#F3ECE0]'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Order Management System ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              data-testid="admin-tab-inventory"
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'inventory'
                  ? 'bg-[#0e382b] text-white shadow-sm'
                  : 'bg-white text-[#4A554E] border border-[#E5DEC9] hover:bg-[#F3ECE0]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Inventory / Stock Management ({products.length} SKUs)</span>
              {lowStockProducts.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] text-[10px] font-extrabold">
                  {lowStockProducts.length} Low
                </span>
              )}
            </button>
          </div>

          {activeTab === 'inventory' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              data-testid="admin-add-product-btn"
              className="px-4 py-2.5 rounded-xl bg-[#0e382b] hover:bg-[#16503e] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#E6C687]" />
              <span>Add New Product SKU</span>
            </button>
          )}
        </div>

        {/* TAB 1: ORDER MANAGEMENT SYSTEM */}
        {activeTab === 'orders' && (
          <div className="space-y-4" data-testid="admin-orders-panel">
            {/* Filter & Search Bar */}
            <div className="bg-white rounded-2xl p-4 border border-[#E5DEC9] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#7A6B53] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Filter by Order ID, Customer Name, or AWB..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#DFD6C7] text-xs"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {['All', ...ALL_STATUSES].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                      statusFilter === st
                        ? 'bg-[#0e382b] text-white'
                        : 'bg-[#FAF8F5] text-[#4A554E] hover:bg-[#EFE8DC]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-[#E5DEC9] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F3ECE0] text-[#4A3F31] text-[11px] font-bold uppercase tracking-wider border-b border-[#E5DEC9]">
                      <th className="py-3.5 px-4">Order ID & Date</th>
                      <th className="py-3.5 px-4">Customer & Destination</th>
                      <th className="py-3.5 px-4">Items & Cups</th>
                      <th className="py-3.5 px-4">Total & Payment</th>
                      <th className="py-3.5 px-4">Update Order Status</th>
                      <th className="py-3.5 px-4 text-right">GST Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE8DC] text-xs">
                    {filteredOrders.map((order) => {
                      const cups = order.items.reduce(
                        (s, i) => s + i.cupsCount * i.quantity,
                        0
                      );
                      return (
                        <tr key={order.id} className="hover:bg-[#FAF8F5]">
                          <td className="py-4 px-4">
                            <div className="font-mono font-black text-[#0e382b]">{order.id}</div>
                            <div className="text-[11px] text-[#68736B]">{order.createdAt}</div>
                            <div className="text-[10px] font-mono text-[#7A6B53] mt-0.5">
                              AWB: {order.awbTrackingCode}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-bold text-[#1E2420]">{order.customerName}</div>
                            <div className="text-[11px] text-[#5A655E]">
                              {order.city}, {order.state} ({order.pincode})
                            </div>
                            <div className="text-[11px] text-[#68736B]">{order.customerPhone}</div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-bold text-[#0e382b]">{cups} Edible Cups</div>
                            <div className="text-[11px] text-[#5A655E] max-w-xs truncate">
                              {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-display font-black text-sm text-[#0e382b]">
                              ₹{order.totalAmount.toLocaleString('en-IN')}
                            </div>
                            <div className="text-[11px] text-[#146C43] font-semibold">
                              ✓ {order.paymentMethod}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <select
                              value={order.orderStatus}
                              onChange={(e) =>
                                onUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                              }
                              data-testid={`status-select-${order.id}`}
                              className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#0e382b]/30 font-bold text-xs text-[#0e382b] cursor-pointer"
                            >
                              {ALL_STATUSES.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => onViewInvoice(order)}
                              data-testid={`admin-invoice-btn-${order.id}`}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0e382b] hover:bg-[#16503e] text-white font-bold text-xs cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5 text-[#E6C687]" />
                              <span>Invoice</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY / STOCK MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="space-y-4" data-testid="admin-inventory-panel">
            <div className="bg-white rounded-3xl border border-[#E5DEC9] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F3ECE0] text-[#4A3F31] text-[11px] font-bold uppercase tracking-wider border-b border-[#E5DEC9]">
                      <th className="py-3.5 px-4">SKU & Product Name</th>
                      <th className="py-3.5 px-4">Category & Flavour</th>
                      <th className="py-3.5 px-4">Price (₹)</th>
                      <th className="py-3.5 px-4">Current Stock</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Quick Stock Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE8DC] text-xs">
                    {products.map((product) => {
                      const isLow = product.stock <= product.lowStockThreshold;
                      return (
                        <tr key={product.id} className="hover:bg-[#FAF8F5]">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-11 h-11 rounded-xl object-cover border border-[#E5DEC9] shrink-0"
                              />
                              <div>
                                <div className="font-mono text-[10px] font-bold text-[#7A6B53]">
                                  {product.sku}
                                </div>
                                <div className="font-bold text-[#1E2420]">{product.name}</div>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-bold text-[#0e382b]">{product.flavor}</div>
                            <div className="text-[11px] text-[#68736B]">
                              {product.category} · {product.cupsCount} Cups
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-[#5A655E]">₹</span>
                              <input
                                type="number"
                                value={product.price}
                                onChange={(e) =>
                                  onUpdateProductPrice(
                                    product.id,
                                    Math.max(1, Number(e.target.value) || 0)
                                  )
                                }
                                className="w-20 px-2.5 py-1.5 rounded-lg border border-[#DFD6C7] font-bold text-xs text-[#0e382b]"
                              />
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <span
                              data-testid={`stock-count-${product.id}`}
                              className="font-mono text-sm font-black text-[#1E2420]"
                            >
                              {product.stock} Packs
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            {product.stock <= 0 ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FDECEB] text-[#99382C] text-[11px] font-extrabold">
                                <ShieldAlert className="w-3.5 h-3.5" /> Out of Stock
                              </span>
                            ) : isLow ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-[11px] font-extrabold">
                                <AlertTriangle className="w-3.5 h-3.5" /> Low Stock Alert
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F6EE] text-[#146C43] text-[11px] font-extrabold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() =>
                                  onUpdateProductStock(
                                    product.id,
                                    Math.max(0, product.stock - 5)
                                  )
                                }
                                data-testid={`stock-dec-${product.id}`}
                                className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#EFE8DC] border border-[#DFD6C7] text-[#1E2420] cursor-pointer"
                                title="Decrease by 5"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() =>
                                  onUpdateProductStock(product.id, product.stock + 10)
                                }
                                data-testid={`stock-inc-${product.id}`}
                                className="px-3 py-1.5 rounded-lg bg-[#0e382b] hover:bg-[#16503e] text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5 text-[#E6C687]" />
                                <span>Restock +10</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-[#E5DEC9] shadow-2xl overflow-hidden animate-fadeIn">
            <div className="bg-[#0e382b] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-display text-base font-bold">
                Add New Edible Cup Product SKU
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#4A554E] mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DFD6C7] font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#4A554E] mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as ProductItem['category'])
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#DFD6C7] font-semibold"
                  >
                    <option value="Starter Pack">Starter Pack</option>
                    <option value="Retail Pack">Retail Pack</option>
                    <option value="Event Pack">Event Pack</option>
                    <option value="Wholesale Carton">Wholesale Carton</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#4A554E] mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DFD6C7] font-semibold"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#4A554E] mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#DFD6C7]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#4A554E] mb-1">Cups / Pack *</label>
                  <input
                    type="number"
                    required
                    value={newCupsCount}
                    onChange={(e) => setNewCupsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#DFD6C7]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#4A554E] mb-1">Initial Stock *</label>
                  <input
                    type="number"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#DFD6C7]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#4A554E] mb-1">Flavour *</label>
                <select
                  value={newFlavor}
                  onChange={(e) => setNewFlavor(e.target.value as FlavorType)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DFD6C7] font-semibold"
                >
                  <option value="Assorted All-4 Mix">Assorted All-4 Mix</option>
                  <option value="Vanilla Crisp">Vanilla Crisp</option>
                  <option value="Rich Dark Cocoa">Rich Dark Cocoa</option>
                  <option value="Royal Elaichi">Royal Elaichi</option>
                  <option value="Chocolate Coated Rim">Chocolate Coated Rim</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#DFD6C7] font-bold text-[#4A554E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0e382b] text-white font-bold cursor-pointer"
                >
                  Save Product to Catalogue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
