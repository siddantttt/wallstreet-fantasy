const app = document.getElementById("app");
const API = "/api/users"; // You're hitting your own server
console.log("✅ app.js is loaded");

//controller functions that will be constant for every page
function renderLayout(contentHtml) {
  app.innerHTML = `
    <!-- Background Overlay -->
    <div style="
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 0;
      pointer-events: none;
    "></div>

    <!-- Main UI Layer -->
    <div style="position: relative; z-index: 1;">
      <!-- Header -->
      <header style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: #222;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        z-index: 10;
      ">
        <h2 onclick="navigate('portfolio')" style="margin: 0; cursor: pointer;">
          💸 Wallstreet Fantasy
        </h2>
        <div>
          <button onclick="navigate('portfolio')" style="margin-right: 10px; background: #1e293b; color: white; padding: 6px 12px; border: none; border-radius: 6px;">My Portfolio</button>
          <button onclick="renderTradePage()" style="margin-right: 10px; background: #16a34a; color: white; padding: 6px 12px; border: none; border-radius: 6px;">Trade</button>
          <button onclick="navigate('leaderboard')" style="margin-right: 10px; background: #3b82f6; color: white; padding: 6px 12px; border: none; border-radius: 6px;">Leaderboard</button>
          <button onclick="logout()" style="background: red; color: white; padding: 6px 12px; border: none; border-radius: 6px;">Logout</button>
          <button onclick="deleteAccount()" style="
  background: #ef4444;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 10px;
">
  Delete My Account
</button>

          </div>
      </header>

      <!-- Main Content -->
      <main style="margin-top: 70px; margin-bottom: 70px; padding: 20px; display: flex; justify-content: center;">
        <div style="max-width: 1000px; width: 100%;">
          ${contentHtml}
        </div>
      </main>

      <!-- Footer -->
      <footer style="
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        background: #eee;
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
      ">
        <p>&copy; 2025 Wallstreet Fantasy League</p>
      </footer>

      <!-- Bull icon -->
      <img src="https://cdni.iconscout.com/illustration/premium/thumb/stock-market-bull-illustration-download-in-svg-png-gif-file-formats--bitcoin-logo-upward-up-share-rise-business-pack-illustrations-9692335.png"
           alt="Bull Icon"
           class="bull-icon" />

      <!-- Toast message -->
      <div id="bullToast" style="
        position: fixed;
        bottom: 120px;
        right: 20px;
        background: #222;
        color: white;
        padding: 10px 14px;
        border-radius: 6px;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: 12;
      ">
        📈 Bullish vibes activated!
      </div>
    </div>
  `;

  // ✅ Run the toast logic AFTER DOM is updated
  setTimeout(() => {
    const bull = document.querySelector(".bull-icon");
    const toast = document.getElementById("bullToast");
    if (bull && toast) {
      bull.addEventListener("click", () => {
        toast.style.opacity = 1;
        setTimeout(() => {
          toast.style.opacity = 0;
        }, 2000);
      });
    } else {
      console.warn("🐂 Bull icon or toast not found");
    }
  }, 100);
}

function navigate(view) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return renderLoginPage();

  if (view === "portfolio") {
    renderDashboard(user);
  } else if (view === "trade") {
    renderTradePage();
  } else if (view === "leaderboard") {
    const panel = document.getElementById("leaderboardPanel");
    if (panel) {
      const isVisible = panel.style.display !== "none";
      panel.style.display = isVisible ? "none" : "block";
    } else {
      console.warn("Leaderboard panel not found on page.");
    }
  }
}

function logout() {
  localStorage.removeItem("user");
  renderLoginPage();
}

