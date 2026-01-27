/**
 * Assignment Service
 * Handles all property-owner-tenant assignment operations
 */

import {
    properties,
    owners,
    tenants,
    leases,
    propertyAssignments,
    assignmentHistory,
    getPropertiesByOwner,
    getPropertyByTenant,
    getVacantProperties,
    getAssignmentHistory
} from '../propertyAssignments';

/**
 * Assign a property to an owner
 */
export const assignPropertyToOwner = (propertyId, ownerId) => {
    // Check if property exists
    const property = properties.find(p => p.id === propertyId);
    if (!property) {
        throw new Error(`Property with ID ${propertyId} not found`);
    }

    // Check if owner exists
    const owner = owners.find(o => o.id === ownerId);
    if (!owner) {
        throw new Error(`Owner with ID ${ownerId} not found`);
    }

    // Check if property is already assigned
    const existingAssignment = propertyAssignments.find(a => a.propertyId === propertyId);

    if (existingAssignment) {
        // Update existing assignment
        existingAssignment.ownerId = ownerId;
        existingAssignment.assignedDate = new Date().toISOString().split('T')[0];
        return existingAssignment;
    } else {
        // Create new assignment
        const newAssignment = {
            id: propertyAssignments.length + 1,
            propertyId,
            ownerId,
            tenantId: null,
            leaseId: null,
            status: 'vacant',
            assignedDate: new Date().toISOString().split('T')[0],
            notes: ''
        };
        propertyAssignments.push(newAssignment);
        return newAssignment;
    }
};

/**
 * Assign a tenant to a property (create lease)
 */
export const assignTenantToProperty = (propertyId, tenantId, leaseData) => {
    // Validate property
    const property = properties.find(p => p.id === propertyId);
    if (!property) {
        throw new Error(`Property with ID ${propertyId} not found`);
    }

    // Validate tenant
    const tenant = tenants.find(t => t.id === tenantId);
    if (!tenant) {
        throw new Error(`Tenant with ID ${tenantId} not found`);
    }

    // Check if property is available
    const assignment = propertyAssignments.find(a => a.propertyId === propertyId);
    if (!assignment) {
        throw new Error(`Property ${propertyId} is not assigned to any owner`);
    }

    if (assignment.status === 'occupied') {
        throw new Error(`Property ${propertyId} is already occupied`);
    }

    // Check if tenant already has an active lease
    const existingTenantLease = propertyAssignments.find(
        a => a.tenantId === tenantId && a.status === 'occupied'
    );
    if (existingTenantLease) {
        throw new Error(`Tenant ${tenantId} already has an active lease on property ${existingTenantLease.propertyId}`);
    }

    // Create new lease
    const newLease = {
        id: `lease_${Date.now()}`,
        propertyId,
        tenantId,
        startDate: leaseData.startDate,
        endDate: leaseData.endDate,
        rentAmount: leaseData.rentAmount || property.monthlyRent,
        charges: leaseData.charges || 0,
        deposit: leaseData.deposit || (leaseData.rentAmount || property.monthlyRent) * 2,
        status: 'active',
        paymentDay: leaseData.paymentDay || 5
    };
    leases.push(newLease);

    // Update assignment
    assignment.tenantId = tenantId;
    assignment.leaseId = newLease.id;
    assignment.status = 'occupied';
    assignment.notes = leaseData.notes || '';

    return {
        assignment,
        lease: newLease
    };
};

/**
 * Remove tenant from property (evict / end lease)
 */
export const evictTenant = (propertyId, tenantId, reason = 'Fin de bail') => {
    const assignment = propertyAssignments.find(
        a => a.propertyId === propertyId && a.tenantId === tenantId
    );

    if (!assignment) {
        throw new Error(`No active assignment found for property ${propertyId} and tenant ${tenantId}`);
    }

    const lease = leases.find(l => l.id === assignment.leaseId);
    if (lease) {
        lease.status = 'terminated';
    }

    // Archive to history
    const historyEntry = {
        id: assignmentHistory.length + 1,
        propertyId: assignment.propertyId,
        ownerId: assignment.ownerId,
        tenantId: assignment.tenantId,
        leaseId: assignment.leaseId,
        status: 'terminated',
        startDate: lease?.startDate,
        endDate: lease?.endDate,
        terminationReason: reason,
        terminationDate: new Date().toISOString().split('T')[0]
    };
    assignmentHistory.push(historyEntry);

    // Clear tenant from assignment
    assignment.tenantId = null;
    assignment.leaseId = null;
    assignment.status = 'vacant';

    return {
        assignment,
        historyEntry
    };
};

/**
 * Remove property from owner
 */
export const removePropertyFromOwner = (propertyId) => {
    const assignmentIndex = propertyAssignments.findIndex(a => a.propertyId === propertyId);

    if (assignmentIndex === -1) {
        throw new Error(`Property ${propertyId} is not assigned to any owner`);
    }

    const assignment = propertyAssignments[assignmentIndex];

    // Check if property is occupied
    if (assignment.status === 'occupied') {
        throw new Error(`Cannot remove property ${propertyId}: it is currently occupied. Evict tenant first.`);
    }

    // Remove assignment
    propertyAssignments.splice(assignmentIndex, 1);
    return { success: true, message: `Property ${propertyId} removed from owner ${assignment.ownerId}` };
};

/**
 * Get statistics for an owner
 */
export const getOwnerStats = (ownerId) => {
    const ownerProps = getPropertiesByOwner(ownerId);

    const totalProperties = ownerProps.length;
    const occupiedProperties = ownerProps.filter(p => p.assignment.status === 'occupied').length;
    const vacantProperties = ownerProps.filter(p => p.assignment.status === 'vacant').length;

    const monthlyRevenue = ownerProps
        .filter(p => p.lease)
        .reduce((sum, p) => sum + p.lease.rentAmount, 0);

    const occupancyRate = totalProperties > 0
        ? ((occupiedProperties / totalProperties) * 100).toFixed(1)
        : 0;

    return {
        totalProperties,
        occupiedProperties,
        vacantProperties,
        monthlyRevenue,
        occupancyRate: `${occupancyRate}%`
    };
};

/**
 * Get all available tenants (not currently in a lease)
 */
export const getAvailableTenants = () => {
    const occupiedTenantIds = propertyAssignments
        .filter(a => a.status === 'occupied' && a.tenantId)
        .map(a => a.tenantId);

    return tenants.filter(t => !occupiedTenantIds.includes(t.id));
};

// Export all helper functions
export {
    getPropertiesByOwner,
    getPropertyByTenant,
    getVacantProperties,
    getAssignmentHistory
};
