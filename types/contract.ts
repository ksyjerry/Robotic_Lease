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
  contractEndDate: string;
  leaseEndDate: string;
  modificationDate: string | null;
  periodMonths: number;
  monthlyFixedPayment: number;
  paymentType: "균등" | "비균등";
  increaseRate: number | null;
  increaseCycle: number | null;
  paymentTiming: "선급" | "후급";
  leaseStartStandard: "월초" | "월말";
  purchaseOptionPrice: number | null;
  depreciationPeriodMonths: number;
  deposit: number;
  capitalExpenditure: number;
  recoveryCost: number;
  impairmentDate: string | null;
  annualDiscountRate: number;
  depositDiscountRate: number;
  recoveryDiscountRate: number;
  rangeChange: number | null;
}

