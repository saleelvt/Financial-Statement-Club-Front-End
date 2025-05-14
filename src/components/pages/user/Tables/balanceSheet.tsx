/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

type BalanceSheetFormUserProps = {
  Tabledata: any; // You can replace `any` with an actual type later
};

const BalanceSheetFormUser: React.FC<BalanceSheetFormUserProps> = React.memo(({ Tabledata }) => {
  const [table, setTable] = useState<any>(null);

  useEffect(() => {
    setTable(Tabledata);
  }, [Tabledata]);

  console.log("The table data from props:", Tabledata);

  return (
    <>
      {table ? (
        <div>
          This is the Balance Sheet: {table?.ItotalEquityAndLiabilities}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
});

export default BalanceSheetFormUser;

