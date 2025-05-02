'use client'

import { DailyBankingCard } from './DailyBankingCard';
import { BankTransactionModal } from './BankTransactionModal';
import { BankStatement, DailyBanking } from '@/interfaces/banking/banking';
import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { DatePicker } from '@/components/ui/DatePicker';
import { BankReconciliation } from './BankReconcilation';
import BankingTable from '@/components/admin/banking-management/BankingOverview';
import { generateDemoBankStatements, generateDemoBankings } from '@/utils/demoBankingData';


export default function BankingPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankings, setBankings] = useState<DailyBanking[]>([]);
  const [bankStatements, setBankStatements] = useState<BankStatement[]>([]);

  // Fetch data for selected date
  useEffect(() => {
    // Simulate API calls with demo data
    const fetchData = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const demoBankings = generateDemoBankings(selectedDate);
      const demoStatements = generateDemoBankStatements(selectedDate);
      
      setBankings(demoBankings);
      setBankStatements(demoStatements);
      
      // For debugging:
      console.log('Demo bankings:', demoBankings);
      console.log('Demo statements:', demoStatements);
    };
    
    fetchData();
  }, [selectedDate]);

  const handleAddBanking = (banking: Omit<DailyBanking, 'id' | 'verified'>) => {
    setBankings([...bankings, {
      ...banking,
      id: Date.now().toString(),
      verified: false
    }]);
  };

  const handleVerify = (id: string) => {
    setBankings(bankings.map(b => 
      b.id === id ? { ...b, verified: true } : b
    ));
  };

  const handleUnverify = (id: string) => {
    setBankings(bankings.map(b => 
      b.id === id ? { ...b, verified: false } : b
    ));
  };

  const handleMatch = (bankingId: string, statementId: string) => {
    const statement = bankStatements.find(bs => bs.id === statementId);
    if (!statement) return;

    setBankings(bankings.map(b => 
      b.id === bankingId ? { 
        ...b, 
        verified: true,
        bankStatementMatch: {
          amount: statement.amount,
          transactionDate: statement.transactionDate,
          reference: statement.reference
        }
      } : b
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daily Banking Reconciliation</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Banking</span>
        </button>
      </div>

      <DatePicker 
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        className="mb-6 w-64"
        minDate={new Date(2024, 0, 1)}
      />

      <DailyBankingCard 
        cashAmount={bankings.reduce((sum, b) => sum + b.cashAmount, 0)}
        cardAmount={bankings.reduce((sum, b) => sum + b.cardAmount, 0)}
        verifiedCount={bankings.filter(b => b.verified).length}
      />

      {/* <BankingTable 
        bankings={bankings} 
        onVerify={handleVerify}
        onUnverify={handleUnverify}
      /> */}

      {/* <BankReconciliation 
        bankings={bankings}
        bankStatements={bankStatements}
        onMatch={handleMatch}
        onUnmatch={handleUnverify}
      /> */}

      <BankTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBanking}
        banks={['FNB', 'ABSA', 'Standard Bank', 'Nedbank', 'Capitec']}
      />
    </div>
  );
}