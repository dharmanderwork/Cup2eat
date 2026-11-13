import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SampleRequestModal } from './components/SampleRequestModal';
import { AuthModal } from './components/AuthModal';
import { CartDrawerAndCheckout } from './components/CartDrawerAndCheckout';
import { InvoiceModal } from './components/InvoiceModal';
import { WhatsAppSupportWidget } from './components/WhatsAppSupportWidget';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { FlavoursPage } from './pages/FlavoursPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { StoryPage } from './pages/StoryPage';
import { WholesalePage } from './pages/WholesalePage';
import { FounderPage } from './pages/FounderPage';
import { CustomerAccountPage } from './pages/CustomerAccountPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PageId, getPageFromHash, getHashFromPage } from './utils/router';
import { CUP_FLAVORS, FlavorData } from './utils/flavors';
import {
  ProductItem,
  CartItem,
  OrderRecord,
  OrderStatus,
  PaymentMethod,
  UserAccount,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  calculateCartTotals,
  buildUpdatedOrderTimeline,
} from './utils/ecommerce';

const STORAGE_KEYS = {
  PRODUCTS: 'cup2eat_products_v1',
  ORDERS: 'cup2eat_orders_v1',
  CART: 'cup2eat_cart_v1',
  USER: 'cup2eat_user_v1',
};

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      return getPageFromHash(window.location.hash);
    }
    return 'home';
  });

  const [currentFlavor, setCurrentFlavor] = useState<FlavorData>(CUP_FLAVORS[0]);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState<boolean>(false);

  // E-Commerce State with localStorage persistence
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage error
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage error
    }
    return INITIAL_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage error
    }
    return [
      {
        productId: INITIAL_PRODUCTS[0].id,
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
      },
    ];
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage error
    }
    return null;
  });

  // UI Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<OrderRecord | null>(null);
  const [trackedOrderId, setTrackedOrderId] = useState<string | undefined>(undefined);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  // Sync hash routing with state
  useEffect(() => {
    const onHashChange = () => {
      const page = getPageFromHash(window.location.hash);
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = getHashFromPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Handlers
  const handleAddToCart = (product: ProductItem, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id
            ? { ...i, product, quantity: Math.min(product.stock, i.quantity + quantity) }
            : i
        );
      }
      return [...prev, { productId: product.id, product, quantity }];
    });
  };

  const handleBuyNow = (product: ProductItem, quantity = 1) => {
    handleAddToCart(product, quantity);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.productId !== productId) return item;
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : null;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  // Checkout & Order Creation
  const handlePlaceOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    city: string;
    state: string;
    pincode: string;
    gstNumber?: string;
    paymentMethod: PaymentMethod;
    promoCode?: string;
  }): OrderRecord => {
    const totals = calculateCartTotals(cart, orderData.promoCode);
    const randomNum = Math.floor(8510 + Math.random() * 1400);
    const orderId = `ORD-2026-${randomNum}`;
    const invoiceNumber = `INV/26-27/0${randomNum}`;
    const nowStr = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ', ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const newOrder: OrderRecord = {
      id: orderId,
      invoiceNumber,
      customerId: currentUser?.id || 'usr-cust-guest',
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      shippingAddress: orderData.shippingAddress,
      city: orderData.city,
      state: orderData.state,
      pincode: orderData.pincode,
      gstNumber: orderData.gstNumber,
      items: cart.map((c) => ({
        productId: c.productId,
        sku: c.product.sku,
        name: c.product.name,
        flavor: c.product.flavor,
        cupsCount: c.product.cupsCount,
        quantity: c.quantity,
        unitPrice: c.product.price,
        lineTotal: c.product.price * c.quantity,
      })),
      subtotal: totals.subtotal,
      gstAmount: totals.gstIncluded,
      shippingCost: totals.shippingCost,
      discountAmount: totals.discountAmount,
      totalAmount: totals.grandTotal,
      paymentMethod: orderData.paymentMethod,
      paymentTransactionId: `TXN_${orderData.paymentMethod.slice(0, 3).toUpperCase()}_${Date.now().toString().slice(-8)}`,
      paymentStatus: 'Paid',
      orderStatus: 'Confirmed',
      createdAt: nowStr,
      estimatedDelivery: 'Within 48 Hours (Express Air/Surface)',
      courierName: 'BlueDart Express Surface',
      awbTrackingCode: `BD904${randomNum}IN`,
      timeline: [
        {
          status: 'Confirmed',
          timestamp: nowStr,
          note: 'Online payment verified & GST Tax Invoice generated automatically.',
          completed: true,
        },
        {
          status: 'Packed',
          timestamp: 'Scheduled Today',
          note: 'Moisture-locked corrugated cartons queued at Ghaziabad Food Unit.',
          completed: false,
        },
        {
          status: 'In Transit',
          timestamp: 'Pending',
          note: 'Express pickup scheduled with BlueDart.',
          completed: false,
        },
        {
          status: 'Out for Delivery',
          timestamp: 'Pending',
          note: 'Local hub agent will call before delivery.',
          completed: false,
        },
        {
          status: 'Delivered',
          timestamp: 'Pending',
          note: 'Handed over with OTP verification.',
          completed: false,
        },
      ],
    };

    // Deduct stock from products
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const bought = cart.find((c) => c.productId === p.id);
        if (!bought) return p;
        return { ...p, stock: Math.max(0, p.stock - bought.quantity) };
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    return newOrder;
  };

  // Admin Order Status & Stock Controls
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const timestampStr =
      new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ', ' +
      new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              orderStatus: newStatus,
              timeline: buildUpdatedOrderTimeline(ord.timeline, newStatus, timestampStr),
            }
          : ord
      )
    );
  };

  const handleUpdateProductStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );
  };

  const handleUpdateProductPrice = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
    );
  };

  const handleAddNewProduct = (newProduct: ProductItem) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      navigateTo('admin');
    } else {
      navigateTo('account');
    }
  };

  const handleTrackSpecificOrder = (orderId: string) => {
    setTrackedOrderId(orderId);
    navigateTo('track');
  };

  const totalCartItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#202522] flex flex-col font-sans selection:bg-[#0e382b] selection:text-[#EDE5DC]">
      {/* Universal Multi-Page Navbar with Cart Badge, Customer/Admin Login & Reading Progress Bar */}
      <Navbar
        currentPage={currentPage}
        cartCount={totalCartItems}
        currentUser={currentUser}
        onNavigate={navigateTo}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOrderClick={() => navigateTo('shop')}
        onSampleClick={() => setIsSampleModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1 transition-opacity duration-200">
        {currentPage === 'home' && (
          <HomePage
            currentFlavor={currentFlavor}
            onFlavorChange={setCurrentFlavor}
            onNavigate={navigateTo}
            onRequestSample={() => setIsSampleModalOpen(true)}
            products={products}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            products={products}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        )}

        {currentPage === 'flavours' && (
          <FlavoursPage
            onOrderWholesale={() => navigateTo('shop')}
            onRequestSample={() => setIsSampleModalOpen(true)}
          />
        )}

        {currentPage === 'track' && (
          <TrackOrderPage
            orders={orders}
            initialOrderId={trackedOrderId}
            onViewInvoice={(order) => setActiveInvoiceOrder(order)}
          />
        )}

        {currentPage === 'story' && (
          <StoryPage
            onNavigateToWholesale={() => navigateTo('shop')}
            onRequestSample={() => setIsSampleModalOpen(true)}
          />
        )}

        {currentPage === 'wholesale' && (
          <WholesalePage
            onRequestSample={() => setIsSampleModalOpen(true)}
          />
        )}

        {currentPage === 'founder' && (
          <FounderPage
            onOrderWholesale={() => navigateTo('shop')}
            onRequestSample={() => setIsSampleModalOpen(true)}
          />
        )}

        {currentPage === 'account' && (
          <CustomerAccountPage
            currentUser={currentUser}
            orders={orders}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onQuickDemoLogin={(user) => setCurrentUser(user)}
            onLogout={() => setCurrentUser(null)}
            onViewInvoice={(order) => setActiveInvoiceOrder(order)}
            onTrackOrder={handleTrackSpecificOrder}
            onGoToShop={() => navigateTo('shop')}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboardPage
            currentUser={currentUser}
            products={products}
            orders={orders}
            onSwitchToAdmin={(adminUser) => setCurrentUser(adminUser)}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdateProductStock={handleUpdateProductStock}
            onUpdateProductPrice={handleUpdateProductPrice}
            onAddNewProduct={handleAddNewProduct}
            onViewInvoice={(order) => setActiveInvoiceOrder(order)}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Customer & Admin Login / Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Slide-Over Cart Drawer & Online Payment Checkout Modal */}
      <CartDrawerAndCheckout
        isCartOpen={isCartOpen}
        isCheckoutOpen={isCheckoutOpen}
        cart={cart}
        currentUser={currentUser}
        onCloseCart={() => setIsCartOpen(false)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onCloseCheckout={() => setIsCheckoutOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onPlaceOrder={handlePlaceOrder}
        onViewInvoice={(order) => setActiveInvoiceOrder(order)}
        onTrackOrder={handleTrackSpecificOrder}
      />

      {/* Automatic Printable GST Tax Invoice Modal */}
      <InvoiceModal
        order={activeInvoiceOrder}
        onClose={() => setActiveInvoiceOrder(null)}
      />

      {/* Tasting Sample Request Modal */}
      <SampleRequestModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
      />

      {/* Floating WhatsApp Support Integration */}
      <WhatsAppSupportWidget />
    </div>
  );
}

export default App;
