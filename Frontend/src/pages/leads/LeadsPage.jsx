// filepath: src/pages/leads/LeadsPage.jsx
// Refactored LeadsPage utilizing custom hooks (useFilterAndSort, usePagination, useDisclosure) and production architecture.
import { useState, useCallback } from 'react';
import { UserPlus, Users, DollarSign, Filter, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { INITIAL_LEADS } from '@/features/leads/data/mockLeadsData.js';
import { LeadFilters } from '@/features/leads/LeadFilters.jsx';
import { LeadTable } from '@/features/leads/LeadTable.jsx';
import { LeadFormModal } from '@/features/leads/LeadFormModal.jsx';
import { DeleteLeadModal } from '@/features/leads/DeleteLeadModal.jsx';
import { LeadDetailsDrawer } from '@/features/leads/LeadDetailsDrawer.jsx';
import { Pagination } from '@/components/ui/Pagination.jsx';
import { useDisclosure } from '@/hooks/useDisclosure.js';
import { usePagination } from '@/hooks/usePagination.js';
import { useFilterAndSort } from '@/hooks/useFilterAndSort.js';
import { formatCurrency } from '@/utils/formatters.js';

const SEARCH_KEYS = ['name', 'company', 'email'];

export default function LeadsPage() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [selectedIds, setSelectedIds] = useState([]);

  // Custom Hooks for State Management & Disclosure
  const formModal = useDisclosure(false);
  const deleteModal = useDisclosure(false);
  const detailsDrawer = useDisclosure(false);

  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    resetFilters,
    filteredItems: filteredLeads,
  } = useFilterAndSort({
    items: leads,
    searchKeys: SEARCH_KEYS,
    initialSortBy: 'date-desc',
  });

  const {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    paginatedItems: paginatedLeads,
    changePage,
    changePageSize,
  } = usePagination(filteredLeads, 10);

  // Selection handlers
  const handleToggleSelect = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleToggleSelectAll = useCallback(() => {
    if (selectedIds.length === paginatedLeads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedLeads.map((l) => l.id));
    }
  }, [selectedIds.length, paginatedLeads]);

  // CRUD Handlers
  const handleCreateLead = useCallback(
    (newLeadData) => {
      const newLead = {
        ...newLeadData,
        id: `LEAD-${100 + leads.length + 1}`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setLeads((prev) => [newLead, ...prev]);
      toast.success(`Lead "${newLead.name}" created successfully!`);
    },
    [leads.length]
  );

  const handleUpdateLead = useCallback(
    (updatedData) => {
      setLeads((prev) =>
        prev.map((l) => (l.id === updatedData.id ? { ...l, ...updatedData } : l))
      );
      if (detailsDrawer.data?.id === updatedData.id) {
        detailsDrawer.setData((prev) => ({ ...prev, ...updatedData }));
      }
      toast.success(`Lead "${updatedData.name}" updated!`);
    },
    [detailsDrawer]
  );

  const handleDeleteLead = useCallback((id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    setSelectedIds((prev) => prev.filter((i) => i !== id));
    toast.success('Lead deleted successfully');
  }, []);

  const handleStatusChange = useCallback(
    (id, newStatus) => {
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
      );
      if (detailsDrawer.data?.id === id) {
        detailsDrawer.setData((prev) => ({ ...prev, status: newStatus }));
      }
      toast.success(`Status updated to "${newStatus}"`);
    },
    [detailsDrawer]
  );

  const handleBulkDelete = useCallback(() => {
    if (selectedIds.length === 0) return;
    setLeads((prev) => prev.filter((l) => !selectedIds.includes(l.id)));
    setSelectedIds([]);
    toast.success(`Deleted ${selectedIds.length} selected leads`);
  }, [selectedIds]);

  // Metrics
  const totalValue = leads.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Lead Management
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Track, qualify, and convert inbound business prospects
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
            <span>Add New Lead</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="ds-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">Total Leads</p>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mt-0.5">
              {leads.length}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="ds-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">Pipeline Value</p>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mt-0.5">
              {formatCurrency(totalValue)}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="ds-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">Active Filters</p>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mt-0.5">
              {filteredLeads.length} / {leads.length}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400 flex items-center justify-center">
            <Filter className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filters Control Bar */}
      <LeadFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onResetFilters={resetFilters}
        totalResults={totalItems}
      />

      {/* Main Data Table */}
      <div className="ds-card overflow-hidden shadow-sm border border-[var(--color-border)]">
        <LeadTable
          leads={paginatedLeads}
          sortBy={sortBy}
          onSortToggle={(key) => {
            if (sortBy.startsWith(key)) {
              setSortBy(sortBy.endsWith('-asc') ? `${key}-desc` : `${key}-asc`);
            } else {
              setSortBy(`${key}-asc`);
            }
          }}
          onViewDetails={(lead) => detailsDrawer.open(lead)}
          onEditLead={(lead) => formModal.open(lead)}
          onDeleteLead={(lead) => deleteModal.open(lead)}
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
      <LeadFormModal
        isOpen={formModal.isOpen}
        onClose={formModal.close}
        onSubmit={formModal.data ? handleUpdateLead : handleCreateLead}
        initialData={formModal.data}
      />

      <DeleteLeadModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDeleteLead}
        lead={deleteModal.data}
      />

      <LeadDetailsDrawer
        isOpen={detailsDrawer.isOpen}
        onClose={detailsDrawer.close}
        lead={detailsDrawer.data}
        onEdit={(lead) => formModal.open(lead)}
        onDelete={(lead) => deleteModal.open(lead)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
