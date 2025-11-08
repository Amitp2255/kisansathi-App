import { Scheme } from '../types';

const schemesData: Scheme[] = [
    {
        id: 1, title: "PM-KISAN Scheme",
        summary: "A central sector scheme with 100% funding from the Government of India. It provides income support to all landholding farmer families.",
        eligibility: "All landholding farmer families with cultivable landholding in their names.",
        benefits: "₹6,000 per year in three equal installments of ₹2,000 each directly into the bank accounts of the beneficiaries.",
        applicationLink: "https://pmkisan.gov.in/"
    },
    {
        id: 2, title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        summary: "An insurance service for farmers for their yields. It aims to provide comprehensive insurance cover against failure of the crop thus helping in stabilising the income of the farmers.",
        eligibility: "All farmers including sharecroppers and tenant farmers growing notified crops in the notified areas are eligible for coverage.",
        benefits: "Provides insurance coverage and financial support to the farmers in the event of failure of any of the notified crop as a result of natural calamities, pests & diseases.",
        applicationLink: "https://pmfby.gov.in/"
    },
    {
        id: 3, title: "Kisan Credit Card (KCC)",
        summary: "The KCC scheme was introduced to ensure that farmers have access to credit at an affordable interest rate.",
        eligibility: "All farmers, individuals/joint borrowers, tenant farmers, oral lessees, and sharecroppers are eligible.",
        benefits: "Short-term credit for cultivation of crops, post-harvest expenses, and other farm-related activities. The interest rate is as low as 4% upon prompt repayment.",
        applicationLink: "https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card"
    }
];

// Simulates fetching schemes from a backend that an admin would manage.
export const getGovernmentSchemes = (): Promise<Scheme[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(schemesData);
        }, 500);
    });
};