function renderLoginPage() {
  document.body.style.backgroundImage =
    "url('https://i.pinimg.com/originals/6b/3c/a5/6b3ca5844f5b9bbad16a001f22226e8c.gif')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  document.body.style.backgroundBlendMode = "overlay";

  app.innerHTML = `

    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: 'Segoe UI', sans-serif;
      padding: 20px;
    ">
      <!-- App Header -->
      <h1 style="font-size: 32px; margin-bottom: 10px; color:rgb(255, 255, 255); text-shadow: 1px 1px 1px rgba(0,0,0,0.1);">
        💸 Wallstreet Fantasy
      </h1>

      <!-- Stonks GIF -->
      <img src="https://media.tenor.com/wjS2sXen8iMAAAAM/stonks-up-stongs.gif" alt="Stonks" style="width: 180px; height: auto; margin-bottom: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);" />

      <!-- Auth Card -->
      <div id="authCard" style="
        background: rgba(255, 255, 255, 0.95);
        padding: 30px;
        border-radius: 16px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        width: 100%;
        max-width: 400px;
        transition: all 0.3s ease;
      ">
        <h2 id="authTitle">🔐 Login</h2>
        <input id="authUsername" placeholder="Username" style="width: 100%; padding: 10px; margin-top: 15px; border: 1px solid #ccc; border-radius: 8px;" />
        <input id="authPassword" type="password" placeholder="Password" style="width: 100%; padding: 10px; margin-top: 10px; border: 1px solid #ccc; border-radius: 8px;" />
        <button id="authAction" onclick="handleAuth()" style="width: 100%; padding: 12px; background: #0d6efd; color: white; border: none; border-radius: 8px; font-weight: bold; margin-top: 15px;">Login</button>
        <p id="authError" style="margin-top: 10px; color: red;"></p>
        <p style="margin-top: 15px; text-align: center;">
          <span id="authToggleText">New here?</span>
          <a href="#" onclick="toggleAuth()" style="color: #0d6efd; text-decoration: none; font-weight: bold;">Create an account</a>
        </p>
      </div>
    </div>
  `;
}

let isRegistering = false;
function toggleAuth() {
  isRegistering = !isRegistering;

  document.getElementById("authTitle").innerText = isRegistering
    ? "📝 Register"
    : "🔐 Login";
  document.getElementById("authAction").innerText = isRegistering
    ? "Register"
    : "Login";
  document.getElementById("authToggleText").innerText = isRegistering
    ? "Already have an account?"
    : "New here?";
  document.getElementById("authError").innerText = "";
}
async function handleAuth() {
  const username = document.getElementById("authUsername").value.trim();
  const password = document.getElementById("authPassword").value.trim();
  const errorEl = document.getElementById("authError");

  if (!username || !password) {
    errorEl.innerText = "Please fill out all fields.";
    return;
  }

  const endpoint = isRegistering ? `${API}/register` : `${API}/login`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    if (isRegistering) {
      errorEl.style.color = "green";
      errorEl.innerText = "🎉 Registered successfully! Now log in.";
      toggleAuth(); // flip to login
    } else {
      localStorage.setItem("user", JSON.stringify(data.user));
      renderDashboard(data.user);
    }
  } catch (err) {
    errorEl.style.color = "red";
    errorEl.innerText = err.message;
  }
}
async function renderDashboard(user) {
  try {
    const leaderboardRes = await fetch("/api/users/leaderboard");
    const leaderboardData = await leaderboardRes.json();
    const totalValue = await calculateTotalPortfolioValue(user);

    const content = `
      <div style="display: flex; gap: 30px; align-items: flex-start; flex-wrap: wrap;">

        <!-- Portfolio Side -->
        <div style="flex: 1; min-width: 300px;">
          <div style="
  background: #ffffff;
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  margin-bottom: 20px;
  font-size: 18px;
">
  👋 <strong>Welcome, ${user.username}!</strong>
</div>

          <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
            <div style="background: #ffffff; padding: 12px 16px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
              💰 <strong>Cash Balance:</strong> $${user.balance.toFixed(2)}
            </div>
            <div style="background: #ffffff; padding: 12px 16px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
              📈 <strong>Total Portfolio Value:</strong> $${totalValue.toFixed(
      2
    )}
            </div>
          </div>

          <div id="portfolioBreakdown">
            <h3>Your Portfolio</h3>
            <div style="
  background: #ffffff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  margin-top: 10px;
">
  📦 Loading stock data...
</div>

          </div>
        </div>

       <!-- Leaderboard Side -->
<div id="leaderboardPanel" style="
  flex: 1;
  min-width: 300px;
  margin-top: 10px;
">
  <div style="
    background: #ffffff;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  ">
    <h2 style="margin-top: 0; margin-bottom: 16px; color: #111;">
      🏆 This Week’s Leaderboard
    </h2>

    ${leaderboardData.length
        ? leaderboardData
          .map((user, i) => {
            const bgColor = "#f8fafc"; // subtle card bg
            const emoji = ["🥇", "🥈", "🥉"][i] || `#${i + 1}`;
            return `
        <div style="
          background: ${bgColor};
          padding: 12px 16px;
          margin-bottom: 10px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          font-weight: ${i < 3 ? "bold" : "normal"};
        ">
          <span>${emoji} ${user.username}</span>
          <span>$${parseFloat(user.totalValue).toFixed(2)}</span>
        </div>
      `;
          })
          .join("")
        : `
      <div style="
        background: #fff3cd;
        color: #856404;
        padding: 12px;
        border-radius: 6px;
        text-align: center;
        font-size: 14px;
      ">
        ⚠️ No leaderboard data yet.
      </div>
    `
      }
  </div>
