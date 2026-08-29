import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthSession } from '../types/auth';
import { ActionCategory, ActionLedgerEntry } from '../types/audit';
import { HOSPITAL_USERS } from '../data/users';
import { auditLedger } from '../services/auditLedgerService';

interface AuthContextType {
  user: User | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  login: (userId: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  logAction: (
    actionType: ActionCategory,
    actionTitle: string,
    targetResource: string,
    details: string
  ) => ActionLedgerEntry | null;
  auditEntries: ActionLedgerEntry[];
  refreshLedger: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'hospital_auth_session_v1';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [auditEntries, setAuditEntries] = useState<ActionLedgerEntry[]>(() =>
    auditLedger.getEntries()
  );

  const refreshLedger = () => {
    setAuditEntries(auditLedger.getEntries());
  };

  useEffect(() => {
    if (session) {
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      } catch {
        // ignore
      }
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [session]);

  const login = (userId: string, password: string): { success: boolean; error?: string } => {
    const trimmedId = userId.trim().toLowerCase();
    const account = HOSPITAL_USERS.find(
      (acc) =>
        acc.user.id.toLowerCase() === trimmedId ||
        acc.user.email.toLowerCase() === trimmedId
    );

    if (!account) {
      return { success: false, error: 'User ID not recognized in hospital management directory.' };
    }

    if (account.passwordHash !== password) {
      return { success: false, error: 'Invalid password. Please check your credentials.' };
    }

    const newSession: AuthSession = {
      user: account.user,
      token: `hosp_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      loginTime: new Date().toISOString(),
    };

    setSession(newSession);

    // Record login action in Solidity audit ledger
    auditLedger.recordAction(
      account.user,
      'AUTH_LOGIN',
      'Hospital Management User Authenticated',
      'AUTH_SYSTEM',
      `User ${account.user.name} (${account.user.roleTitle}) logged into Unified Operations Console.`
    );
    refreshLedger();

    return { success: true };
  };

  const logout = () => {
    if (session?.user) {
      auditLedger.recordAction(
        session.user,
        'AUTH_LOGOUT',
        'Hospital Management User Session Terminated',
        'AUTH_SYSTEM',
        `User ${session.user.name} (${session.user.roleTitle}) logged out.`
      );
      refreshLedger();
    }
    setSession(null);
  };

  const logAction = (
    actionType: ActionCategory,
    actionTitle: string,
    targetResource: string,
    details: string
  ): ActionLedgerEntry | null => {
    if (!session?.user) return null;
    const entry = auditLedger.recordAction(
      session.user,
      actionType,
      actionTitle,
      targetResource,
      details
    );
    refreshLedger();
    return entry;
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user || null,
        session,
        isAuthenticated: !!session?.user,
        login,
        logout,
        logAction,
        auditEntries,
        refreshLedger,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
