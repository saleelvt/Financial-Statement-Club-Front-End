/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBalanceSheetData {
    assets: {
      nonCurrent: {
        items: string[];
        subItems: string[];
        labels: string[];
        subLabels: string[];
        itemsDate2: string[];
        subItemsDate2: string[];
        firstTotal: number;
        secondTotal: number;
        firstTotalDate2: number;
        secondTotalDate2: number;
      };
      current: {
        items: string[];
        subItems: string[];
        labels: string[];
        subLabels: string[];
        itemsDate2: string[];
        subItemsDate2: string[];
        firstTotal: number;
        secondTotal: number;
        firstTotalDate2: number;
        secondTotalDate2: number;
      };
      totalAssets: number;
      totalAssetsDate2: number;
    };
    equity: {
      items: string[];
      subItems: string[];
      labels: string[];
      subLabels: string[];
      itemsDate2: string[];
      subItemsDate2: string[];
      firstTotal: number;
      totalEquity: number;
      firstTotalDate2: number;
      totalEquityDate2: number;
    };
    liabilities: {
      nonCurrent: {
        items: string[];
        subItems: string[];
        labels: string[];
        subLabels: string[];
        itemsDate2: string[];
        subItemsDate2: string[];
        firstTotal: number;
        total: number;
        firstTotalDate2: number;
        totalDate2: number;
      };
      current: {
        items: string[];
        subItems: string[];
        labels: string[];
        subLabels: string[];
        itemsDate2: string[];
        subItemsDate2: string[];
        firstTotal: number;
        total: number;
        firstTotalDate2: number;
        totalDate2: number;
      };
      totalLiabilities: number;
      totalLiabilitiesDate2: number;
    };
    ItotalEquityAndLiabilities: number;
    ItotalEquityAndLiabilitiesDate2: number;
  }
  



  export interface ITable {
    BalanceSheet?: any;
    ProfitLoss?: any;
    CashFlow?: any;
  }

