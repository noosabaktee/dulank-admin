<script setup lang="ts">
import { useThemeStore } from "~/stores/theme";
import FeatherIcon from "~/components/Common/FeatherIcon.vue";

defineOptions({ inheritAttrs: false });

const route = useRoute();
const themeStore = useThemeStore();

interface SubmenuItem {
  title: string;
  to: string;
}

interface MenuItem {
  title: string;
  icon?: string;
  to?: string;
  submenus?: SubmenuItem[];
}

interface MenuGroup {
  header: string;
  items: MenuItem[];
}

const openMenus = ref<Record<string, boolean>>({});

const toggleSubmenu = (title: string) => {
  openMenus.value[title] = !openMenus.value[title];
};

const isChildActive = (sub: SubmenuItem) => {
  if (sub.to === "/" && route.path === "/") return true;
  if (sub.to !== "/" && (route.path === sub.to || route.path === `${sub.to}.html` || route.path.startsWith(`${sub.to}/`)))
    return true;
  return false;
};

const isParentActive = (item: MenuItem) => {
  if (item.to) {
    if (item.to === "/" && route.path === "/") return true;
    if (item.to !== "/" && (route.path === item.to || route.path === `${item.to}.html` || route.path.startsWith(`${item.to}/`)))
      return true;
  }
  if (item.submenus) {
    return item.submenus.some((s) => isChildActive(s));
  }
  return false;
};

