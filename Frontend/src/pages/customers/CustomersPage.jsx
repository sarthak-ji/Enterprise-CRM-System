// filepath: src/pages/customers/CustomersPage.jsx
// Refactored CustomersPage utilizing custom hooks (useFilterAndSort, usePagination, useDisclosure) and production architecture.
import { useState, useCallback } from 'react';
import { UserPlus, Building2, DollarSign, ShieldAlert, Trash2, Award } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { INITIAL_CUSTOMERS } from '@/features/customers/data/mockCustomersData.js';
import { CustomerFilters } from '@/features/customers/CustomerFilters.jsx';
import { CustomerTable } from '@/features/customers/CustomerTable.jsx';
import { CustomerFormModal } from '@/features/customers/CustomerFormModal.jsx';
import { DeleteCustomerModal } from '@/features/customers/DeleteCustomerModal.jsx';
import { CustomerProfileDrawer } from '@/features/customers/CustomerProfileDrawer.jsx';
import { Pagination } from '@/components/ui/Pagination.jsx';
import { useDisclosure } from '@/hooks/useDisclosure.js';
import { usePagination } from '@/hooks/usePagination.js';
import { useFilterAndSort } from '@/hooks/useFilterAndSort.js';
import { formatCurrency } from '@/utils/formatters.js';

const SEARCH_KEYS = ['name', 'company', 'email', 'phone'];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [selectedIds, setSelectedIds] = useState([]);

  // Custom Hooks for State Management & Disclosure
  const formModal = useDisclosure(false);
  const deleteModal = useDisclosure(false);
  const profileDrawer = useDisclosure(false);

  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    tierFilter,
    setTierFilter,
    sortBy,
    setSortBy,
    resetFilters,
    filteredItems: filteredCustomers,
  } = useFilterAndSort({
    items: customers,
    searchKeys: SEARCH_KEYS,
    initialSortBy: 'spent-desc',
  });

  const {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    paginatedItems: paginatedCustomers,
    changePage,
    changePageSize,
  } = usePagination(filteredCustomers, 10);

  // Selection Handlers
  const handleToggleSelect = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleToggleSelectAll = useCallback(() => {
    if (selectedIds.length === paginatedCustomers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedCustomers.map((c) => c.id));
    }
  }, [selectedIds.length, paginatedCustomers]);

  // CRUD Handlers
  const handleCreateCustomer = useCallback(
    (newCustData) => {
      const newCustomer = {
        ...newCustData,
        id: `CUST-${1000 + customers.length + 1}`,
        activeDeals: 0,
        joinedDate: new Date().toISOString().split('T')[0],
        notes: [],
        timeline: [
          {
            id: `tl-new-${Date.now()}`,
            type: 'account',
            title: 'Account Created',
            description: `Customer account ${newCustData.company} added to CRM.`,
            date: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            actor: 'System Admin',
          },
        ],
      };
      setCustomers((prev) => [newCustomer, ...prev]);
      toast.success(`Customer "${newCustomer.company}" created!`);
    },
    [customers.length]
  );

  const handleUpdateCustomer = useCallback(
    (updatedData) => {
      setCustomers((prev) =>
        prev.map((c) => (c.id === updatedData.id ? { ...c, ...updatedData } : c))
      );
      if (profileDrawer.data?.id === updatedData.id) {
        profileDrawer.setData((prev) => ({ ...prev, ...updatedData }));
      }
      toast.success(`Account "${updatedData.company}" updated!`);
    },
    [profileDrawer]
  );

  const handleDeleteCustomer = useCallback((id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    setSelectedIds((prev) => prev.filter((i) => i !== id));
    toast.success('Customer account deleted');
  }, []);

  const handleAddNote = useCallback(
    (customerId, noteContent) => {
      const newNote = {
        id: `note-${Date.now()}`,
        author: 'Current User',
        date: new Date().toLocaleString(),
        content: noteContent,
      };

      setCustomers((prev) =>
        prev.map((c) =>
          c.id === customerId
            ? { ...c, notes: [newNote, ...(c.notes || [])] }
            : c
        )
      );

      if (profileDrawer.data?.id === customerId) {
        profileDrawer.setData((prev) => ({
          ...prev,
          notes: [newNote, ...(prev.notes || [])],
        }));
      }

      toast.success('Note added to customer profile');
    },
    [profileDrawer]
  );

  const handleBulkDelete = useCallback(() => {
    if (selectedIds.length === 0) return;
    setCustomers((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
    setSelectedIds([]);
    toast.success(`Deleted ${selectedIds.length} selected customer accounts`);
  }, [selectedIds]);

  // Metrics
  const totalLtv = customers.reduce((acc, curr) => acc + curr.totalSpent, 0);
  const atRiskCount = customers.filter((c) => c.status === 'At-Risk').length;
  const enterpriseCount = customers.filter((c) => c.tier === 'Enterprise').length;

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Customer Management
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Manage customer accounts, lifetime value, relationship notes, and interaction history
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <button
              type="button"
              onClick={handleBulkDelete}
              className="ds-btn ds-btn-danger text-xs h-9 px-3"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete ({selectedIds.length})</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => formModal.open(null)}
            className="ds-btn ds-btn-primary text-xs h-9 px-4 shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="ds-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">Total Accounts</p>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mt-0.5">
              {customers.length}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="ds-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">Total LTV Revenue</p>
            <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {formatCurrency(totalLtv)}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="ds-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">Enterprise Accounts</p>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mt-0.5">
              {enterpriseCount}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="ds-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">At-Risk Accounts</p>
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mt-0.5">
              {atRiskCount}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Control Bar (Search, Filter, Sort) */}
      <CustomerFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        tierFilter={tierFilter}
        onTierFilterChange={setTierFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onResetFilters={resetFilters}
        totalResults={totalItems}
      />

      {/* Main Customer Table */}
      <div className="ds-card overflow-hidden shadow-sm border border-[var(--color-border)]">
        <CustomerTable
          customers={paginatedCustomers}
          sortBy={sortBy}
          onSortToggle={(key) => {
            if (sortBy.startsWith(key)) {
              setSortBy(sortBy.endsWith('-asc') ? `${key}-desc` : `${key}-asc`);
            } else {
              setSortBy(`${key}-asc`);
            }
          }}
          onViewProfile={(c) => profileDrawer.open(c)}
          onEditCustomer={(c) => formModal.open(c)}
          onDeleteCustomer={(c) => deleteModal.open(c)}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleSelectAll={handleToggleSelectAll}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={changePage}
          onPageSizeChange={changePageSize}
        />
      </div>

      {/* Modals & Drawer */}
      <CustomerFormModal
        isOpen={formModal.isOpen}
        onClose={formModal.close}
        onSubmit={formModal.data ? handleUpdateCustomer : handleCreateCustomer}
        initialData={formModal.data}
      />

      <DeleteCustomerModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDeleteCustomer}
        customer={deleteModal.data}
      />

      <CustomerProfileDrawer
        isOpen={profileDrawer.isOpen}
        onClose={profileDrawer.close}
        customer={profileDrawer.data}
        onEdit={(c) => formModal.open(c)}
        onDelete={(c) => deleteModal.open(c)}
        onAddNote={handleAddNote}
      />
    </div>
  );
}
