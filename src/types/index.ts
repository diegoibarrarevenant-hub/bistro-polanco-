import type {
  MenuItemModel,
  MenuItemVariantModel,
  CategoryModel,
  WineBottleModel,
  TastingMenuModel,
  TastingMenuItemModel,
  OrderModel,
  OrderItemModel,
  ReservationModel,
  CateringQuoteModel,
  ReviewModel,
} from "@/generated/prisma/models";

// ── Convenience aliases (Prisma 7 uses *Model naming) ────────────────────────

export type MenuItem = MenuItemModel;
export type MenuItemVariant = MenuItemVariantModel;
export type Category = CategoryModel;
export type WineBottle = WineBottleModel;
export type TastingMenu = TastingMenuModel;
export type TastingMenuItem = TastingMenuItemModel;
export type Order = OrderModel;
export type OrderItem = OrderItemModel;
export type Reservation = ReservationModel;
export type CateringQuote = CateringQuoteModel;
export type Review = ReviewModel;

// ── Enriched types returned by API routes ────────────────────────────────────

export type MenuItemWithCategory = MenuItem & {
  category: Category;
  variants: MenuItemVariant[];
  reviews: Pick<Review, "rating">[];
  _count: { reviews: number };
};

export type TastingMenuWithCourses = TastingMenu & {
  items: (TastingMenuItem & { menuItem: MenuItem })[];
};

export type OrderWithItems = Order & {
  items: (OrderItem & {
    menuItem: MenuItem | null;
    variant: MenuItemVariant | null;
    wineBottle: WineBottle | null;
    tastingMenu: TastingMenu | null;
  })[];
};

// ── Cart (client-side state, not persisted) ──────────────────────────────────

export interface CartItem {
  menuItemId?: string;
  variantId?: string;
  wineBottleId?: string;
  tastingMenuId?: string;
  name: string;
  imageUrl: string | null;
  unitPrice: number;
  quantity: number;
  notes?: string;
}

export interface Cart {
  items: CartItem[];
  orderType: "DINE_IN" | "TAKEAWAY" | "DELIVERY" | "CATERING" | "TASTING_MENU";
  scheduledFor?: string;
  specialInstructions?: string;
  occasionNote?: string;
  tableNumber?: number;
  guestCount?: number;
}

// ── API response envelope ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  error: string;
  details?: unknown;
}
