import React from "react";
import { useHasNewDeploy } from "next-deploy-notifications";
function Notification() {
  let { hasNewDeploy } = useHasNewDeploy();
  return (
    <div>
      {hasNewDeploy && (
        <div className="bg-black w-[calc(100%-2rem)] h-40 flex items-center justify-center">
          New version available!
          <button onClick={() => window.location.reload()}>Refresh</button>
        </div>
      )}
    </div>
  );
}

export default Notification;
