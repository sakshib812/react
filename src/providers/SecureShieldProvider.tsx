// src/providers/SecureShieldProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SecureShield, SecurityAuditReport } from '@secureshield/web';

interface SecurityContextType {
    isReady: boolean;
    isSecure: boolean;
    trustScore: number;
    report: (SecurityAuditReport & { trustScore?: number }) | null;
    runScan: () => SecurityAuditReport | null;
    isCleanForTransaction: () => boolean;
}

const SecurityContext = createContext<SecurityContextType>({
    isReady: false,
    isSecure: true,
    trustScore: 100,
    report: null,
    runScan: () => null,
    isCleanForTransaction: () => false,
});

export const SecureShieldProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [securityState, setSecurityState] = useState<{
        isReady: boolean;
        isSecure: boolean;
        trustScore: number;
        report: (SecurityAuditReport & { trustScore?: number }) | null;
        sdkInstance: any;
    }>({
        isReady: false,
        isSecure: true,
        trustScore: 100,
        report: null,
        sdkInstance: null,
    });

    useEffect(() => {
        let isMounted = true;

        async function bootstrap() {
            try {
                const sdk = await SecureShield.init({
                    headerKey: import.meta.env.VITE_SS_HEADER_KEY || 'enc:v1:bf004452ea9f2170fa2f0d75:b0d33433ad98d9648c17bafe4a45cdde:07ff537a3441f0059e1134d902233f',
                    encryptionKey: import.meta.env.VITE_SS_ENCRYPTION_KEY || 'U1MEOYmR2f9ZePypUKvFtCGC7xHuXcJKsukRKEeHjYQ=',
                    initializationKey: import.meta.env.VITE_SS_INIT_KEY || 'INIT_aFari0C63RokQwrXdlOga1tclSzNewoK',
                    tenantId: 'TEN-SAKSHI-8743',
                    appId: 'ast_web_181845',
                    serverUrl: 'https://radiator-waving-cahoots.ngrok-free.dev/api/v1/telemetry/ingest',
                    environment: 'production',
                    skipHandshake: true,
                    enableRuntimeIntegrityWatchdog: true,
                    enableStorageLeakScrubber: true,
                    enablePrototypeFreezing: false,
                });

                const report = await sdk.evaluateSecurityState();
                if (isMounted) {
                    setSecurityState({
                        isReady: true,
                        isSecure: report.verdict === 'SECURE',
                        trustScore: report.trustScore ?? 100,
                        report,
                        sdkInstance: sdk,
                    });
                }
            } catch (err) {
                console.error('[SecureShield] React 18 Init Error:', err);
            }
        }

        bootstrap();
        return () => { isMounted = false; };
    }, []);

    const isCleanForTransaction = (): boolean => {
        if (!securityState.sdkInstance) return false;
        const audit = securityState.sdkInstance.runScan();
        return audit.verdict === 'SECURE' && (audit.risk_score || 0) < 50;
    };

    const contextValue: SecurityContextType = {
        isReady: securityState.isReady,
        isSecure: securityState.isSecure,
        trustScore: securityState.trustScore,
        report: securityState.report,
        runScan: () => securityState.sdkInstance ? securityState.sdkInstance.runScan() : null,
        isCleanForTransaction,
    };

    return (
        <SecurityContext.Provider value={contextValue}>
            {children}
        </SecurityContext.Provider>
    );
};

export const useSecurity = () => useContext(SecurityContext);