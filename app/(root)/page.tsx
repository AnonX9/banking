import HeaderBox from "@/components/HeaderBox";
import Rightsidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = {
    firstName: "Marcel",
    lastName: "Nametissa",
    email: "avaikamarcel@gmail.com",
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions effeciently."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>

      <Rightsidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 14500.5 }, { currentBalance: 450.45 }]}
      />
    </section>
  );
};

export default Home;