const menuGroups: MenuGroup[] = [
  {
    header: "DASHBOARD",
    items: [
      {
        title: "Super Admin",
        icon: "grid",
        submenus: [
          { title: "Dashboard Admin", to: "/" },
          { title: "Subscriptions", to: "/subscriptions" },
        ],
      },
      { title: "Sales Dashboard", icon: "trending-up", to: "/sales-dashboard" },
      { title: "Kalkulator Dashboard", icon: "percent", to: "/kalkulator-dashboard" },
      { title: "Analytics Dashboard", icon: "bar-chart", to: "/analytics-dashboard" },
    ],
  },
  {
    header: "SALES",
    items: [
      { title: "Sales", icon: "trending-up", to: "/sales" },
      { title: "Invoice", icon: "file-text", to: "/invoice" },
      { title: "Delivery Note", icon: "file-text", to: "/delivery-note" },
      { title: "Sales Return", icon: "git-pull-request", to: "/sales-return" },
      { title: "Quotation", icon: "save", to: "/quotation" },
      { title: "Request For Quotation", icon: "save", to: "/request-quotation" },
      { title: "POS", icon: "hard-drive", to: "/pos" },
    ],
  },
  {
    header: "PAYMENT",
    items: [
      { title: "Payment-IN", icon: "shopping-bag", to: "/payment-inflow" },
      { title: "Payment-OUT", icon: "file-minus", to: "/payment-outflow" },
    ],
  },
  {
    header: "WORKFLOW",
    items: [
      { title: "Flow Category", icon: "grid", to: "/flow-category" },
      { title: "Flow Name", icon: "grid", to: "/flow-name" },
      { title: "Flow Template", icon: "grid", to: "/flow-template" },
      { title: "Work Flow", icon: "grid", to: "/work-flow" },
    ],
  },
  {
    header: "ORDERS",
    items: [
      { title: "Orders", icon: "shopping-bag", to: "/orders" },
      { title: "Job Orders", icon: "clipboard", to: "/job-order" },
      { title: "Job List", icon: "clipboard", to: "/job-list" },
      { title: "Job Branch", icon: "git-branch", to: "/job-branch" },
      { title: "My Job", icon: "check-square", to: "/my-job" },
      { title: "My Incentive", icon: "dollar-sign", to: "/my-incentive" },
    ],
  },
  {
    header: "WEBSTORE",
    items: [
      {
        title: "Customers",
        icon: "user",
        submenus: [
          { title: "Cart", to: "/cart" },
          { title: "Checkout", to: "/checkout" },
          { title: "Wishlist", to: "/wishlist" },
          { title: "Reviews", to: "/reviews" },
        ],
      },
      { title: "Support Ticket", icon: "pocket", to: "/support-ticket" },
      { title: "Contact Form", icon: "link-2", to: "/contact-form" },
    ],
  },
  {
    header: "CALCULATOR APPS",
    items: [
      { title: "Master Kertas", icon: "file-text", submenus: [{ title: "Paper Group", to: "/kertas-group-self" }, { title: "Paper Type", to: "/kertas-jenis-self" }, { title: "Paper Size", to: "/kertas-ukuran-self" }, { title: "Paper Price", to: "/kertas-harga-self" }] },
      { title: "All Printing Shop", icon: "copy", to: "/semua-percetakan" },
      {
        title: "All Machine",
        icon: "printer",
        submenus: [
          { title: "Offset", to: "/mesin-cetak" },
          { title: "Laminate", to: "/mesin-laminasi" },
          { title: "Die Cutting", to: "/mesin-pond" },
          { title: "Hot Print", to: "/mesin-poli" },
        ],
      },
      { title: "All Paper Shop", icon: "credit-card", to: "/semua-toko-kertas" },
      {
        title: "All Papers",
        icon: "file-text",
        submenus: [
          { title: "Paper Group", to: "/kertas-group" },
          { title: "Paper Size", to: "/kertas-ukuran" },
          { title: "Paper Type", to: "/kertas-jenis" },
          { title: "Paper Price", to: "/kertas-harga" },
        ],
      },
    ],
  },
  {
    header: "PRODUCTS & SERVICES",
    items: [
      { title: "Create Product", icon: "plus-square", to: "/create-product" },
      {
        title: "Custom Category",
        icon: "gift",
        submenus: [
          { title: "Cetak Full Color", to: "/cetak-full-color" },
          { title: "Calender", to: "/calender" },
        ],
      },
      { title: "Category", icon: "codepen", to: "/category" },
      { title: "Sub Category", icon: "speaker", to: "/sub-category" },
      { title: "Single Product", icon: "box", to: "/product-list" },
      {
        title: "Product List",
        icon: "list",
        submenus: [
          { title: "Offset Service", to: "/mesin-cetak-self" },
          { title: "Size Calculation", to: "/mesin-laminasi-self" },
          { title: "Minimum Qty Or Price", to: "/mesin-pond-self" },
          { title: "Hot Print", to: "/mesin-poli-self" },
          { title: "Variable Product", to: "/variable-product" },
          { title: "Large Format", to: "/large-format" },
        ],
      },
    ],
  },
  {
    header: "PAPER SHOP",
    items: [
      { title: "Paper Group", icon: "folder", to: "/kertas-group-self" },
      { title: "Paper Size", icon: "maximize-2", to: "/kertas-ukuran-self" },
      { title: "Paper Price", icon: "dollar-sign", to: "/kertas-harga-self" },
      { title: "Paper List", icon: "list", to: "/kertas-jenis-self" },
    ],
  },
  {
    header: "INVENTORY",
    items: [
      { title: "Unit", icon: "git-commit", to: "/unit" },
      { title: "Variant", icon: "layers", to: "/variant" },
      {
        title: "Components",
        icon: "list",
        submenus: [
          { title: "Minimum", to: "/komponen-minimum" },
          { title: "Fix", to: "/komponen-fiks" },
        ],
      },
    ],
  },
  {
    header: "PURCHASES",
    items: [
      { title: "Purchase", icon: "shopping-bag", to: "/purchase" },
      { title: "Purchase Order", icon: "file-minus", to: "/purchase-order" },
      { title: "Purchase Return", icon: "refresh-cw", to: "/purchase-return" },
      { title: "Purchase Item", icon: "package", to: "/purchase-item" },
      { title: "Purchase Category", icon: "grid", to: "/purchase-category" },
    ],
  },
  {
    header: "PROMO",
    items: [
      { title: "Voucher", icon: "tag", to: "/voucher" },
      {
        title: "Discount",
        icon: "trending-down",
        submenus: [
          { title: "Discount plan", to: "/discount-plan" },
          { title: "Discount", to: "/discount" },
        ],
      },
    ],
  },
  {
    header: "FINANCE & ACCOUNT",
    items: [
      {
        title: "Expense",
        icon: "external-link",
        submenus: [
          { title: "Expenses", to: "/expenses" },
          { title: "Expense category", to: "/expense-category" },
        ],
      },
      {
        title: "Income",
        icon: "file-plus",
        submenus: [
          { title: "Income", to: "/income" },
          { title: "Income category", to: "/income-category" },
        ],
      },
      { title: "Payments", icon: "credit-card", to: "/payments" },
      { title: "Balance Account", icon: "credit-card", to: "/balance-account" },
      { title: "Bank Account", icon: "credit-card", to: "/bank-account" },
      { title: "Money Transfer", icon: "share", to: "/money-transfer" },
      { title: "Balance Sheet", icon: "pie-chart", to: "/balance-sheet" },
      { title: "Cash Flow", icon: "git-branch", to: "/cash-flow" },
      { title: "Account Statement", icon: "pie-chart", to: "/account-statement" },
      { title: "Cash Advance", icon: "git-branch", to: "/cash-advance" },
      { title: "Incentive", icon: "share", to: "/incentive" },
      {
        title: "Tax",
        icon: "database",
        submenus: [
          { title: "Output Tax", to: "/output-tax" },
          { title: "Input Tax", to: "/input-tax" },
          { title: "Tax Rates", to: "/tax-rates" },
        ],
      },
    ],
  },
  {
    header: "PEOPLES",
    items: [
      { title: "Customers", icon: "user", to: "/customers" },
      { title: "Customer Types", icon: "user", to: "/customer-type" },
      { title: "Address", icon: "home", to: "/address" },
      { title: "Supplier", icon: "users", to: "/supplier" },
      { title: "Branch Store", icon: "home", to: "/store-list" },
    ],
  },
  {
    header: "HRM",
    items: [
      { title: "Employees", icon: "briefcase", to: "/employees" },
      { title: "Department", icon: "git-merge", to: "/department" },
      { title: "Designation", icon: "award", to: "/designation" },
      {
        title: "Payroll",
        icon: "calendar",
        submenus: [
          { title: "Employee salary", to: "/employee-salary" },
          { title: "Payslip", to: "/payslip" },
        ],
      },
    ],
  },
  {
    header: "REPORT",
    items: [
      {
        title: "Sales Report",
        icon: "bar-chart-2",
        submenus: [
          { title: "Sales Report", to: "/sales-report" },
          { title: "Best Seller", to: "/best-seller" },
        ],
      },
      { title: "Purchase Report", icon: "pie-chart", to: "/purchase-report" },
      { title: "Invoice Report", icon: "clipboard", to: "/invoice-report" },
      {
        title: "Supplier Report",
        icon: "calendar",
        submenus: [
          { title: "Supplier Report", to: "/supplier-report" },
          { title: "Supplier Due Report", to: "/supplier-due-report" },
        ],
      },
      {
        title: "Customers Report",
        icon: "calendar",
        submenus: [
          { title: "Customer Report", to: "/customer-report" },
          { title: "Customer Due Report", to: "/customer-due-report" },
          { title: "Customer Subscription", to: "/customer-due-report" },
        ],
      },
      { title: "Product Report", icon: "package", to: "/product-report" },
      { title: "Expense Report", icon: "server", to: "/expense-report" },
      { title: "Income Report", icon: "database", to: "/income-report" },
      { title: "Tax Report", icon: "database", to: "/tax-report" },
      { title: "Profit & Loss", icon: "pie-chart", to: "/profit-and-loss" },
      { title: "Annual Report", icon: "align-center", to: "/annual-reports" },
    ],
  },
  {
    header: "CONTENT",
    items: [
      { title: "Konten Kalkulator", icon: "file-text", to: "/merchant-settings#calculator-content" },
      { title: "All Blog", icon: "life-buoy", to: "/all-blog" },
      { title: "Blog Tag", icon: "hash", to: "/blog-tag" },
      { title: "Blog Category", icon: "sliders", to: "/blog-category" },
      { title: "Blog Comment", icon: "edit", to: "/blog-comment" },
      {
        title: "FAQ",
        icon: "help-circle",
        submenus: [
          { title: "Category", to: "/faq-category" },
          { title: "FAQ Question", to: "/faq" },
        ],
      },
      { title: "Our Client", icon: "users", to: "/our-client" },
      { title: "Download Files", icon: "paperclip", to: "/download-files" },
      { title: "Footer", icon: "underline", to: "/footer" },
      { title: "Banner", icon: "layout", to: "/banner" },
    ],
  },
  {
    header: "USER MANAGEMENT",
    items: [
      { title: "All Members", icon: "user-check", to: "/user" },
      { title: "User Admin", icon: "user-check", to: "/user-admin" },
      { title: "Role", icon: "shield", to: "/role-permissions" },
      { title: "Permissions", icon: "shield", to: "/role" },
      { title: "Delete Account Request", icon: "user-minus", to: "/delete-account" },
    ],
  },
  {
    header: "SETTING",
    items: [
      {
        title: "Webstore Setting",
        icon: "globe",
        submenus: [
          { title: "Profile", to: "/profile" },
          { title: "Company Setting", to: "/company-setting" },
        ],
      },
      {
        title: "Locations",
        icon: "globe",
        submenus: [
          { title: "Province", to: "/province" },
          { title: "Regency", to: "/regency" },
          { title: "District", to: "/district" },
        ],
      },
      {
        title: "App Setting",
        icon: "smartphone",
        submenus: [
          { title: "Invoice setting", to: "/invoice-setting" },
          { title: "Invoice template", to: "/invoice-template" },
          { title: "POS", to: "/pos-settings" },
        ],
      },
      {
        title: "System Setting",
        icon: "monitor",
        submenus: [
          { title: "Email setting", to: "/email-setting" },
          { title: "Language", to: "/language" },
          { title: "Custom Fields", to: "/custom-field" },
          { title: "OTP", to: "/otp" },
        ],
      },
      { title: "Prefixes", icon: "settings", to: "/prefixes" },
      { title: "Logout", icon: "log-out", to: "/signin" },
    ],
  },
];

