"use client"

import React, { createContext, useContext, useState } from 'react';

export interface LeaseContract {
  id: number;
  refNo: string;
  name: string;
  description: string;
  counterparty: string;
  assetType: string;
  costType: string;
  isInternalTransaction: boolean;
  noteType: string;
  leaseStartDate: string;
  contractEndDate: string | null;
  leaseEndDate: string;
  modificationDate: string | null;
  periodMonths: number;
  monthlyFixedPayment: number;
  paymentType: "균등" | "비균등";
  increaseRate: number | null;
  increaseCycle: number | null;
  paymentTiming: "선급" | "후급";
  leaseStartStandard: "월초" | "월말" | "인도/사용시점";
  purchaseOptionPrice: number | null;
  depreciationPeriodMonths: number;
  deposit: number;
  capitalExpenditure: number;
  recoveryCost: number;
  impairmentDate: string | null;
  annualDiscountRate: number;
  depositDiscountRate: number;
  recoveryDiscountRate: number;
  rangeChange: number;
}

interface LeaseContractContextType {
  leaseContracts: LeaseContract[];
  addLeaseContract: (contract: LeaseContract) => void;
  removeLeaseContract: (id: number) => void;
  updateLeaseContract: (id: number, contract: LeaseContract) => void;
}

const LeaseContractContext = createContext<LeaseContractContextType | undefined>(undefined);

export function LeaseContractProvider({ children }: { children: React.ReactNode }) {
  const [leaseContracts, setLeaseContracts] = useState<LeaseContract[]>([]);

  const addLeaseContract = (contract: LeaseContract) => {
    setLeaseContracts(prev => [...prev, contract]);
  };

  const removeLeaseContract = (id: number) => {
    setLeaseContracts(prev => prev.filter(contract => contract.id !== id));
  };

  const updateLeaseContract = (id: number, updatedContract: LeaseContract) => {
    setLeaseContracts(prev => 
      prev.map(contract => 
        contract.id === id ? updatedContract : contract
      )
    );
  };

  return (
    <LeaseContractContext.Provider 
      value={{ 
        leaseContracts, 
        addLeaseContract, 
        removeLeaseContract, 
        updateLeaseContract 
      }}
    >
      {children}
    </LeaseContractContext.Provider>
  );
}

export function useLeaseContracts() {
  const context = useContext(LeaseContractContext);
  if (context === undefined) {
    throw new Error('useLeaseContracts must be used within a LeaseContractProvider');
  }
  return context;
}