</div>
    `;

    renderLayout(content);
    await renderPortfolio(user);
  } catch (err) {
    renderLayout(
      `<p style="color:red;">Failed to load dashboard or leaderboard.</p>`
    );
    console.error("Dashboard Error:", err.message);
  }
  
}

async function renderPortfolio(user) {
  const container = document.getElementById("portfolioBreakdown");

  if (!user.picks.length) {
    container.innerHTML += `<p>No stocks yet</p>`;
    return;
  }

  let totalValue = 0;
  let cardsHTML = `<div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 10px;">`;

  for (let pick of user.picks) {
    try {
      const res = await fetch(`/api/stocks/price/${pick.stock}`);
      const data = await res.json();
      const price = parseFloat(data.price || 0);
      const value = price * pick.quantity;

      totalValue += value;

      cardsHTML += `
        <div style="
          background: #f0f4f8;
          border-left: 5px solid #4caf50;
          padding: 15px;
          width: 200px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        ">
          <h4 style="margin: 0 0 5px;">${pick.stock}</h4>
          <p style="margin: 4px 0;">📦 Qty: ${pick.quantity}</p>
          <p style="margin: 4px 0;">💵 Price: $${price.toFixed(2)}</p>
          <p style="margin: 4px 0;">📊 Value: $${value.toFixed(2)}</p>
        </div>
      `;
    } catch {
      cardsHTML += `
        <div style="
          background: #ffebee;
          border-left: 5px solid #f44336;
          padding: 15px;
          width: 200px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        ">
          <h4 style="margin: 0 0 5px;">${pick.stock}</h4>
          <p style="color: #c62828;">⚠️ Error fetching price</p>
        </div>
      `;
    }
  }

  cardsHTML += `</div>
  `;

  container.innerHTML = cardsHTML;
}
async function renderLeaderboard() {
  try {
    const res = await fetch("/api/users/leaderboard");
    const data = await res.json();

    const content = `
      <h2 style="margin-bottom: 20px;">🏆 This Week’s Leaderboard</h2>
      <div style="display: flex; flex-direction: column; gap: 12px;">

        ${data.length
        ? data
          .map((user, i) => {
            const bgColor =
              i === 0
                ? "#facc15" // gold
                : i === 1
                  ? "#d1d5db" // silver
                  : i === 2
                    ? "#f97316" // bronze
                    : "#ffffff";

            const textColor = i < 3 ? "#111" : "#333";
            const emoji = ["🥇", "🥈", "🥉"][i] || `#${i + 1}`;

            return `
            <div style="
              background: ${bgColor};
              color: ${textColor};
              padding: 16px;
              border-radius: 12px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.08);
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-weight: ${i < 3 ? "bold" : "normal"};
              border-left: 6px solid ${i === 0
                ? "#eab308"
                : i === 1
                  ? "#9ca3af"
                  : i === 2
                    ? "#fb923c"
                    : "#cbd5e1"
              };
            ">
              <span>${emoji} ${user.username}</span>
              <span>$${user.totalValue.toFixed(2)}</span>
            </div>
          `;
          })
          .join("")
        : `<p>No players on the leaderboard yet.</p>`
      }

      </div>
    `;

    renderLayout(content);
  } catch (err) {
    renderLayout(
      `<p style="color:red;">❌ Failed to load leaderboard.</p>`
    );
    console.error("Leaderboard error:", err);
  }
}

async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("error");

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // ✅ SAVE USER SESSION HERE
    localStorage.setItem("user", JSON.stringify(data.user));

    renderDashboard(data.user);
  } catch (err) {
    errorEl.innerText = err.message;
  }
}

async function register() {
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const errorEl = document.getElementById("registerError");

  try {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    errorEl.style.color = "green";
    errorEl.innerText = "🎉 Registered! Now login.";
  } catch (err) {
    errorEl.style.color = "red";
    errorEl.innerText = err.message;
  }
}
async function deleteAccount() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  const confirmed = confirm("⚠️ Are you sure you want to permanently delete your account?");
  if (!confirmed) return;

  try {
    const res = await fetch(`/api/users/delete/${user.username}`, {
      method: "DELETE"
    });

    const data = await res.json();
    alert(data.message || "Account deleted.");

    localStorage.removeItem("user");
    renderLoginPage();
  } catch (err) {
    alert("❌ Failed to delete account.");
    console.error("Delete Error:", err);
  }
}

async function fetchPrice(optionalSymbol) {
  const symbol =
    optionalSymbol ||
    document.getElementById("stockInput").value.trim().toUpperCase();
  const priceDisplay = document.getElementById("livePrice");

  console.log("Fetching price for:", symbol);

  try {
    const res = await fetch(`/api/stocks/price/${symbol}`);
    const data = await res.json();
    if (data.price) {
      priceDisplay.innerText = `📈 Current Price: $${parseFloat(
        data.price
      ).toFixed(2)}`;
      priceDisplay.dataset.price = data.price;
    } else {
      priceDisplay.innerText = `Price not found`;
      priceDisplay.dataset.price = 0;
    }
  } catch (err) {
    priceDisplay.innerText = "❌ Error fetching price";
    priceDisplay.dataset.price = 0;
  }
}

async function renderTradePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return renderLoginPage();

  const content = `
    <div style="display: flex; flex-wrap: wrap; gap: 30px;">

      <!-- Portfolio Section -->
      <div style="flex: 1; background: #f1f5f9; padding: 20px; border-radius: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); min-width: 280px;">
        <h3 style="margin-top: 0;">📦 Your Portfolio</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 15px;">
          ${user.picks.length
      ? await Promise.all(
        user.picks.map(async (p) => {
          try {
            const res = await fetch(
              `/api/stocks/price/${p.stock}`
            );
            const data = await res.json();
            const currentPrice = parseFloat(
              data.price || 0
            );
            const priceChange = currentPrice - p.boughtAt;
            const isProfit = priceChange >= 0;
            const arrow = isProfit ? "🔺" : "🔻";
            const color = isProfit ? "green" : "red";

            return `
                    <div style="background: #ffffff; border-left: 6px solid ${color}; padding: 12px; width: 220px; border-radius: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
                      <h4 style="margin: 0;">📈 ${p.stock}</h4>
                      <p>Qty: ${p.quantity}</p>
                      <p>Bought @ $${p.boughtAt.toFixed(2)}</p>
                      <p>Current @ $${currentPrice.toFixed(2)}</p>
                      <p style="color: ${color}; font-weight: bold;">${arrow} $${priceChange.toFixed(
              2
            )}</p>
                      <button onclick="sellStock('${p.stock
              }')" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 6px; width: 100%; font-weight: bold;">Sell</button>
                    </div>
                  `;
          } catch {
            return `<div style="background: #ffebee; padding: 12px; width: 220px; border-radius: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><h4>${p.stock}</h4><p>⚠️ Price error</p></div>`;
          }
        })
      ).then((htmls) => htmls.join(""))
      : "<p>No picks yet</p>"
    }
        </div>
        <p><strong>💰 Balance:</strong> $${user.balance.toFixed(2)}</p>
      </div>

      <!-- Trading Section -->
      <div style="flex: 1; background: #f1f5f9; padding: 20px; border-radius: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); min-width: 280px;">
        <h3 style="margin-top: 0;">💼 Trade Stocks</h3>
        <label for="stockInput">Search stock symbol:</label>
        <input type="text" id="stockInput" placeholder="Start typing..." autocomplete="off" style="width: 100%; padding: 8px; border-radius: 6px; margin-bottom: 8px;" />
        <div id="suggestions" style="border: 1px solid #ccc; max-height: 120px; overflow-y: auto; margin-bottom: 8px;"></div>
        <p id="livePrice">📈 Current Price: $0.00</p>
        <input type="number" id="stockQty" placeholder="Quantity" style="width: 100%; padding: 8px; border-radius: 6px; margin-top: 8px;" />
        <button onclick="buyStock()" style="margin-top: 10px; width: 100%; padding: 10px; background: #16a34a; color: white; border: none; border-radius: 8px; font-weight: bold;">Buy</button>
        <p id="tradeMsg" style="color: green; margin-top: 10px;"></p>
      </div>
    </div>
  `;

  renderLayout(content);
  document
    .getElementById("stockInput")
    .addEventListener("input", handleAutocomplete);
  fetchPrice();
}
// Helper to calculate total portfolio value
async function calculateTotalPortfolioValue(user) {
  let total = 0;
  for (let p of user.picks) {
    try {
      const res = await fetch(`/api/stocks/price/${p.stock}`);
      const data = await res.json();
      const price = parseFloat(data.price || 0);
      total += price * p.quantity;
    } catch {
      continue;
    }
  }
  return total;
}

//Actions
function buyStock() {
  const symbol = document
    .getElementById("stockInput")
    .value.trim()
    .toUpperCase();
  const qty = parseInt(document.getElementById("stockQty").value);
  const msg = document.getElementById("tradeMsg");
  const price = parseFloat(
    document.getElementById("livePrice").dataset.price
  );

  if (!symbol || isNaN(qty) || qty <= 0 || !price || price === 0) {
    msg.style.color = "red";
    msg.innerText = "Invalid input or price unavailable.";
    return;
  }

  const cost = qty * price;
  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    msg.style.color = "red";
    msg.innerText = "Session expired. Please log in again.";
    return;
  }

  // Limit: only 5 different stocks per week
  if (!user.picks.some((p) => p.stock === symbol) && user.picks.length >= 5) {
    msg.style.color = "red";
    msg.innerText =
      "⛔ You can only buy up to 5 different stocks per week.";
    return;
  }

  if (user.balance < cost) {
    msg.style.color = "red";
    msg.innerText = "❌ Not enough balance.";
    return;
  }

  // Deduct balance
  user.balance -= cost;

  const existing = user.picks.find((p) => p.stock === symbol);

  if (existing) {
    // Weighted average price if buying more
    const totalQty = existing.quantity + qty;
    existing.boughtAt =
      (existing.boughtAt * existing.quantity + price * qty) / totalQty;
    existing.quantity += qty;
  } else {
    user.picks.push({ stock: symbol, quantity: qty, boughtAt: price });
  }

  // Save and sync
  localStorage.setItem("user", JSON.stringify(user));
  msg.style.color = "green";
  msg.innerText = `✅ Bought ${qty} shares of ${symbol} at $${price.toFixed(
    2
  )}`;
  renderTradePage();
  syncUser(user);
}
async function sellStock(symbol) {
  const user = JSON.parse(localStorage.getItem("user"));
  const msg = document.getElementById("tradeMsg");

  const owned = user.picks.find((p) => p.stock === symbol);
  if (!owned || owned.quantity === 0) {
    msg.style.color = "red";
    msg.innerText = `❌ You don’t own any ${symbol}`;
    return;
  }

  try {
    const res = await fetch(`/api/stocks/price/${symbol}`);
    const data = await res.json();
    const price = parseFloat(data.price);

    if (!price || isNaN(price)) throw new Error("Invalid price");

    // Sell all shares for now
    const totalValue = owned.quantity * price;
    user.balance += totalValue;

    // Remove stock from picks
    user.picks = user.picks.filter((p) => p.stock !== symbol);

    localStorage.setItem("user", JSON.stringify(user));
    msg.style.color = "green";
    msg.innerText = `✅ Sold ${owned.quantity
      } shares of ${symbol} for $${totalValue.toFixed(2)}`;
    renderTradePage();
  } catch (err) {
    msg.style.color = "red";
    msg.innerText = "❌ Could not fetch market price.";
  }
  await syncUser(user);
}
async function syncUser(user) {
  try {
    const res = await fetch("/api/users/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        balance: user.balance,
        picks: user.picks,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      console.error("Sync failed:", data.message);
    }
  } catch (err) {
    console.error("Error syncing user:", err);
  }
}
async function handleAutocomplete() {
  const input = document
    .getElementById("stockInput")
    .value.trim()
    .toUpperCase();
  const suggestions = document.getElementById("suggestions");

  if (!input) {
    suggestions.innerHTML = "";
    return;
  }

  try {
    const res = await fetch(`/api/stocks/search?query=${input}`);
    const stocks = await res.json();

    suggestions.innerHTML = stocks
      .map(
        (stock) => `
      <div class="suggestion-item" data-symbol="${stock.symbol
          }" style="padding: 6px; cursor: pointer;">
        <strong>${stock.symbol}</strong> — ${stock.instrument_name || stock.name || "Unnamed"
          }
      </div>
    `
      )
      .join("");

    // ✅ Click listener with bubbling — works even if you click inside nested tags
    suggestions.onclick = function (e) {
      let el = e.target;
      while (el && !el.dataset.symbol && el !== suggestions) {
        el = el.parentElement;
      }

      if (el && el.dataset.symbol) {
        const symbol = el.dataset.symbol;
        document.getElementById("stockInput").value = symbol;
        suggestions.innerHTML = "";
        fetchPrice(symbol); // 🔥 You should now get the price
      }
    };
  } catch (err) {
    suggestions.innerHTML = `<p style="color:red;">Error loading options</p>`;
  }
}
// Boot it up
document.addEventListener("DOMContentLoaded", () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log("🔥 App initialized, stored user:", storedUser);
  if (storedUser) renderDashboard(storedUser);
  else renderLoginPage();
});
