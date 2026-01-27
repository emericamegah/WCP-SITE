import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PropertyListingPage from './pages/PropertyListingPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ContactPage from './pages/ContactPage';
import AddPropertyPage from './pages/submissions/AddPropertyPage';
import PropertyRequestPage from './pages/submissions/PropertyRequestPage';
import BusinessReferralPage from './pages/submissions/BusinessReferralPage';
import DashboardLayout from './layouts/DashboardLayout';
import ValidationsPage from './pages/dashboard/ValidationsPage';
import MaintenancePage from './pages/dashboard/MaintenancePage';
import PropertiesPage from './pages/dashboard/PropertiesPage';
import ClientsPage from './pages/dashboard/ClientsPage';
import ContractsPage from './pages/dashboard/ContractsPage';


import DashboardHome from './pages/dashboard/DashboardHome';

import AdminLayout from './layouts/AdminLayout';
import AdminPage from './pages/admin/AdminPage';
import UserManagementModule from './components/organisms/UserManagementModule';
import GlobalPropertyRegistry from './components/organisms/GlobalPropertyRegistry';
import FinancialReportingSuite from './components/organisms/FinancialReportingSuite';
import CMSEditor from './components/organisms/CMSEditor';
import PropertyAssignmentManager from './components/organisms/PropertyAssignmentManager';

// Owner Dashboard
import OwnerLayout from './layouts/OwnerLayout';
import OwnerDashboardOverview from './components/organisms/OwnerDashboardOverview';
import OwnerPropertyManagement from './components/organisms/OwnerPropertyManagement';
import OwnerFinancialReports from './components/organisms/OwnerFinancialReports';
import OwnerPropertySubmission from './components/organisms/OwnerPropertySubmission';
import OwnerSettings from './components/organisms/OwnerSettings';

// Tenant Dashboard
import TenantLayout from './layouts/TenantLayout';
import TenantDashboardOverview from './components/organisms/TenantDashboardOverview';
import TenantDocuments from './components/organisms/TenantDocuments';
import TenantMaintenance from './components/organisms/TenantMaintenance';
import TenantLeaseInfo from './components/organisms/TenantLeaseInfo';
import TenantProfilePlaceholder from './components/organisms/TenantProfile';

// Payment Flow
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccess from './pages/PaymentSuccess';

// Apporteur Dashboard
import ApporteurLayout from './layouts/ApporteurLayout';
import ApporteurDashboard from './pages/apporteur/ApporteurDashboard';
import ClientSubmissionForm from './components/organisms/ClientSubmissionForm';
import PropertySubmissionApporteur from './components/organisms/PropertySubmissionApporteur';
import CommissionTracking from './components/organisms/CommissionTracking';
import ApporteurProfile from './components/organisms/ApporteurProfile';

import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleGuard from './components/auth/RoleGuard';
import LoginPage from './pages/LoginPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/biens" element={<PropertyListingPage />} />
          <Route path="/biens/:id" element={<PropertyDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ajouter-un-bien" element={<AddPropertyPage />} />
          <Route path="/rechercher-un-bien" element={<PropertyRequestPage />} />
          <Route path="/apporter-des-affaires" element={<BusinessReferralPage />} />

          {/* Protected General Dashboard (Access for everyone logged in) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="validations" element={<ValidationsPage />} />
            <Route path="maintenance" element={<MaintenancePage />} />
            <Route path="properties" element={<PropertiesPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="contracts" element={<ContractsPage />} />
          </Route>

          {/* Admin Routes - Restricted to admin */}
          <Route
            path="/admin"
            element={
              <RoleGuard allowedRoles={['admin']}>
                <AdminLayout />
              </RoleGuard>
            }
          >
            <Route index element={<AdminPage />} />
            <Route path="users" element={<div className="p-8"><h2 className="text-2xl font-bold mb-4">Gestion Utilisateurs</h2><UserManagementModule /></div>} />
            <Route path="properties" element={<div className="p-8"><h2 className="text-2xl font-bold mb-4">Registre des Biens</h2><GlobalPropertyRegistry /></div>} />
            <Route path="assignments" element={<div className="p-8"><PropertyAssignmentManager /></div>} />
            <Route path="finance" element={<div className="p-8"><h2 className="text-2xl font-bold mb-4">Rapports Financiers</h2><FinancialReportingSuite /></div>} />
            <Route path="cms" element={<div className="p-8"><h2 className="text-2xl font-bold mb-4">Gestion de Contenu</h2><CMSEditor /></div>} />
          </Route>

          {/* Owner Dashboard Routes - Restricted to owner or admin */}
          <Route
            path="/owner"
            element={
              <ErrorBoundary>
                <RoleGuard allowedRoles={['owner', 'admin']}>
                  <OwnerLayout />
                </RoleGuard>
              </ErrorBoundary>
            }
          >
            <Route index element={<OwnerDashboardOverview />} />
            <Route path="properties" element={<OwnerPropertyManagement />} />
            <Route path="finances" element={<OwnerFinancialReports />} />
            <Route path="add-property" element={<OwnerPropertySubmission />} />
            <Route path="settings" element={<OwnerSettings />} />
          </Route>

          {/* Tenant Dashboard Routes - Restricted to tenant or admin */}
          <Route
            path="/tenant"
            element={
              <ErrorBoundary>
                <RoleGuard allowedRoles={['tenant', 'admin']}>
                  <TenantLayout />
                </RoleGuard>
              </ErrorBoundary>
            }
          >
            <Route index element={<TenantDashboardOverview />} />
            <Route path="documents" element={<TenantDocuments />} />
            <Route path="maintenance" element={<TenantMaintenance />} />
            <Route path="lease" element={<TenantLeaseInfo />} />
            <Route path="profile" element={<TenantProfilePlaceholder />} />
          </Route>

          {/* Apporteur Dashboard Routes - Restricted to apporteur or admin */}
          <Route
            path="/apporteur"
            element={
              <ErrorBoundary>
                <RoleGuard allowedRoles={['apporteur', 'admin']}>
                  <ApporteurLayout />
                </RoleGuard>
              </ErrorBoundary>
            }
          >
            <Route index element={<ApporteurDashboard />} />
            <Route path="submit-client" element={<ClientSubmissionForm />} />
            <Route path="submit-property" element={<PropertySubmissionApporteur />} />
            <Route path="commissions" element={<CommissionTracking />} />
            <Route path="profile" element={<ApporteurProfile />} />
          </Route>

          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