// Auto-open active submenu on mount and route change
const syncActiveSubmenus = () => {
  menuGroups.forEach((group) => {
    group.items.forEach((item) => {
      if (item.submenus && item.submenus.some((s) => isChildActive(s))) {
        openMenus.value[item.title] = true;
      }
    });
  });
};

onMounted(() => {
  syncActiveSubmenus();
});

watch(
  () => route.path,
  () => {
    syncActiveSubmenus();
  },
);
</script>

<template>
  <aside
    v-bind="$attrs"
    :class="[
      'fixed inset-y-0 start-0 z-30 flex flex-col border-e border-gray-200 bg-white transition-all duration-300 dark:border-gray-800 dark:bg-gray-900 lg:top-16',
      themeStore.isSidebarCollapsed ? 'w-20' : 'w-[260px]',
      themeStore.isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <!-- Sidebar Top Brand Header (Mobile Drawer Only) -->
    <div class="flex h-16 items-center justify-between px-4 border-b border-gray-100 lg:hidden dark:border-gray-800">
      <NuxtLink to="/" class="flex items-center gap-2" @click="themeStore.closeMobileSidebar">
        <img src="/assets/img/logo-small.png" alt="Logo" class="h-8 w-auto" />
        <span class="text-base font-bold text-secondary dark:text-white">Kacetak</span>
      </NuxtLink>
      <button
        type="button"
        class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        title="Close Sidebar"
        @click="themeStore.closeMobileSidebar"
      >
        <FeatherIcon name="x" size="18" />
        <svg class="h-4 w-4 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>

    <!-- Scrollable Nav Menu Container -->
    <div class="flex-1 overflow-y-auto px-4 py-5 text-sm">
      <div
        v-for="(group, gIdx) in menuGroups"
        :key="gIdx"
        :class="['mb-5 pb-3.5', gIdx !== menuGroups.length - 1 ? 'border-b border-gray-200/60 dark:border-gray-800' : '']"
      >
        <!-- Menu Group Header (.submenu-hdr) -->
        <h6
          v-if="!themeStore.isSidebarCollapsed"
          class="mb-3 px-3.5 text-xs font-semibold uppercase tracking-normal text-[#1B2950] dark:text-gray-300"
        >
          {{ group.header }}
        </h6>

        <ul class="space-y-1">
          <li v-for="(item, iIdx) in group.items" :key="iIdx">
            <!-- 1. Menu Utama Tunggal (Single Link) -->
            <NuxtLink
              v-if="!item.submenus && item.to"
              :to="item.to"
              :class="[
                'group flex items-center rounded-[5px] px-3.5 py-2.5 text-[14px] font-medium transition-all duration-150',
                themeStore.isSidebarCollapsed ? 'justify-center' : 'gap-3',
                isParentActive(item)
                  ? 'bg-[#FE9F43]/[0.08] text-[#FE9F43] font-semibold dark:bg-[#FE9F43]/20'
                  : 'text-[#67748E] hover:bg-[#FE9F43]/[0.08] hover:text-[#FE9F43] dark:text-gray-400 dark:hover:bg-[#FE9F43]/10 dark:hover:text-[#FE9F43]',
              ]"
              :title="themeStore.isSidebarCollapsed ? item.title : undefined"
              @click="themeStore.closeMobileSidebar"
            >
              <FeatherIcon
                v-if="item.icon"
                :name="item.icon"
                size="16"
                :class="[
                  'flex-shrink-0 transition-colors',
                  isParentActive(item) ? 'text-[#FE9F43]' : 'text-[#637381] group-hover:text-[#FE9F43] dark:text-gray-400',
                ]"
              />
              <span v-if="!themeStore.isSidebarCollapsed" class="truncate">{{ item.title }}</span>
            </NuxtLink>

            <!-- 2. Menu Utama dengan Child Menu (Accordion Submenu) -->
            <div v-else-if="item.submenus">
              <button
                type="button"
                :class="[
                  'group flex w-full items-center rounded-[5px] px-3.5 py-2.5 text-[14px] font-medium transition-all duration-150',
                  themeStore.isSidebarCollapsed ? 'justify-center' : 'justify-between',
                  isParentActive(item)
                    ? 'text-[#FE9F43] font-semibold bg-[#FE9F43]/[0.08] dark:bg-[#FE9F43]/20'
                    : 'text-[#67748E] hover:bg-[#FE9F43]/[0.08] hover:text-[#FE9F43] dark:text-gray-400 dark:hover:bg-[#FE9F43]/10 dark:hover:text-[#FE9F43]',
                ]"
                :title="themeStore.isSidebarCollapsed ? item.title : undefined"
                @click="toggleSubmenu(item.title)"
              >
                <div class="flex items-center gap-3 truncate">
                  <FeatherIcon
                    v-if="item.icon"
                    :name="item.icon"
                    size="16"
                    :class="[
                      'flex-shrink-0 transition-colors',
                      isParentActive(item) ? 'text-[#FE9F43]' : 'text-[#637381] group-hover:text-[#FE9F43] dark:text-gray-400',
                    ]"
                  />
                  <span v-if="!themeStore.isSidebarCollapsed" class="truncate">{{ item.title }}</span>
                </div>

                <!-- Submenu Arrow Toggle Circle (.menu-arrow) -->
                <span
                  v-if="!themeStore.isSidebarCollapsed"
                  :class="[
                    'flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-200',
                    openMenus[item.title]
                      ? 'bg-[#FFEDDC] text-[#FE9F43] rotate-90 dark:bg-primary/20'
                      : 'bg-[#1B2950]/[0.05] text-[#67748E] dark:bg-white/10 dark:text-gray-400 group-hover:text-[#FE9F43]',
                  ]"
                >
                  <svg class="h-2.5 w-2.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </button>

              <!-- Child Menu List (Submenu Items) -->
              <div
                v-if="!themeStore.isSidebarCollapsed && openMenus[item.title]"
                class="mt-1 space-y-0.5 ms-3 border-s-2 border-gray-100 ps-1 dark:border-gray-800"
              >
                <NuxtLink
                  v-for="(sub, sIdx) in item.submenus"
                  :key="sIdx"
                  :to="sub.to"
                  :class="[
                    'group relative flex items-center rounded-md py-2 pe-3 ps-8 text-[14px] font-medium transition-colors duration-150',
                    isChildActive(sub)
                      ? 'text-[#FE9F43] font-semibold bg-[#FE9F43]/[0.06] dark:bg-[#FE9F43]/15'
                      : 'text-[#67748E] hover:text-[#FE9F43] hover:bg-[#FE9F43]/[0.04] dark:text-gray-400 dark:hover:text-[#FE9F43]',
                  ]"
                  @click="themeStore.closeMobileSidebar"
                >
                  <!-- Reference Child Menu Circular Dot Indicator -->
                  <span
                    :class="[
                      'absolute left-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full border-2 transition-all duration-150',
                      isChildActive(sub)
                        ? 'bg-[#FE9F43] border-[#FFDDBB]'
                        : 'bg-[#32475C]/40 border-white group-hover:bg-[#FE9F43] group-hover:border-[#FFDDBB] dark:border-gray-900',
                    ]"
                  />
                  <span class="truncate">{{ sub.title }}</span>
                </NuxtLink>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </aside>

  <!-- Mobile Backdrop Overlay -->
  <div
    v-if="themeStore.isMobileSidebarOpen"
    class="fixed inset-0 z-20 bg-black/50 lg:hidden backdrop-blur-sm"
    @click="themeStore.closeMobileSidebar"
  />
</template>
